import {
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonRouterOutlet,
  IonModal,
} from '@ionic/react';
import React, { useState } from 'react';
import { Redirect, Route, useParams } from 'react-router';

import { businessOutline, peopleOutline } from 'ionicons/icons';
import CursusDetailsPage from './cursus/CursusDetailsPage';
import DeelnemersListPage from './cursus/DeelnemersListPage';
import DeelnemerDetailsPage from './cursus/DeelnemerDetailsPage';
import SelectLicenseModal from '../../components/SelectLicenseModal';

const CursusTabsPage: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const { cursusId } = useParams<{ cursusId: string }>();

  return (
    <>
      <IonTabs>
        <IonRouterOutlet>
          <Route
            path={`/registreer-deelnemers/cursus/:cursusId/overzicht`}
            exact
          >
            <CursusDetailsPage />
          </Route>

          <Route
            path={`/registreer-deelnemers/cursus/:cursusId/deelnemers`}
            exact
          >
            <DeelnemersListPage />
          </Route>

          <Route
            path={`/registreer-deelnemers/cursus/:cursusId/deelnemer/:persoonId`}
            exact
          >
            <DeelnemerDetailsPage />
          </Route>
          <Route
            path={`/registreer-deelnemers/cursus/:cursusId/pasnummer/:pasNummer`}
            exact
          >
            <DeelnemerDetailsPage />
          </Route>
          <Redirect
            path={`/registreer-deelnemers/cursus/:cursusId`}
            to={`/registreer-deelnemers/cursus/:cursusId/overzicht`}
            exact
          />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton
            tab="Overzicht"
            href={`/registreer-deelnemers/cursus/${cursusId}/overzicht`}
          >
            <IonIcon icon={businessOutline} />
            <IonLabel>Bijeenkomst</IonLabel>
          </IonTabButton>

          <IonTabButton
            tab="Deelnemers"
            href={`/registreer-deelnemers/cursus/${cursusId}/deelnemers`}
          >
            <IonIcon icon={peopleOutline} />
            <IonLabel>Deelnemers</IonLabel>
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

export default React.memo(CursusTabsPage);
