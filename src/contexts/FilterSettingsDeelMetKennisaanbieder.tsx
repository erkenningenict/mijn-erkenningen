import { useState } from 'react';
import { createContainer } from 'unstated-next';
import { ViewFilterOptionsEnum } from '../enums/enums';

export interface FilterSettingsDeelMetKennisaanbieder {
  viewFilterOption: ViewFilterOptionsEnum;
}

export const defaultSimpleFilterSettings: FilterSettingsDeelMetKennisaanbieder =
  {
    viewFilterOption: ViewFilterOptionsEnum.all,
  };

export function useViewFilterKennisaanbieder(
  initialState = defaultSimpleFilterSettings,
) {
  const [filterSettings, setFilterSettings] =
    useState<FilterSettingsDeelMetKennisaanbieder>(initialState);
  return { filterSettings, setFilterSettings };
}

export const ViewFilterKennisaanbieder = createContainer(
  useViewFilterKennisaanbieder,
);
