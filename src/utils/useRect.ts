'use client';

import { useEffect, useState } from 'react';

function useRect(elementToObserve: React.RefObject<HTMLElement>) {
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const element = elementToObserve?.current;

    if (!element) return;
    const observer = new ResizeObserver(() => {
      setRect(element.getBoundingClientRect());
    });
    observer.observe(element);
    return () => {
      // Cleanup the observer by unobserving all elements
      observer.disconnect();
    };
  }, [elementToObserve]);

  return rect;
}

export default useRect;
