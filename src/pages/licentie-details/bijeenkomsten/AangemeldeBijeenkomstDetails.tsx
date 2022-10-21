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
  IonButton,
} from '@ionic/react';
import React from 'react';
import { Redirect, useHistory, useParams } from 'react-router';
import { client } from '../../../AppWrapper';
import { CardHeader } from '../../../components/CardHeader';
import { EmailLink } from '../../../components/EmailLink';
import ErrorComponent from '../../../components/ErrorComponent';
import { PhoneLink } from '../../../components/PhoneLink';
import { useToast } from '../../../components/Toast';
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
  useApp_UnRegisterForCourseByCourseIdMutation,
} from '../../../__generated__/graphql';
import './AangemeldeBijeenkomstDetails.css';

export interface AangemeldeBijeenkomstDetailsProps {}

const AangemeldeBijeenkomstDetailsPage: React.FC<AangemeldeBijeenkomstDetailsProps> =
  () => {
    const Toast = useToast();
    const history = useHistory();
    const { certificeringId, cursusId } =
      useParams<{ certificeringId: string; cursusId: string }>();
    const { loading, error, data, refetch } =
      useApp_GetMyStudieresultatenEnAangemeldeCursusdeelnamesQuery({
        variables: {
          certificeringId: +certificeringId,
        },
        fetchPolicy: 'cache-and-network',
        skip: certificeringId === null,
      });

    const [unRegisterCourse, { loading: mutationLoading }] =
      useApp_UnRegisterForCourseByCourseIdMutation();

    if (error) {
      console.log('#DH# error', error);
      return <ErrorComponent error={error} />;
    }

    const firstSessie = (cursus: CursusFieldsFragment) => {
      if (cursus && cursus.Sessies && cursus.Sessies[0]) {
        return cursus.Sessies[0];
      }
    };

    const cursus = data?.my?.AangemeldeCursusDeelnamesPerCertificeringId?.find(
      (c) => c.Cursus.CursusID === +cursusId,
    );
    if (!cursus) {
      console.log('#DH# error, cursus niet gevonden', cursusId);
      return (
        <Redirect to={`/mijn-licenties/${certificeringId}/bijeenkomsten`} />
      );
      // return <ErrorComponent error={error} />;
    }

    const organisatie =
      cursus.Cursus.Vak?.Vakgroep !== null
        ? cursus.Cursus.Vak?.Vakgroep
        : cursus.Cursus.Vak?.ExamenInstelling;

    const handleUnRegister = async () => {
      try {
        const res = await unRegisterCourse({
          variables: {
            input: {
              cursusId: cursus.Cursus.CursusID,
              dateTime: toDutchTime(
                firstSessie(cursus?.Cursus)?.DatumBegintijd,
              ),
            },
          },
        });
        if (res.data?.unRegisterForCourseByCourseId?.success) {
          Toast.success('U bent afgemeld');
          refetch();
          await client.refetchQueries({
            include: [
              'App_GetStudyProgressByLicenseId',
              'App_GetMyStudieresultatenEnAangemeldeCursusdeelnames',
            ],
          });
          history.goBack();
        } else {
          Toast.error(
            `U kon niet afgemeld worden. Reden: ${res.data?.unRegisterForCourseByCourseId?.message}`,
          );
        }
      } catch (err) {
        console.log('#DH# Error unregister', err);
        Toast.error(`U kon niet afgemeld worden. Reden: ${err}`);
      }
    };

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Aangemeld voor</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonCard className="welcome-card">
            <IonCardHeader>
              <IonCardTitle>Aangemeld voor</IonCardTitle>
              <IonCardSubtitle>
                <h6>{cursus?.Cursus.Titel}</h6>
                <p>{cursus?.Cursus.CursusCode}</p>
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <dl className="styled-dl">
                <dt>Datum</dt>
                <dd>
                  {toDutchDate(firstSessie(cursus?.Cursus)?.DatumBegintijd)}{' '}
                  <span style={{ fontSize: 'smaller' }}>
                    (
                    {relativeTimeFormatter(
                      firstSessie(cursus?.Cursus)?.DatumBegintijd,
                    )}
                    )
                  </span>
                </dd>
                <dt>Van-tot</dt>
                <dd>
                  {toDutchTime(firstSessie(cursus?.Cursus)?.DatumBegintijd)} -{' '}
                  {toDutchTime(firstSessie(cursus?.Cursus)?.DatumEindtijd)}
                </dd>

                <dt>Prijs</dt>
                <dd>
                  {toDutchMoney(cursus.Cursus.Prijs, { euroPrefix: true })}
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
              <p>{cursus.Cursus.Promotietekst}</p>

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
              {new Date(firstSessie(cursus?.Cursus)?.DatumBegintijd) >
                new Date() && (
                <IonButton
                  type="button"
                  color="danger"
                  expand="block"
                  className="mt-2"
                  onClick={handleUnRegister}
                >
                  Afmelden
                </IonButton>
              )}
            </IonCardContent>
          </IonCard>
        </IonContent>
        {loading && (
          <IonLoading
            isOpen={true}
            message={'Even geduld aub, gegevens worden opgehaald'}
            duration={0}
          />
        )}
        {mutationLoading && (
          <IonLoading
            isOpen={true}
            message={'Even geduld aub, gegevens worden verwerkt'}
            duration={0}
          />
        )}
      </IonPage>
    );
  };

export default AangemeldeBijeenkomstDetailsPage;
