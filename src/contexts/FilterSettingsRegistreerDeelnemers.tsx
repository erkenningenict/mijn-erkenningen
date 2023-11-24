import { useState } from 'react';
import { createContainer } from 'unstated-next';
import { ViewFilterOptionsEnum } from '../enums/enums';

export interface FilterSettingsRegistreerDeelnemers {
  postcode: ViewFilterOptionsEnum;
  test: ViewFilterOptionsEnum;
}

export const defaultSimpleFilterSettings: FilterSettingsRegistreerDeelnemers = {
  postcode: ViewFilterOptionsEnum.sharedOnly,
  test: ViewFilterOptionsEnum.sharedOnly,
};

export function useViewFilterRegistreerDeelnemers(
  initialState = defaultSimpleFilterSettings,
) {
  const [filterSettings, setFilterSettings] =
    useState<FilterSettingsRegistreerDeelnemers>(initialState);
  return { filterSettings, setFilterSettings };
}

export const ViewFilterRegistreerDeelnemers = createContainer(
  useViewFilterRegistreerDeelnemers,
);
