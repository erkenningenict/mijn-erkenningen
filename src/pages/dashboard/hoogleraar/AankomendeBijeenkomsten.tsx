import {
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  RefresherEventDetail,
  IonRefresher,
  IonRefresherContent,
  IonLoading,
} from '@ionic/react';
import { add, endOfDay } from 'date-fns';
import React from 'react';
import ErrorComponent from '../../../components/ErrorComponent';
import { toDutchDate, toDutchTime } from '../../../helpers/date-helpers';
import { useApp_GetCursusSessiesForHoogleraarQuery } from '../../../__generated__/graphql';

const AankomendeBijeenkomsten: React.FC = () => {
  const {
    loading: loadingCursusSessies,
    error: errorCursusSessies,
    data: dataCursusSessies,
    refetch: refetchCursusSessies,
  } = useApp_GetCursusSessiesForHoogleraarQuery({
    variables: {
      input: {
        from: endOfDay(new Date(new Date())).toISOString(),
        to: endOfDay(add(new Date(), { months: 1 })).toISOString(),
      },
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  if (errorCursusSessies) {
    return <ErrorComponent error={errorCursusSessies} />;
  }

  const doRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    try {
      await refetchCursusSessies();
    } catch (error) {
      return <ErrorComponent error={error} />;
    }
    event.detail.complete();
  };

  const cursusSessies = dataCursusSessies?.GetCursusSessiesForHoogleraar;

  return (
    <>
      <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
      <IonListHeader>
        <IonLabel>Aankomende bijeenkomsten</IonLabel>
      </IonListHeader>
      {cursusSessies && cursusSessies?.length > 0 && (
        <IonList>
          {cursusSessies.map((c) => {
            return (
              <IonItem
                key={c.SessieID}
                routerLink={`/registreer-deelnemers/cursus/${c.Cursus?.CursusID}`}
              >
                <IonLabel className="ion-text-wrap">
                  <h2>{c.Cursus?.Titel?.replace('&amp;', '&')}</h2>
                  <p style={{ margin: '10px 0' }}>
                    {toDutchDate(c.DatumBegintijd, { includeTime: true })} -{' '}
                    {toDutchTime(c.DatumEindtijd)}
                  </p>
                  <p>
                    {c.Cursus?.CursusCode}
                    {c.Cursus?.IsBesloten && (
                      <span> - Besloten bijeenkomst</span>
                    )}
                  </p>
                  <p style={{ margin: '10px 0' }}>
                    {c.Lokatie?.Naam}{' '}
                    {c.Lokatie?.Naam !== 'Webinar' &&
                      c.Lokatie?.Naam !== 'Online cursus' &&
                      ' | '}
                    {c.Lokatie?.Contactgegevens.Woonplaats}
                  </p>
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      )}
      {cursusSessies?.length === 0 && (
        <IonItem>
          <IonLabel className="ion-text-wrap">
            <h3>Er zijn nog geen aankomende bijeenkomsten</h3>
            <p>
              Aankomende bijeenkomsten worden getoond vanaf vandaag tot een
              maand in de toekomst.
            </p>
          </IonLabel>
        </IonItem>
      )}
      <IonLoading
        isOpen={loadingCursusSessies}
        message={'Even geduld aub, gegevens worden opgehaald'}
        duration={0}
      />
    </>
  );
};
export default AankomendeBijeenkomsten;
