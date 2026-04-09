'use client';

import { useRef, useCallback } from 'react';

interface BiomarkerSearchProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

export default function BiomarkerSearch({
  searchQuery,
  onSearch,
}: BiomarkerSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onSearch(value);
      }, 80);
    },
    [onSearch]
  );

  const handleClear = useCallback(() => {
    if (inputRef.current) inputRef.current.value = '';
    onSearch('');
    inputRef.current?.focus();
  }, [onSearch]);

  return (
    <div
      id="bio_search"
      className={`bio_search${searchQuery ? ' has-query' : ''}`}
    >
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="bio_search-icon"
      >
        <circle cx="7" cy="7" r="5.25" />
        <path d="M11 11l3.5 3.5" />
      </svg>
      <input
        type="text"
        id="bio_search-input"
        placeholder="Search biomarkers..."
        className="bio_search-input"
        ref={inputRef}
        defaultValue={searchQuery}
        onChange={handleInput}
      />
      <button
        id="bio_search-clear"
        className="bio_search-clear"
        onClick={handleClear}
        type="button"
      >
        &#x2715;
      </button>
    </div>
  );
}
