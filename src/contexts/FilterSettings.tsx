import { add } from 'date-fns';
import { useState } from 'react';
import { createContainer } from 'unstated-next';

export interface FilterSettings {
  competentieId: number;
  themaId: number;
  sectorId: number;
  afstand: number;
  postcode: string;
  datumVanaf: string;
  datumTot: string;
  dateSet: Date;
}

export const defaultSimpleFilterSettings: FilterSettings = {
  competentieId: 0,
  themaId: 0,
  sectorId: 0,
  afstand: 0,
  postcode: '',
  datumVanaf: new Date().toISOString(),
  datumTot: add(new Date(), { months: 3 }).toISOString(),
  dateSet: new Date(),
};

export function useSimpleFilter(initialState = defaultSimpleFilterSettings) {
  const [filterSettings, setFilterSettings] =
    useState<FilterSettings>(initialState);
  return { filterSettings, setFilterSettings };
}

export const SimpleFilter = createContainer(useSimpleFilter);
