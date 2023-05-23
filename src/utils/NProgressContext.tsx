'use client';

import React from 'react';
import NProgress from 'nprogress';

interface NProgress {
  start: () => NProgress.NProgress;
  done: () => NProgress.NProgress;
}

/* On this version of Next.js the router events are not supported */
/* There is a bad UX when a link is clicked, because the app feel stuck while waiting for the server response */
/* With this is possible to give a visual feedback to the user after a navigation is triggered */

export const NProgressContext = React.createContext<NProgress | null>(null);

interface Props {
  children: React.ReactNode;
}

export function NprogressProvider({ children }: Props) {
  const nProgress: NProgress = React.useMemo(() => {
    return {
      start: () => NProgress.start(),
      done: () => NProgress.done(),
    };
  }, []);

  return (
    <NProgressContext.Provider value={nProgress}>
      {children}
    </NProgressContext.Provider>
  );
}
