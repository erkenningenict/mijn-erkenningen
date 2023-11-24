import { useState } from 'react';
import { createContainer } from 'unstated-next';

export interface FilterSettingsRegistreerDeelnemerCursussen {
  datumVanaf: string;
  datumTot: string;
}

export const defaultSimpleFilterSettings: FilterSettingsRegistreerDeelnemerCursussen =
  {
    datumVanaf: new Date().toISOString(),
    datumTot: new Date().toISOString(),
  };

export function useSimpleSimpleFilterSettingsRegistreerDeelnemerCursussen(
  initialState = defaultSimpleFilterSettings,
) {
  const [filterSettings, setFilterSettings] =
    useState<FilterSettingsRegistreerDeelnemerCursussen>(initialState);
  return { filterSettings, setFilterSettings };
}

export const SimpleFilterSettingsRegistreerDeelnemerCursussen = createContainer(
  useSimpleSimpleFilterSettingsRegistreerDeelnemerCursussen,
);
