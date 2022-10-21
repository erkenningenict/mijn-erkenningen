import React, { useCallback, useEffect, useState } from 'react';
import { setupIonicReact, IonApp, IonSplitPane } from '@ionic/react';
import Menu from './components/Menu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Main from './components/Main';
import { SelectedLicense } from './contexts/SelectedLicenseContext';
import { useToast } from './components/Toast';
import { SimpleFilter } from './contexts/FilterSettings';
import { Authenticated } from './contexts/AuthContext';
import { IsOffline } from './contexts/OfflineContext';
import { ViewFilterHandelaar } from './contexts/FilterSettingsDeelMetHandelaar';
import { ViewFilterKennisaanbieder } from './contexts/FilterSettingsDeelMetKennisaanbieder';
import { ViewFilterDeelnemer } from './contexts/SearchSettingsRegistreerDeelnemer';
import { SimpleFilterSettingsRegistreerDeelnemerCursussen } from './contexts/FilterSettingsRegistreerDeelnemerCursussen';

const getConfig = () => {
  let config = {
    backButtonText: 'Vorige',
  };
  // if (isPlatform('hybrid')) {
  //   return {
  //     backButtonText: 'Previous',
  //     tabButtonLayout: 'label-hide',
  //   };
  // }

  // return {
  //   menuIcon: 'ellipsis-vertical',
  // };
  return config;
};

setupIonicReact(getConfig());

// Use matchMedia to check the user preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

toggleDarkTheme(prefersDark.matches);

// Listen for changes to the prefers-color-scheme media query
prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));

// Add or remove the "dark" class based on if the media query matches
function toggleDarkTheme(shouldAdd: boolean) {
  document.body.classList.toggle('dark', shouldAdd);
}

export const App: React.FC = () => {
  const Toast = useToast();
  const { setOffline } = IsOffline.useContainer();
  const [offlineToast, setOfflineToast] = useState<any>();

  const handleOffline = useCallback(() => {
    console.log('offline');
    setOffline(true);
    // clearToast();
    const toast = Toast.create({
      message: 'U heeft geen verbinding met het internet',
      color: 'danger',
      duration: 0,
    });
    toast.present();
    setOfflineToast(toast);
  }, [Toast, setOffline]);

  const handleOnline = useCallback(() => {
    console.log('online');
    setOffline(false);
    // clearToast();
    offlineToast.dismiss();
    setTimeout(() => {
      Toast.success('U heeft weer verbinding met het internet');
    }, 300);
  }, [Toast, setOffline, offlineToast]);

  useEffect(() => {
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, [handleOffline, handleOnline]);
  return (
    <Authenticated.Provider>
      <SelectedLicense.Provider>
        <SimpleFilter.Provider>
          <ViewFilterDeelnemer.Provider>
            <ViewFilterKennisaanbieder.Provider>
              <ViewFilterHandelaar.Provider>
                <SimpleFilterSettingsRegistreerDeelnemerCursussen.Provider>
                  <IonApp>
                    <IonSplitPane contentId="main">
                      <Menu />
                      <Main></Main>
                    </IonSplitPane>
                  </IonApp>
                </SimpleFilterSettingsRegistreerDeelnemerCursussen.Provider>
              </ViewFilterHandelaar.Provider>
            </ViewFilterKennisaanbieder.Provider>
          </ViewFilterDeelnemer.Provider>
        </SimpleFilter.Provider>
      </SelectedLicense.Provider>
    </Authenticated.Provider>
  );
};

export default App;
