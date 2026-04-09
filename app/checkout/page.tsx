import SuperpowerLogo from '@/components/checkout/SuperpowerLogo';
import MemberAvatars from '@/components/checkout/MemberAvatars';
import EmailForm from '@/components/checkout/EmailForm';
import LockIcon from '@/components/checkout/LockIcon';
import OrderSummaryCarousel from '@/components/checkout/OrderSummaryCarousel';

export default function CheckoutPage() {
  return (
    <main className="theme-product bg-zinc-50 px-4 sm:px-8 lg:px-16 min-h-screen pb-20">
      <div className="mx-auto max-w-sm md:max-w-lg">
        {/* Header */}
        <div className="flex justify-between items-center py-6">
          <a href="/">
            <SuperpowerLogo />
          </a>
        </div>

        <div className="md:grid md:grid-cols-2 md:gap-8 lg:gap-16">
          {/* Left Column - Form */}
          <div className="space-y-8">
            {/* Hero section */}
            <div className="flex flex-col pb-6 mb-6 border-b border-border">
              <span
                data-slot="badge"
                className="inline-flex items-center justify-center typography-body w-fit whitespace-nowrap shrink-0 [&>svg]:size-5 [&>svg]:-ml-1 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden bg-brand-50 text-brand px-2 py-[3px] typography-body rounded-sm mb-4"
              >
                Superpower membership
              </span>
              <h1 className="type-heading-lg mb-2">A health check like never before</h1>
              <div className="type-body-md text-secondary-foreground mb-6">
                Sign up to test 100+ biomarkers yearly, visualize health records and get a
                personalized plan that actually works.
              </div>
              <MemberAvatars />
            </div>

            {/* Mobile order summary */}
            <div className="md:hidden">
              <div className="flex flex-col gap-4 bg-white border rounded-2xl p-4 sm:p-5">
                <div>
                  <div className="flex w-full items-center gap-2">
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-lg">
                      <picture>
                        <source
                          srcSet="https://assets.superpower.com/website/checkout/autopilot-blood-panel-mobile.webp"
                          type="image/webp"
                        />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="https://assets.superpower.com/website/checkout/autopilot-blood-panel-mobile.png"
                          alt="Superpower Membership"
                          className="size-full object-cover"
                        />
                      </picture>
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col items-start">
                      <div className="type-body-md text-left flex w-full items-center justify-between text-primary">
                        <span>Superpower Membership</span>
                      </div>
                      <div className="type-body-sm flex items-center gap-1 text-secondary-foreground mt-1">
                        100+ biomarkers, results tracked over time, and 24/7 access to your care
                        team.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step-by-step form */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-6">
                {/* Step 1 */}
                <div className="flex items-center gap-2 opacity-100">
                  <div className="size-6 flex items-center justify-center rounded-sm bg-brand-500">
                    <span className="type-body-md text-white">1</span>
                  </div>
                  <div className="type-heading-md text-primary">Create your account</div>
                </div>

                <EmailForm placeholder="Your email" buttonText="Continue" />
              </div>

              {/* Step 2 */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2 opacity-50">
                  <div className="size-6 flex items-center justify-center rounded-sm bg-brand-500">
                    <span className="type-body-md text-white">2</span>
                  </div>
                  <div className="type-heading-md text-primary">Payment</div>
                </div>
                <div className="flex items-center gap-2 border type-body-md p-4 rounded-lg opacity-50">
                  <LockIcon />
                  Complete step 1 to continue.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary (desktop) */}
          <div className="hidden md:block">
            <div className="flex flex-col gap-4 bg-white border rounded-2xl p-4 sm:p-5 sticky top-8">
              <div className="type-body-lg text-secondary-foreground">Order Summary</div>

              <OrderSummaryCarousel />

              <div className="divide-y">
                <div className="pb-4">
                  <h3 className="type-heading-sm mb-2">Superpower Membership</h3>
                  <p className="type-body-md text-secondary-foreground">
                    100+ biomarkers, results tracked over time, and 24/7 access to your care team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
