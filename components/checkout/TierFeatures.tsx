type TierKey = 'baseline' | 'performance' | 'complete';

/* SVG icon components matching the original checkout tier icons */
function LabIcon() {
  return (
    <svg className="size-4 shrink-0 mt-0.5 text-brand-foreground" aria-hidden="true" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.2504 3.75L14.2504 4.75M14.2504 4.75L19.2504 9.75M14.2504 4.75L3.75038 15.25C2.36967 16.6307 2.36966 18.8693 3.75038 20.25C5.13109 21.6307 7.36967 21.6307 8.75038 20.25L19.2504 9.75M19.2504 9.75L20.2504 10.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.73828 12.75H15.7344" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.25 2.5C19.25 2.91421 18.9142 3.25 18.5 3.25C18.0858 3.25 17.75 2.91421 17.75 2.5C17.75 2.08579 18.0858 1.75 18.5 1.75C18.9142 1.75 19.25 2.08579 19.25 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 6.25C20.1381 6.25 20.25 6.13807 20.25 6C20.25 5.86193 20.1381 5.75 20 5.75C19.8619 5.75 19.75 5.86193 19.75 6C19.75 6.13807 19.8619 6.25 20 6.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 6.00023V5.99023" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg className="size-4 shrink-0 mt-0.5 text-brand-foreground" aria-hidden="true" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9216 2.75H7.75C6.09315 2.75 4.75 4.09315 4.75 5.75V18.25C4.75 19.9069 6.09315 21.25 7.75 21.25H16.25C17.9069 21.25 19.25 19.9069 19.25 18.25V10.0784C19.25 9.54799 19.0393 9.03929 18.6642 8.66421L13.3358 3.33579C12.9607 2.96071 12.452 2.75 11.9216 2.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.75 3.25V7.25C12.75 8.35457 13.6454 9.25 14.75 9.25H18.75" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function PillIcon() {
  return (
    <svg className="size-4 shrink-0 mt-0.5 text-brand-foreground" aria-hidden="true" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9986 4.50057L4.49861 12.0006C2.42755 14.0716 2.42755 17.4295 4.49861 19.5006C6.56968 21.5716 9.92755 21.5716 11.9986 19.5006L19.4986 12.0006C21.5697 9.9295 21.5697 6.57163 19.4986 4.50057C17.4275 2.4295 14.0697 2.4295 11.9986 4.50057Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.5 8.5L15.5 15.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg className="size-4 shrink-0 mt-0.5 text-brand-foreground" aria-hidden="true" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 13.3108 3.02267 14.558 3.51437 15.6878C3.67129 16.0484 3.71278 16.4524 3.59677 16.8281L2.82118 19.3402C2.4689 20.4812 3.52634 21.5564 4.67306 21.2231L7.32685 20.4518C7.68827 20.3468 8.07392 20.3864 8.42094 20.5321C9.52186 20.9945 10.7311 21.25 12 21.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg className="size-4 shrink-0 mt-0.5 text-brand-foreground" aria-hidden="true" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.75 10.7411V5.75C2.75 4.09315 4.09315 2.75 5.75 2.75H10.7411C11.5368 2.75 12.2998 3.06607 12.8624 3.62868L20.3787 11.1449C21.5503 12.3165 21.5503 14.216 20.3787 15.3876L15.3876 20.3787C14.216 21.5503 12.3165 21.5503 11.1449 20.3787L3.62868 12.8624C3.06607 12.2998 2.75 11.5368 2.75 10.7411Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8.25 7.5C8.25 7.91421 7.91421 8.25 7.5 8.25C7.08579 8.25 6.75 7.91421 6.75 7.5C6.75 7.08579 7.08579 6.75 7.5 6.75C7.91421 6.75 8.25 7.08579 8.25 7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-4 shrink-0 mt-0.5 text-brand-foreground" aria-hidden="true">
      <g clipPath="url(#clip0_cross)">
        <path d="M7.33325 1.33301C6.97963 1.33301 6.64049 1.47348 6.39044 1.72353C6.14039 1.97358 5.99992 2.31272 5.99992 2.66634V5.99967H2.66659C2.31296 5.99967 1.97382 6.14015 1.72378 6.3902C1.47373 6.64025 1.33325 6.97939 1.33325 7.33301V8.66634C1.33325 9.39967 1.93325 9.99967 2.66659 9.99967H5.99992V13.333C5.99992 14.0663 6.59992 14.6663 7.33325 14.6663H8.66659C9.02021 14.6663 9.35935 14.5259 9.60939 14.2758C9.85944 14.0258 9.99992 13.6866 9.99992 13.333V9.99967H13.3333C13.6869 9.99967 14.026 9.8592 14.2761 9.60915C14.5261 9.3591 14.6666 9.01996 14.6666 8.66634V7.33301C14.6666 6.97939 14.5261 6.64025 14.2761 6.3902C14.026 6.14015 13.6869 5.99967 13.3333 5.99967H9.99992V2.66634C9.99992 2.31272 9.85944 1.97358 9.60939 1.72353C9.35935 1.47348 9.02021 1.33301 8.66659 1.33301H7.33325Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_cross">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function DumbbellIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-4 shrink-0 mt-0.5 text-brand-foreground" aria-hidden="true">
      <path d="M6 1.33301V12.9997C6 13.4417 5.82441 13.8656 5.51184 14.1782C5.19928 14.4907 4.77536 14.6663 4.33333 14.6663C3.89131 14.6663 3.46738 14.4907 3.15482 14.1782C2.84226 13.8656 2.66667 13.4417 2.66667 12.9997V1.33301M13.3333 1.33301V12.9997C13.3333 13.4417 13.1577 13.8656 12.8452 14.1782C12.5326 14.4907 12.1087 14.6663 11.6667 14.6663C11.2246 14.6663 10.8007 14.4907 10.4882 14.1782C10.1756 13.8656 10 13.4417 10 12.9997V1.33301M2 1.33301H6.66667M9.33333 1.33301H14M6 10.6663H2.66667M13.3333 10.6663H10" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarCheckIcon() {
  return (
    <svg className="size-4 shrink-0 mt-0.5 text-brand-foreground" aria-hidden="true" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.5 2.75C8.5 2.33579 8.16421 2 7.75 2C7.33579 2 7 2.33579 7 2.75V4H6.75C4.67893 4 3 5.67893 3 7.75V17.25C3 19.3211 4.67893 21 6.75 21H11.25C11.6642 21 12 20.6642 12 20.25C12 19.8358 11.6642 19.5 11.25 19.5H6.75C5.50736 19.5 4.5 18.4926 4.5 17.25V10H19.5V12.25C19.5 12.6642 19.8358 13 20.25 13C20.6642 13 21 12.6642 21 12.25V7.75C21 5.67893 19.3211 4 17.25 4H17V2.75C17 2.33579 16.6642 2 16.25 2C15.8358 2 15.5 2.33579 15.5 2.75V4H8.5V2.75Z" fill="currentColor" />
      <path d="M21.8391 16.2141C22.0955 15.8888 22.0395 15.4172 21.7142 15.1609C21.3888 14.9045 20.9172 14.9605 20.6609 15.2858L16.8541 20.1176L15.2844 18.5237C14.9937 18.2286 14.5189 18.225 14.2237 18.5156C13.9286 18.8063 13.925 19.2811 14.2156 19.5762L16.3823 21.7762C16.5334 21.9296 16.7431 22.0107 16.9581 21.9988C17.173 21.9869 17.3725 21.8832 17.5058 21.7141L21.8391 16.2141Z" fill="currentColor" />
    </svg>
  );
}

function GutIcon() {
  return (
    <svg className="size-4 shrink-0 mt-0.5 text-brand-foreground" aria-hidden="true" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.25 3.75H6.75C5.09315 3.75 3.75 5.09315 3.75 6.75V8.25M15.75 3.75H17.25C18.9069 3.75 20.25 5.09315 20.25 6.75V8.25M20.25 15.75V17.25C20.25 18.9069 18.9069 20.25 17.25 20.25H15.75M8.25 20.25H6.75C5.09315 20.25 3.75 18.9069 3.75 17.25V15.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="size-4 shrink-0 mt-0.5 text-brand-foreground" aria-hidden="true" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.75 5.75V13C3.75 17.5563 7.44365 21.25 12 21.25C14.8328 21.25 17.3321 19.8223 18.8176 17.6471M7 4.37121L10.8284 2.74706C11.5772 2.42939 12.4228 2.42939 13.1716 2.74706L18.4216 4.97434C19.5301 5.44459 20.25 6.532 20.25 7.73608V13C20.25 13.6049 20.1849 14.1945 20.0613 14.7624M1.75 3.75L22.25 20.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg className="size-4 shrink-0 mt-0.5 text-brand-foreground" aria-hidden="true" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.25 9.9375C21.25 15.8672 12.7708 20.25 12 20.25C11.2292 20.25 2.75 15.8672 2.75 9.9375C2.75 5.8125 5.31944 3.75 7.88889 3.75C10.4583 3.75 12 5.29688 12 5.29688C12 5.29688 13.5417 3.75 16.1111 3.75C18.6806 3.75 21.25 5.8125 21.25 9.9375Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description?: string;
}

const baselineFeatures: Feature[] = [
  { icon: <LabIcon />, title: "100+ labs and a full health report", description: "A clear snapshot of your health today" },
  { icon: <DocumentIcon />, title: "Consolidate past lab data instantly" },
  { icon: <PillIcon />, title: "Personalised diet, supplement & Rx plan" },
  { icon: <ChatIcon />, title: "Unlimited concierge messaging" },
  { icon: <TagIcon />, title: "Member pricing on add-on tests" },
  { icon: <CrossIcon />, title: "Superpower Clinic for medical products" },
];

const performanceNewFeatures: Feature[] = [
  { icon: <DumbbellIcon />, title: "Deeper energy & metabolic insights", description: "Increased labs from 100 to 130+" },
  { icon: <CalendarCheckIcon />, title: "Progress tracking and protocol refinement", description: "Additional 6 month re-test, 100+ labs" },
];

const completeNewFeatures: Feature[] = [
  { icon: <GutIcon />, title: "Gut Microbiome Test for gut health" },
  { icon: <ShieldIcon />, title: "Methylation Panel to optimize energy" },
  { icon: <HeartIcon />, title: "Organ Age Panel for all your organs" },
];

function FeatureList({ features, textClass = "text-primary-foreground" }: { features: Feature[]; textClass?: string }) {
  return (
    <ul className={`check-list list-none typography-body ${textClass} space-y-3`}>
      {features.map((feature, index) => (
        <li key={index} className="flex items-start gap-3" style={{ willChange: "opacity, transform" }}>
          {feature.icon}
          {feature.description ? (
            <div>
              <p>{feature.title}</p>
              <p className="text-secondary-foreground">{feature.description}</p>
            </div>
          ) : (
            feature.title
          )}
        </li>
      ))}
    </ul>
  );
}

export default function TierFeatures({ tier }: { tier: TierKey }) {
  if (tier === 'baseline') {
    return (
      <div className="typography-body">
        <p className="text-primary-foreground mb-4">Includes:</p>
        <FeatureList features={baselineFeatures} />
      </div>
    );
  }

  if (tier === 'performance') {
    return (
      <div className="typography-body">
        <p className="text-primary-foreground mb-4">Includes everything in Baseline, plus:</p>
        <FeatureList features={performanceNewFeatures} />
        <div className="w-full h-px bg-border my-6" />
        <div>
          <p className="text-secondary-foreground mb-4">Still includes:</p>
          <FeatureList features={baselineFeatures} textClass="text-secondary-foreground" />
        </div>
      </div>
    );
  }

  // complete
  return (
    <div className="typography-body">
      <p className="text-primary-foreground mb-4">Includes everything in Performance, plus:</p>
      <FeatureList features={completeNewFeatures} />
      <div className="list-none w-full h-px bg-border my-6" />
      <div>
        <p className="typography-body text-secondary-foreground mb-4">Includes:</p>
        <ul className="check-list list-none typography-body text-secondary-foreground space-y-3">
          {performanceNewFeatures.map((feature, index) => (
            <li key={index} className="flex text-secondary-foreground gap-3 items-start" style={{ willChange: "opacity, transform" }}>
              {feature.icon}
              {feature.description ? (
                <div>
                  <p>{feature.title}</p>
                  <p className="text-secondary-foreground">{feature.description}</p>
                </div>
              ) : (
                feature.title
              )}
            </li>
          ))}
        </ul>
        <div className="w-full h-px bg-border my-6" />
        <p className="typography-body text-secondary-foreground mb-4">And everything in Baseline:</p>
        <FeatureList features={baselineFeatures} textClass="text-secondary-foreground" />
      </div>
    </div>
  );
}
