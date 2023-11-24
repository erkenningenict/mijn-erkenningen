import { useState } from 'react';
import { createContainer } from 'unstated-next';
import { ViewFilterOptionsEnum } from '../enums/enums';

export interface FilterSettingsDeelMetHandelaar {
  viewFilterOption: ViewFilterOptionsEnum;
}

export const defaultSimpleFilterSettings: FilterSettingsDeelMetHandelaar = {
  viewFilterOption: ViewFilterOptionsEnum.sharedOnly,
};

export function useViewFilterHandelaar(
  initialState = defaultSimpleFilterSettings,
) {
  const [filterSettings, setFilterSettings] =
    useState<FilterSettingsDeelMetHandelaar>(initialState);
  return { filterSettings, setFilterSettings };
}

export const ViewFilterHandelaar = createContainer(useViewFilterHandelaar);
