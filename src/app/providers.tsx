'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { type PropsWithChildren } from 'react';
import StyledComponentsRegistry from '@/utils/StyledComponentsRegistry';
import { NProgressContext } from '@/utils/NProgressContext';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Providers({ children }: PropsWithChildren) {
  const [queryClient] = React.useState(() => new QueryClient());
  const nProgress = React.useContext(NProgressContext);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    if (nProgress) {
      nProgress.done();
    }
  }, [pathname, searchParams, nProgress]);

  return (
    <QueryClientProvider client={queryClient}>
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
    </QueryClientProvider>
  );
}
