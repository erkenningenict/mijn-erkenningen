import {
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonRouterOutlet,
  IonModal,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router';
import {
  businessOutline,
  calendarNumberOutline,
  desktopOutline,
} from 'ionicons/icons';
import OpLocatieList from './op-locatie/OpLocatieList';
import DigitaalList from './digitaal/DigitaalList';
import WebinarList from './webinar/WebinarList';
import { SelectedLicense } from '../../contexts/SelectedLicenseContext';
import SelectLicenseModal from '../../components/SelectLicenseModal';
import { useApp_GetListsQuery } from '../../__generated__/graphql';
import ErrorComponent from '../../components/ErrorComponent';

const BijeenkomstenPage: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { license } = SelectedLicense.useContainer();
  const { error } = useApp_GetListsQuery({
    fetchPolicy: 'cache-first',
  });

  useEffect(() => {
    if (license === null && !showModal) {
      return;
    }
    if (!license && !showModal) {
      setShowModal(true);
    }
  }, [license, showModal]);

  if (error) {
    console.log('#DH# bijeenkomsten page error', error);
    return <ErrorComponent error={error} />;
  }

  return (
    <>
      <IonTabs>
        <IonRouterOutlet>
          <Route path={`/bijeenkomsten/op-locatie`} exact>
            <OpLocatieList />
          </Route>
          <Route path={`/bijeenkomsten/webinars`} exact>
            <WebinarList />
          </Route>
          <Route path={`/bijeenkomsten/digitaal`} exact>
            <DigitaalList />
          </Route>

          <Redirect
            exact
            path={`/bijeenkomsten`}
            to={`/bijeenkomsten/op-locatie`}
          />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="op-locatie" href={`/bijeenkomsten/op-locatie`}>
            <IonIcon icon={businessOutline} />
            <IonLabel>Op locatie</IonLabel>
          </IonTabButton>

          <IonTabButton tab="webinars" href={`/bijeenkomsten/webinars`}>
            <IonIcon icon={calendarNumberOutline} />
            <IonLabel>Webinars</IonLabel>
          </IonTabButton>

          <IonTabButton tab="digitaal" href={`/bijeenkomsten/digitaal`}>
            <IonIcon icon={desktopOutline} />
            <IonLabel>Digitaal</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        <SelectLicenseModal
          dismissModal={() => {
            setShowModal(false);
          }}
        />
      </IonModal>
    </>
  );
};

export default React.memo(BijeenkomstenPage);
