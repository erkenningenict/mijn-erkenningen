import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonBackButton,
  IonLoading,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { locationOutline } from 'ionicons/icons';
import React from 'react';

import { useParams } from 'react-router';

import { CardHeader } from '../../../components/CardHeader';
import ErrorComponent from '../../../components/ErrorComponent';
import { toDutchDate, toDutchTime } from '../../../helpers/date-helpers';
import { toDutchMoney } from '../../../helpers/format-money';
import { useApp_GetCursusInfoForHoogleraarQuery } from '../../../__generated__/graphql';

const CursusDetailsPage: React.FC = () => {
  const { cursusId } = useParams<{ cursusId: string }>();

  const { loading, error, data } = useApp_GetCursusInfoForHoogleraarQuery({
    variables: {
      input: {
        cursusId: +cursusId,
      },
    },
    fetchPolicy: 'cache-and-network',
    skip: !!0,
  });

  if (error) {
    console.log('#DH# error', error);
    return <ErrorComponent error={error} />;
  }

  const d = data?.GetCursusInfoForHoogleraar;
  const sessie =
    data?.GetCursusInfoForHoogleraar?.Sessies &&
    data?.GetCursusInfoForHoogleraar?.Sessies[0];

  const address = sessie?.Lokatie?.Contactgegevens;
  const handleGoToMaps = () => {
    if (address) {
      const addressForLink = `${address.DisplayAddress}`;
      window.open(
        `https://www.google.nl/maps/place/${addressForLink.replace(
          /\s/g,
          '+',
        )}`,
      );
    }
  };
  const locationName = sessie?.Lokatie?.Naam;
  const locationAddress = address && (
    <div className="location-area">
      {(locationName === 'Webinar' || locationName === 'Online cursus') && (
        <>
          <p className="location-label">Webinar</p>
        </>
      )}

      {locationName !== 'Webinar' && locationName !== 'Online cursus' && (
        <>
          <CardHeader>Bijeenkomstlocatie</CardHeader>
          <p>{locationName}</p>
          <p>{address.DisplayAddress}</p>
          <IonButton
            className="ion-margin-top"
            onClick={handleGoToMaps}
            color="medium"
          >
            <IonIcon slot="start" icon={locationOutline} />
            Open kaart
          </IonButton>
        </>
      )}
    </div>
  );
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/registreer-deelnemers"></IonBackButton>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Bijeenkomst</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {d && (
          <>
            <IonCard className="welcome-card">
              <IonCardHeader>
                <p style={{ fontSize: '16px', marginBottom: '5px' }}>
                  <strong>{d?.Titel}</strong>
                </p>
                <p style={{ marginBottom: '15px' }}>
                  Erkenningencode: {d?.CursusCode}
                </p>
              </IonCardHeader>
              <IonCardContent>
                <dl className="styled-dl mb-2">
                  <dt>Thema</dt>
                  <dd>{d?.Vak.ThemaNaam}</dd>

                  <dt>Competentie</dt>
                  <dd>{d?.Vak.CompetentieNaam}</dd>

                  <dt>Datum</dt>
                  <dd>{toDutchDate(sessie?.DatumBegintijd)}</dd>

                  <dt>Van-tot</dt>
                  <dd>
                    {toDutchTime(sessie?.DatumBegintijd)} -{' '}
                    {toDutchTime(sessie?.DatumEindtijd)}
                  </dd>

                  <dt>Plaats</dt>
                  <dd>
                    {(locationName !== 'Webinar' &&
                      locationName !== 'Online cursus' &&
                      address?.DisplayAddress) ||
                      locationName}
                  </dd>

                  <dt>Prijs</dt>
                  <dd>{toDutchMoney(d?.Prijs, { euroPrefix: true })}</dd>
                </dl>
                <p className={`mt-2`}>{d?.Promotietekst}</p>

                {locationAddress}
              </IonCardContent>
            </IonCard>
          </>
        )}
        {loading && (
          <IonLoading
            isOpen={true}
            message={'Even geduld aub, gegevens worden opgehaald'}
            duration={0}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default CursusDetailsPage;
