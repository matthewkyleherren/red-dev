'use client';

import { useState } from 'react';
import SuperpowerLogo from './SuperpowerLogo';
import BackButton from './BackButton';
import EmailForm from './EmailForm';
import TierSelector from './TierSelector';
import TierOrderSummary from './TierOrderSummary';

type TierKey = 'baseline' | 'performance' | 'complete';

export default function TiersPageClient() {
  const [selectedTier, setSelectedTier] = useState<TierKey>('baseline');

  return (
    <div className="px-4 sm:px-10 md:px-20 bg-neutral-50 min-h-screen pb-20">
      <div className="grid md:grid-cols-2 md:gap-20 mx-auto max-w-md md:max-w-[1200px]">
        {/* Right Column - Order Summary (renders first on mobile via order) */}
        <div className="order-first md:order-last pt-8">
          {/* Mobile header */}
          <div className="flex justify-between items-center py-3 md:hidden mb-8">
            <BackButton />
            <SuperpowerLogo />
          </div>

          {/* Mobile tier selector */}
          <div className="md:hidden">
            <TierSelector selectedTier={selectedTier} onSelectTier={setSelectedTier} />
          </div>

          <TierOrderSummary selectedTier={selectedTier} />
        </div>

        {/* Left Column - Form */}
        <div className="min-h-screen md:min-h-auto pt-8">
          {/* Desktop header */}
          <div className="justify-between items-center py-3 hidden md:flex">
            <BackButton />
            <SuperpowerLogo />
          </div>

          <div className="md:h-24 flex flex-col justify-end">
            <div>
              <h3 className="typography-heading3 mt-4">Join Superpower</h3>
              <p className="text-secondary-foreground typography-largebody mt-2">
                Renews Annually. Cancel anytime.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-8">
            <EmailForm placeholder="Your Email" buttonText="Continue" />
          </div>
        </div>
      </div>
    </div>
  );
}
