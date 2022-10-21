import { useState } from 'react';
import { createContainer } from 'unstated-next';

export function useAuth(initial = false) {
  const [authenticated, setAuthenticated] = useState<boolean>(initial);
  return { authenticated, setAuthenticated };
}

export const Authenticated = createContainer(useAuth);
