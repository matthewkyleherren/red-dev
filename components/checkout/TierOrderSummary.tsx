'use client';

import TierFeatures from './TierFeatures';

type TierKey = 'baseline' | 'performance' | 'complete';

interface TierInfo {
  name: string;
  price: number;
  tagline: string;
  highlight: string;
  cardImage: string;
  cardAlt: string;
  cardBg: string;
}

const tierInfo: Record<TierKey, TierInfo> = {
  baseline: {
    name: 'Baseline',
    price: 199,
    highlight: 'beginners',
    tagline: 'who want to start their longevity journey.',
    cardImage: 'https://superpower.com/website-assets/card-baseline-CQxUsXvU.webp',
    cardAlt: 'Baseline membership card',
    cardBg: 'bg-brand-900',
  },
  performance: {
    name: 'Performance',
    price: 499,
    highlight: 'optimizers',
    tagline: 'who want to view their results and optimize them too.',
    cardImage: 'https://superpower.com/website-assets/card-advanced-DQyIwpMz.webp',
    cardAlt: 'Performance membership card',
    cardBg: 'bg-brand-900',
  },
  complete: {
    name: 'Complete',
    price: 999,
    highlight: 'maximizers',
    tagline: 'who want the most comprehensive health insights.',
    cardImage: 'https://superpower.com/website-assets/card-premium-BeAtfJ-I.webp',
    cardAlt: 'Complete membership card',
    cardBg: 'bg-brand-900',
  },
};

interface TierOrderSummaryProps {
  selectedTier: TierKey;
  onChangeTier?: () => void;
}

export default function TierOrderSummary({ selectedTier, onChangeTier }: TierOrderSummaryProps) {
  const tier = tierInfo[selectedTier];

  return (
    <div className="md:sticky md:top-10 p-2 md:p-5 md:pt-4 border rounded-2xl bg-background px-0 overflow-hidden">
      <div className="px-6">
        <h2 className="hidden md:block typography-largebody text-zinc-500 mb-4">Order Summary</h2>
      </div>

      <div className="typography-body lg:typography-largebody px-6 pt-2 pb-6 md:py-0 space-y-6">
        {/* Card visual */}
        <div className="perspective-normal perspective-3d aspect-21/13 w-full max-w-48 sm:max-w-none sm:w-auto sm:h-48 mx-auto">
          <div
            className="relative w-full h-full transform-3d will-change-transform cursor-pointer motion-reduce:transform-none"
            style={{ transform: 'none' }}
          >
            <div
              className={`relative size-full overflow-hidden rounded-xl ${tier.cardBg}`}
              style={{
                boxShadow:
                  '0 153px 43px 0 rgba(0,0,0,0),0 98px 39px 0 rgba(0,0,0,.01),0 55px 33px 0 rgba(0,0,0,.05),0 24px 24px 0 rgba(0,0,0,.09),0 6px 13px 0 rgba(0,0,0,.1)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tier.cardImage}
                alt={tier.cardAlt}
                className="absolute inset-0 size-full object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-200 motion-reduce:transition-none rounded-xl"
                style={{
                  background:
                    'radial-gradient(ellipse 40% 100% at 50% 50%,rgba(255,255,255,0.36) 0%,rgba(255,255,255,0.15) 40%,transparent 70%)',
                  mixBlendMode: 'soft-light',
                  opacity: 0,
                }}
              />
            </div>
          </div>
        </div>

        {/* Tier info */}
        <div className="mt-12 mb-6">
          <div>
            <h2 className="typography-heading2 text-primary-foreground">{tier.name}</h2>
            <p className="typography-body sm:typography-largebody text-secondary-foreground mt-1">
              For <span className="text-brand-foreground">{tier.highlight}</span> {tier.tagline}
            </p>
            <p className="mt-4 sm:mt-2">
              <span className="typography-caption text-secondary-foreground align-top">$</span>
              <span className="typography-heading1 text-primary-foreground">{tier.price}</span>
              <span className="typography-body text-secondary-foreground ml-1">per year</span>
            </p>
          </div>

          {/* Change tier button (desktop only) */}
          {onChangeTier && (
            <button
              data-slot="dialog-trigger"
              className="items-center cursor-pointer justify-center whitespace-nowrap transition-all disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-offset-2 focus-visible:ring-ring focus-visible:ring-[2px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive bg-white border text-zinc-900 hover:bg-zinc-50 disabled:opacity-50 disabled:text-zinc-500 typography-body rounded-lg gap-2 py-2 px-3 w-full mt-6 hidden md:flex"
              type="button"
              onClick={onChangeTier}
            >
              Change Tier
            </button>
          )}

          <div className="w-full h-px bg-border mt-6 block md:hidden" />
        </div>

        {/* Features */}
        <TierFeatures tier={selectedTier} />

        {/* Total */}
        <div className="pt-2 border-t mt-6">
          <div className="flex justify-between py-2 typography-largebody">
            <span className="text-secondary-foreground">Total</span>
            <span className="text-foreground">${tier.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
