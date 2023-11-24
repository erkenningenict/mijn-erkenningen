import {
  IonBadge,
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonRouterOutlet,
  IonLoading,
} from '@ionic/react';
import React, { useEffect } from 'react';
import {
  Certificering,
  useApp_GetStudyProgressByLicenseIdQuery,
} from '../../__generated__/graphql';
import { Redirect, Route, useParams } from 'react-router';
import {
  calendar,
  ribbonOutline,
  qrCodeOutline,
  cardOutline,
} from 'ionicons/icons';
import LicenseOverview from './license-overview/LicenseOverview';
import StudyProgress from './studie-voortgang/StudyProgress';
import BijeenkomstenBijLicentie from './bijeenkomsten/BijeenkomstenBijLicentie';
import AangemeldeBijeenkomstDetailsPage from './bijeenkomsten/AangemeldeBijeenkomstDetails';
import GevolgdeBijeenkomstDetailsPage from './bijeenkomsten/GevolgdeBijeenkomstDetails';
import PassenPage from './passen/PassenPage';
import { SelectedLicense } from '../../contexts/SelectedLicenseContext';
import { isLicenseValidOnDate } from '../../helpers/license-helper';
import ErrorComponent from '../../components/ErrorComponent';

const LicenseDetails: React.FC = () => {
  const { certificeringId } = useParams<{ certificeringId: string }>();
  const { setLicense } = SelectedLicense.useContainer();

  const { loading, error, data } = useApp_GetStudyProgressByLicenseIdQuery({
    variables: {
      certificeringId: +certificeringId,
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    skip: certificeringId === null || typeof certificeringId === 'undefined',
  });

  useEffect(() => {
    if (!data?.getStudyProgressByLicenseId?.Certificering) {
      return;
    }
    if (
      isLicenseValidOnDate(
        data?.getStudyProgressByLicenseId.Certificering as Certificering,
        new Date(),
      )
    ) {
      setLicense(data?.getStudyProgressByLicenseId.Certificering);
    }
  }, [data?.getStudyProgressByLicenseId, setLicense]);

  if (error) {
    console.log(
      '#DH# LicenseDetails useApp_GetStudyProgressByLicenseIdQuery error',
      certificeringId,
      error,
    );
    return <ErrorComponent error={error} />;
  }

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path={`/mijn-licenties/:certificeringId/overzicht`} exact>
          <LicenseOverview />
        </Route>
        <Route path={`/mijn-licenties/:certificeringId/studievoortgang`} exact>
          <StudyProgress />
        </Route>
        <Route path={`/mijn-licenties/:certificeringId/bijeenkomsten`} exact>
          <BijeenkomstenBijLicentie />
        </Route>

        <Route
          path={`/mijn-licenties/:certificeringId/bijeenkomsten/:cursusId/aangemelde-bijeenkomst-details`}
          exact
        >
          <AangemeldeBijeenkomstDetailsPage />
        </Route>
        <Route
          path={`/mijn-licenties/:certificeringId/bijeenkomsten/:cursusId/gevolgde-bijeenkomst-details`}
          exact
        >
          <GevolgdeBijeenkomstDetailsPage />
        </Route>
        <Route path={`/mijn-licenties/:certificeringId/passen`} exact>
          <PassenPage
            license={data?.getStudyProgressByLicenseId?.Certificering}
          />
        </Route>
        <Redirect
          exact
          path={`/mijn-licenties/${certificeringId}`}
          to={`/mijn-licenties/${certificeringId}/overzicht`}
        />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton
          tab="overzicht"
          href={`/mijn-licenties/${certificeringId}/overzicht`}
        >
          <IonIcon icon={qrCodeOutline} />
          <IonLabel>Overzicht</IonLabel>
        </IonTabButton>

        {data?.getStudyProgressByLicenseId?.Certificering &&
          isLicenseValidOnDate(
            data?.getStudyProgressByLicenseId?.Certificering as Certificering,
          ) && (
            <IonTabButton
              tab="studievoortgang"
              href={`/mijn-licenties/${certificeringId}/studievoortgang`}
            >
              <IonIcon icon={ribbonOutline} />
              <IonLabel>Studievoortgang</IonLabel>
              <IonBadge>
                {data?.getStudyProgressByLicenseId?.PointsToDo}
              </IonBadge>
            </IonTabButton>
          )}

        <IonTabButton
          tab="bijeenkomsten"
          href={`/mijn-licenties/${certificeringId}/bijeenkomsten`}
        >
          <IonIcon icon={calendar} />
          <IonLabel>Bijeenkomsten</IonLabel>
        </IonTabButton>

        <IonTabButton
          tab="passen"
          href={`/mijn-licenties/${certificeringId}/passen`}
        >
          <IonIcon icon={cardOutline} />
          <IonLabel>Passen</IonLabel>
        </IonTabButton>
      </IonTabBar>
      <IonLoading
        isOpen={loading}
        message={'Even geduld aub, gegevens worden opgehaald'}
        duration={0}
      />
    </IonTabs>
  );
};

export default LicenseDetails;
