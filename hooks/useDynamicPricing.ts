'use client';

import { useState, useEffect, useCallback } from 'react';

const FIXED_PRICE = 19900; // $199.00 in cents

declare global {
  interface Window {
    Rewardful?: {
      coupon?: {
        id?: string;
        name?: string;
      };
    };
    rewardful?: (event: string, callback: () => void) => void;
  }
}

/**
 * Formats the price from cents to a USD string.
 * @param amountInCents - The amount in cents.
 * @param toRounded - Whether to round the amount before formatting.
 * @returns Formatted price string.
 */
export function formatPrice(amountInCents: number, toRounded = false): string {
  let amount = amountInCents / 100;
  if (toRounded) {
    amount = Math.ceil(amount);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: toRounded ? 0 : 2,
    maximumFractionDigits: toRounded ? 0 : 2,
  }).format(amount);
}

interface CouponResponse {
  percent_off?: number;
  amount_off?: number;
}

/**
 * Calculates the discounted price based on the coupon code.
 * @param couponCode - The coupon code to apply.
 * @returns The final amount in cents after applying discounts.
 */
async function calculateDiscountedPrice(couponCode: string): Promise<number> {
  if (!couponCode) {
    return FIXED_PRICE;
  }

  let finalAmount = FIXED_PRICE;

  try {
    const response = await fetch(
      `https://go-stripe.superpower.com/coupon?code=${couponCode}`
    );
    if (response.ok) {
      const coupon: CouponResponse = await response.json();
      if (coupon.percent_off) {
        finalAmount = finalAmount * (1 - coupon.percent_off / 100);
      } else if (coupon.amount_off) {
        finalAmount = Math.max(0, finalAmount - coupon.amount_off);
      }
    } else {
      console.warn('Invalid coupon');
    }
  } catch (error) {
    console.error('Error fetching coupon:', error);
  }

  return finalAmount;
}

interface UseDynamicPricingReturn {
  /** The final annual price in cents */
  annualPriceCents: number;
  /** The final monthly price in cents (annual / 12) */
  monthlyPriceCents: number;
  /** The formatted annual price string (rounded) */
  annualPriceFormatted: string;
  /** The formatted monthly price string (rounded) */
  monthlyPriceFormatted: string;
  /** The raw annual price number (rounded, no currency symbol) */
  annualPriceNumber: number;
  /** The raw monthly price number (rounded, no currency symbol) */
  monthlyPriceNumber: number;
  /** Whether the price is currently being loaded */
  isLoading: boolean;
  /** Any error that occurred during price fetching */
  error: string | null;
  /** The base/fixed price in cents before discounts */
  fixedPriceCents: number;
  /** Re-calculate pricing with a specific coupon code */
  applyCoupon: (code: string) => Promise<void>;
}

export default function useDynamicPricing(): UseDynamicPricingReturn {
  const [annualPriceCents, setAnnualPriceCents] = useState(FIXED_PRICE);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const monthlyPriceCents = annualPriceCents / 12;

  const annualPriceFormatted = formatPrice(annualPriceCents, true);
  const monthlyPriceFormatted = formatPrice(monthlyPriceCents, true);

  const annualPriceNumber = Math.ceil(annualPriceCents / 100);
  const monthlyPriceNumber = Math.ceil(monthlyPriceCents / 100);

  const applyCoupon = useCallback(async (code: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const finalAmount = await calculateDiscountedPrice(code);
      setAnnualPriceCents(finalAmount);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error applying coupon');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    async function initializePricing() {
      try {
        const coupon = window.Rewardful?.coupon;
        const rewardfulCode = coupon?.id || coupon?.name || '';
        const accessCode =
          new URLSearchParams(window.location.search).get('accessCode') || '';
        const code = rewardfulCode || accessCode;

        const finalAmount = await calculateDiscountedPrice(code);
        setAnnualPriceCents(finalAmount);
      } catch (err) {
        console.error('Error setting dynamic price:', err);
        setError(err instanceof Error ? err.message : 'Error loading price');
      } finally {
        setIsLoading(false);
      }
    }

    // Check if rewardful is available for pricing
    if (typeof window !== 'undefined' && typeof window.rewardful === 'function') {
      window.rewardful('ready', initializePricing);
    } else {
      // Fallback: try to initialize after a short delay
      const timer = setTimeout(() => {
        if (typeof window.rewardful === 'function') {
          window.rewardful('ready', initializePricing);
        } else {
          initializePricing();
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  return {
    annualPriceCents,
    monthlyPriceCents,
    annualPriceFormatted,
    monthlyPriceFormatted,
    annualPriceNumber,
    monthlyPriceNumber,
    isLoading,
    error,
    fixedPriceCents: FIXED_PRICE,
    applyCoupon,
  };
}
