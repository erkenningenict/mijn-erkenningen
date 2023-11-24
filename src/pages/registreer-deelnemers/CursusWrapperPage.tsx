import {} from '@ionic/react';
import React, { useEffect } from 'react';
import { SimpleFilter } from '../../contexts/FilterSettings';
import { add, isSameDay } from 'date-fns';
import CursusTabsPage from './CursusTabsPage';

const CursusWrapperPage: React.FC = () => {
  const { filterSettings, setFilterSettings } = SimpleFilter.useContainer();

  const setUpdateFilter = React.useCallback(() => {
    setFilterSettings({
      ...filterSettings,
      datumVanaf: new Date().toISOString(),
      datumTot: add(new Date(), { months: 3 }).toISOString(),
      dateSet: new Date(),
    });
  }, [filterSettings, setFilterSettings]);

  useEffect(() => {
    if (!isSameDay(filterSettings.dateSet, new Date())) {
      // reset the dates when switching days (else you will have an old date selection)
      setUpdateFilter();
    }
  }, [filterSettings.dateSet, setUpdateFilter]);

  return <CursusTabsPage />;
};

export default React.memo(CursusWrapperPage);
