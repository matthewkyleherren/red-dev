'use client';

import { useState, FormEvent } from 'react';

interface EmailFormProps {
  placeholder?: string;
  buttonText?: string;
  onSubmit?: (email: string) => void;
}

export default function EmailForm({ placeholder = "Your email", buttonText = "Continue", onSubmit }: EmailFormProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (onSubmit) {
      onSubmit(email);
    } else {
      // Default: store in sessionStorage and navigate to next step
      sessionStorage.setItem('checkout_email', email);
    }
  };

  return (
    <form className="grid md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
      <div className="md:col-span-2">
        <label
          data-slot="label"
          className="flex items-center gap-2 typography-body select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 text-foreground aria-required:after:content-['*'] aria-required:after:ml-0.5 aria-required:after:text-red-500 aria-invalid:text-destructive-foreground aria-required:aria-invalid:after:text-destructive-foreground mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          data-slot="input"
          className="peer border-input w-full min-w-0 shadow-xs selection:bg-zinc-900 selection:text-white placeholder:text-tertiary file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:typography-body file:font-medium duration-150 ease-out-expo transition-[outline,outline-offset] outline-transparent outline-0 outline-offset-0 not-focus-visible:hover:duration-50 not-focus-visible:hover:outline-offset-3 not-focus-visible:hover:outline-[3px] not-focus-visible:hover:outline-primary/10 focus-visible:duration-50 focus-visible:outline-[1.5px] focus-visible:outline-brand-500 focus-visible:outline-offset-2 caret-brand aria-invalid:text-destructive-foreground aria-invalid:focus-visible:outline-destructive-foreground aria-invalid:caret-destructive-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:shadow-none disabled:bg-zinc-50 disabled:text-zinc-500 bg-background text-foreground typography-largebody rounded-lg gap-2 py-4 px-6"
          id="email"
          placeholder={placeholder}
          autoComplete="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
          aria-invalid={!!error || undefined}
        />
        {error && (
          <p className="text-red-500 text-sm mt-1">{error}</p>
        )}
      </div>
      <button
        data-slot="button"
        className="inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap transition-all disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-offset-2 focus-visible:ring-ring focus-visible:ring-[2px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive bg-zinc-900 text-white hover:bg-zinc-800 disabled:bg-zinc-200 disabled:text-zinc-500 typography-largebody rounded-lg py-4 px-5 has-[>svg]:px-4 md:col-span-2 w-full"
        type="submit"
      >
        {buttonText}
      </button>
    </form>
  );
}
