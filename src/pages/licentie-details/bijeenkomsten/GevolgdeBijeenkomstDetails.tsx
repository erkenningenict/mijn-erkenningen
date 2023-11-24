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
  IonCardSubtitle,
  IonCardTitle,
  IonBackButton,
  IonLoading,
} from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import { CardHeader } from '../../../components/CardHeader';
import { EmailLink } from '../../../components/EmailLink';
import ErrorComponent from '../../../components/ErrorComponent';
import { PhoneLink } from '../../../components/PhoneLink';
import { WebsiteLink } from '../../../components/WebsiteLink';
import {
  relativeTimeFormatter,
  toDutchDate,
  toDutchTime,
} from '../../../helpers/date-helpers';
import { toDutchMoney } from '../../../helpers/format-money';
import {
  useApp_GetMyStudieresultatenEnAangemeldeCursusdeelnamesQuery,
  CursusFieldsFragment,
} from '../../../__generated__/graphql';
import './AangemeldeBijeenkomstDetails.css';

export interface GevolgdeBijeenkomstDetailsProps {}

const GevolgdeBijeenkomstDetailsPage: React.FC<
  GevolgdeBijeenkomstDetailsProps
> = () => {
  const { certificeringId, cursusId } = useParams<{
    certificeringId: string;
    cursusId: string;
  }>();
  const { loading, error, data } =
    useApp_GetMyStudieresultatenEnAangemeldeCursusdeelnamesQuery({
      variables: {
        certificeringId: +certificeringId,
      },
      fetchPolicy: 'cache-and-network',
      skip: certificeringId === null,
    });

  if (error) {
    console.log('#DH# error', error);
    return <ErrorComponent error={error} />;
  }

  const firstSessie = (cursus: CursusFieldsFragment | null | undefined) => {
    if (cursus && cursus.Sessies && cursus.Sessies[0]) {
      return cursus.Sessies[0];
    }
  };

  const cursus = data?.my?.Studieresultaten?.find(
    (c) => c.Cursus.CursusID === +cursusId,
  );

  const organisatie =
    cursus?.Cursus.Vak?.Vakgroep !== null
      ? cursus?.Cursus.Vak?.Vakgroep
      : cursus?.Cursus.Vak?.ExamenInstelling;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Gevolgd</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonCard className="welcome-card">
          <IonCardHeader>
            <IonCardTitle>Gevolgd</IonCardTitle>
            <IonCardSubtitle>
              <h6>{cursus?.Cursus.Titel}</h6>
              <p>{cursus?.Cursus.CursusCode}</p>
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <dl className="styled-dl">
              <dt>Datum</dt>
              <dd>
                {toDutchDate(firstSessie(cursus?.Cursus)?.DatumBegintijd)} (
                <span style={{ fontSize: 'smaller' }}>
                  {relativeTimeFormatter(
                    firstSessie(cursus?.Cursus)?.DatumBegintijd,
                  )}
                </span>
                )
              </dd>
              <dt>Van-tot</dt>
              <dd>
                {toDutchTime(firstSessie(cursus?.Cursus)?.DatumBegintijd)} -{' '}
                {toDutchTime(firstSessie(cursus?.Cursus)?.DatumEindtijd)}
              </dd>

              <dt>Prijs</dt>
              <dd>
                {toDutchMoney(cursus?.Cursus.Prijs, { euroPrefix: true })}
              </dd>

              <dt>Lokatie</dt>
              <dd>{firstSessie(cursus?.Cursus)?.Lokatie?.Naam}</dd>

              {firstSessie(cursus?.Cursus)?.Lokatie?.Naam !== 'Webinar' && (
                <>
                  {' '}
                  <dt>Adres</dt>
                  <dd>
                    <span>
                      {
                        firstSessie(cursus?.Cursus)?.Lokatie?.Contactgegevens
                          .DisplayAddress
                      }
                    </span>
                  </dd>
                </>
              )}
            </dl>

            <h4>Promotietekst</h4>
            <p>{cursus?.Cursus.Promotietekst}</p>

            <CardHeader>Aanbiedergegevens</CardHeader>

            {organisatie?.Naam}

            {organisatie?.Contactgegevens.Email && (
              <EmailLink email={organisatie?.Contactgegevens.Email} />
            )}

            {organisatie?.Contactgegevens.Telefoon && (
              <PhoneLink phone={organisatie?.Contactgegevens.Telefoon} />
            )}

            {organisatie?.Contactgegevens.Website && (
              <WebsiteLink website={organisatie?.Contactgegevens.Website} />
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
      <IonLoading
        isOpen={loading}
        message={'Even geduld aub, gegevens worden opgehaald'}
        duration={0}
      />
    </IonPage>
  );
};

export default GevolgdeBijeenkomstDetailsPage;
