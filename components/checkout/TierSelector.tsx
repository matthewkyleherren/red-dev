'use client';

import { useState } from 'react';

type TierKey = 'baseline' | 'performance' | 'complete';

interface Tier {
  key: TierKey;
  name: string;
  price: number;
  popular?: boolean;
}

const tiers: Tier[] = [
  { key: 'baseline', name: 'Baseline', price: 199 },
  { key: 'performance', name: 'Performance', price: 499, popular: true },
  { key: 'complete', name: 'Complete', price: 999 },
];

interface TierSelectorProps {
  selectedTier: TierKey;
  onSelectTier: (tier: TierKey) => void;
}

export default function TierSelector({ selectedTier, onSelectTier }: TierSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-2">
      {tiers.map((tier) => {
        const isSelected = selectedTier === tier.key;
        return (
          <div key={tier.key} className="flex flex-col h-full">
            {tier.popular ? (
              <div className="flex flex-col h-full bg-brand-foreground rounded-lg">
                <div className="flex items-center justify-center h-6">
                  <p className="text-white typography-footnote">Most Popular</p>
                </div>
                <button
                  data-slot="button"
                  className={`inline-flex items-center cursor-pointer justify-center whitespace-nowrap disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-offset-2 focus-visible:ring-ring focus-visible:ring-[2px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive bg-white border text-zinc-900 hover:bg-zinc-50 disabled:opacity-50 disabled:text-zinc-500 typography-body rounded-lg gap-2 w-full transition-all py-3 px-5 ${isSelected ? 'border-brand-foreground' : ''}`}
                  type="button"
                  onClick={() => onSelectTier(tier.key)}
                >
                  <div className="text-center">
                    <div className={`size-5 rounded-full border-2 mx-auto mb-3 ${isSelected ? 'border-brand-foreground bg-brand-foreground/20' : 'border-border'}`}>
                      {isSelected && (
                        <div className="size-full rounded-full flex items-center justify-center">
                          <div className="size-2 rounded-full bg-brand-foreground" />
                        </div>
                      )}
                    </div>
                    <p className={`typography-body ${isSelected ? 'text-primary-foreground' : 'text-secondary-foreground'}`}>{tier.name}</p>
                    <div className="flex items-baseline justify-center gap-0">
                      <span className={`typography-caption ${isSelected ? 'text-primary-foreground' : 'text-secondary-foreground'}`}>$</span>
                      <p className={`typography-largebody ${isSelected ? 'text-primary-foreground' : 'text-secondary-foreground'}`}>{tier.price}</p>
                      <p className="typography-caption text-secondary-foreground">/ year</p>
                    </div>
                  </div>
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center h-6" />
                <button
                  data-slot="button"
                  className={`inline-flex items-center cursor-pointer justify-center whitespace-nowrap disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-offset-2 focus-visible:ring-ring focus-visible:ring-[2px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive bg-white border text-zinc-900 hover:bg-zinc-50 disabled:opacity-50 disabled:text-zinc-500 typography-body rounded-lg gap-2 w-full transition-all py-3 px-5 ${isSelected ? 'border-brand-foreground' : ''}`}
                  type="button"
                  onClick={() => onSelectTier(tier.key)}
                >
                  <div className="text-center">
                    <div className={`size-5 rounded-full border-2 mx-auto mb-3 ${isSelected ? 'border-brand-foreground bg-brand-foreground/20' : 'border-border'}`}>
                      {isSelected && (
                        <div className="size-full rounded-full flex items-center justify-center">
                          <div className="size-2 rounded-full bg-brand-foreground" />
                        </div>
                      )}
                    </div>
                    <p className={`typography-body ${isSelected ? 'text-primary-foreground' : 'text-secondary-foreground'}`}>{tier.name}</p>
                    <div className="flex items-baseline justify-center gap-0">
                      <span className={`typography-caption ${isSelected ? 'text-primary-foreground' : 'text-secondary-foreground'}`}>$</span>
                      <p className={`typography-largebody ${isSelected ? 'text-primary-foreground' : 'text-secondary-foreground'}`}>{tier.price}</p>
                      <p className="typography-caption text-secondary-foreground">/ year</p>
                    </div>
                  </div>
                </button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
