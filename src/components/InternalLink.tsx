'use client';

import React from 'react';
import Link from 'next/link';
import { type ComponentProps } from 'react';
import { NProgressContext } from '@/utils/NProgressContext';

function InternalLink(props: ComponentProps<typeof Link>) {
  const nProgress = React.useContext(NProgressContext);

  const handleClick = React.useCallback(() => {
    if (nProgress) {
      nProgress.start();
    }
  }, [nProgress]);

  return <Link {...props} onClick={handleClick} />;
}

export default InternalLink;
