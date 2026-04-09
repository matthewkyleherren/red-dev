'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      data-slot="button"
      className="inline-flex items-center cursor-pointer justify-center transition-all disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-offset-2 focus-visible:ring-ring focus-visible:ring-[2px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive bg-transparent text-zinc-900 hover:text-zinc-700 aria-disabled:text-zinc-400 rounded-sm focus-visible:ring-offset-x-3 whitespace-break-spaces group gap-1.5"
      type="button"
      onClick={() => router.back()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-arrow-left size-4 -mt-0.5 transition-all duration-200 ease-out group-hover:-translate-x-0.5"
        aria-hidden="true"
      >
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
      </svg>
      <span>Back</span>
    </button>
  );
}
