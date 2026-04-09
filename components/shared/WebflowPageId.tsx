'use client';

import { useEffect } from 'react';

export default function WebflowPageId({ pageId }: { pageId: string }) {
  useEffect(() => {
    document.documentElement.setAttribute('data-wf-page', pageId);
    return () => {
      document.documentElement.removeAttribute('data-wf-page');
    };
  }, [pageId]);

  return null;
}
