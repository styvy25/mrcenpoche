
import { useEffect } from 'react';

type EventCallback<T = any> = (event: CustomEvent<T>) => void;

export const useEventListener = <T = any>(
  eventName: string, 
  callback: EventCallback<T>,
  dependencies: any[] = []
) => {
  useEffect(() => {
    const handler = (event: Event) => {
      callback(event as CustomEvent<T>);
    };
    
    document.addEventListener(eventName, handler);
    
    return () => {
      document.removeEventListener(eventName, handler);
    };
  }, dependencies);
};
