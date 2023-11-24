import { useState } from 'react';
import { createContainer } from 'unstated-next';
import { CertificeringenFieldsFragment } from '../__generated__/graphql';

export function useSelectedLicense(initialLicense = undefined) {
  const [license, setLicense] = useState<
    CertificeringenFieldsFragment | undefined | null
  >(initialLicense);
  return { license, setLicense };
}

export const SelectedLicense = createContainer(useSelectedLicense);
