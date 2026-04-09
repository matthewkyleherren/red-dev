import SuperpowerLogo from '@/components/checkout/SuperpowerLogo';
import BackButton from '@/components/checkout/BackButton';
import EmailForm from '@/components/checkout/EmailForm';
import CheckIcon from '@/components/checkout/CheckIcon';

export default function GiftCheckoutPage() {
  return (
    <div className="px-4 sm:px-10 md:px-20 bg-neutral-50 min-h-screen pb-20">
      <div className="grid md:grid-cols-2 md:gap-20 mx-auto max-w-md md:max-w-[1200px]">
        {/* Left Column - Form */}
        <div className="min-h-screen md:min-h-auto pt-8">
          {/* Desktop header */}
          <div className="justify-between items-center py-3 hidden md:flex">
            <BackButton />
            <SuperpowerLogo />
          </div>

          <div className="md:h-24 flex flex-col justify-end">
            <div>
              <h3 className="typography-heading3 mt-4">Enter your email</h3>
              <p className="text-secondary-foreground typography-largebody mt-2">
                Enter your email to send a gift to your loved ones.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-8">
            <EmailForm placeholder="Your Email" buttonText="Continue" />
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="order-first md:order-last pt-8">
          {/* Mobile header */}
          <div className="flex justify-between items-center py-3 md:hidden mb-8">
            <BackButton />
            <SuperpowerLogo />
          </div>

          <div className="md:sticky md:top-10 p-2 md:p-5 md:pt-4 border rounded-2xl bg-background">
            <h2 className="hidden md:block typography-largebody text-zinc-500 mb-4">
              Order Summary
            </h2>

            <div>
              <div className="w-full rounded-2xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/checkout/gift-hero-v8ajWe88.png"
                  alt="Superpower Gift Membership"
                  className="w-full h-auto object-cover"
                />
              </div>
              <h3 className="typography-heading3 mt-10">Give the Gift of Health</h3>
            </div>

            <div className="typography-body lg:typography-largebody mt-4">
              <div className="flex py-3">
                <div className="shrink-0 pr-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/checkout/gift-line-item-DTVhbKbt.png"
                    alt="Superpower Membership"
                    className="w-16 h-16 object-cover border rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center">
                      <span className="text-primary-foreground">Superpower Membership</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>$199</span>
                    </div>
                  </div>
                  <div className="mt-1">
                    <ul className="check-list list-none space-y-2 type-body-md">
                      <li className="flex items-start gap-2 text-secondary-foreground typography-caption">
                        <CheckIcon className="size-4 shrink-0 mt-1" />
                        1000+ conditions tested annually
                      </li>
                      <li className="flex items-start gap-2 text-secondary-foreground typography-caption">
                        <CheckIcon className="size-4 shrink-0 mt-1" />
                        Data dashboard
                      </li>
                      <li className="flex items-start gap-2 text-secondary-foreground typography-caption">
                        <CheckIcon className="size-4 shrink-0 mt-1" />
                        Personalized Action Plan
                      </li>
                      <li className="flex items-start gap-2 text-secondary-foreground typography-caption">
                        <CheckIcon className="size-4 shrink-0 mt-1" />
                        24/7 concierge support
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t mt-2">
                <div className="flex justify-between py-2 typography-largebody">
                  <span className="text-secondary-foreground">Total</span>
                  <span className="text-foreground">$0</span>
                </div>
              </div>

              <p className="typography-footnote text-tertiary-foreground mt-4 italic">
                <span className="font-medium text-secondary-foreground">State Coverage:</span> Gift
                recipients must reside outside of Alaska, Arkansas, Hawaii, Iowa, Kentucky,
                Louisiana, Mississippi, North Dakota, Rhode Island, South Dakota, and Wyoming.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
