import { useState } from 'react';
import { createContainer } from 'unstated-next';

export function useOffline(initialState: boolean = false) {
  const [offline, setOffline] = useState<boolean>(initialState);
  return { offline, setOffline };
}

export const IsOffline = createContainer(useOffline);
