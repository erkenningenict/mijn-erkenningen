import { useState } from 'react';
import { createContainer } from 'unstated-next';

export interface FilterSettingsDeelnemer {
  naam: string;
  postcode: string;
  geboortejaar: string;
  pasnummer: string;
}

export const defaultSimpleFilterSettings: FilterSettingsDeelnemer = {
  naam: '',
  postcode: '',
  geboortejaar: '',
  pasnummer: '',
};

export function useViewFilterDeelnemer(
  initialState = defaultSimpleFilterSettings,
) {
  const [filterSettings, setFilterSettings] =
    useState<FilterSettingsDeelnemer>(initialState);
  return { filterSettings, setFilterSettings };
}

export const ViewFilterDeelnemer = createContainer(useViewFilterDeelnemer);
