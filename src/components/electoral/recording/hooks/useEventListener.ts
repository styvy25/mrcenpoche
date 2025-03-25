
import { useEffect } from 'react';

export function useEventListener<T>(
  eventName: string,
  handler: (event: CustomEvent<T>) => void,
  deps: any[] = []
) {
  useEffect(() => {
    const handleEvent = (event: Event) => {
      handler(event as CustomEvent<T>);
    };

    document.addEventListener(eventName, handleEvent);

    return () => {
      document.removeEventListener(eventName, handleEvent);
    };
  }, [eventName, handler, ...deps]);
}
