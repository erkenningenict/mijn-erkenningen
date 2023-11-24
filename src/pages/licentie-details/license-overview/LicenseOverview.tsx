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
  IonCardTitle,
  IonBackButton,
  IonLoading,
} from '@ionic/react';
import React from 'react';
import QRCode from 'react-qr-code';
import {
  Certificering,
  useApp_GetStudyProgressByLicenseIdQuery,
} from '../../../__generated__/graphql';
import {
  relativeTimeFormatter,
  toDutchDate,
} from '../../../helpers/date-helpers';
import { format } from 'date-fns';
import LicenseValidityBadge from '../../../components/LicenseValidityBadge';
import { isLicenseValidOnDate } from '../../../helpers/license-helper';
import ErrorComponent from '../../../components/ErrorComponent';
import { useParams } from 'react-router';

const LicenseOverview: React.FC = () => {
  const { certificeringId } = useParams<{ certificeringId: string }>();
  const { loading, error, data } = useApp_GetStudyProgressByLicenseIdQuery({
    variables: {
      certificeringId: +certificeringId,
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    skip: certificeringId === null || typeof certificeringId === 'undefined',
  });
  const license = data?.getStudyProgressByLicenseId?.Certificering;

  const qrCodeData = license
    ? `${license?.NummerWeergave}|${license?.CertificaatID}|${format(
        new Date(license?.BeginDatum),
        'yyMMdd',
      )}|${format(
        new Date(license?.EindDatum ? license.EindDatum : new Date()),
        'yyMMdd',
      )}`
    : null;

  if (error) {
    console.log('#DH# License overview error');
    return <ErrorComponent error={error} />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>
            Licentie {license?.Certificaat?.Code ?? 'laden...'}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              {license?.Certificaat?.Naam ?? 'laden...'}
              <div style={{ fontSize: '20px', marginTop: '10px' }}>
                {license?.NummerWeergave}
              </div>
            </IonCardTitle>
          </IonCardHeader>
          {license && (
            <IonCardContent>
              <dl className="styled-dl">
                <dt>Geldig van</dt>
                <dd>{toDutchDate(license?.BeginDatum)}</dd>

                <dt>Geldig tot</dt>
                <dd>
                  {toDutchDate(license?.EindDatum)}{' '}
                  <span style={{ fontSize: 'smaller' }}>
                    ({relativeTimeFormatter(license?.EindDatum)})
                  </span>
                </dd>

                <dt>Status</dt>
                <dd>
                  <LicenseValidityBadge
                    license={license as unknown as Certificering}
                  />
                </dd>
                {license?.UitstelVerleend && license?.UitstelTot && (
                  <>
                    <dt className="redText">Uitstel tot</dt>
                    <dd>
                      <span className="redText">
                        {toDutchDate(license?.UitstelTot)}{' '}
                        <span style={{ fontSize: 'smaller' }}>
                          ({relativeTimeFormatter(license?.UitstelTot)})
                        </span>
                      </span>
                    </dd>
                  </>
                )}
              </dl>
              <dl className="styled-dl">
                {license?.DatumIngetrokkenVan && (
                  <>
                    <dt className="redText">Ingetrokken van</dt>
                    <dd>
                      <span className="redText">
                        {toDutchDate(license?.DatumIngetrokkenVan)}{' '}
                        <span style={{ fontSize: 'smaller' }}>
                          ({relativeTimeFormatter(license?.DatumIngetrokkenVan)}
                          )
                        </span>
                      </span>
                    </dd>
                  </>
                )}
              </dl>
              <dl className="styled-dl">
                {license?.DatumIngetrokkenTot && (
                  <>
                    <dt className="redText">Ingetrokken tot</dt>
                    <dd>
                      <span className="redText">
                        {toDutchDate(license?.DatumIngetrokkenTot)}{' '}
                        <span style={{ fontSize: 'smaller' }}>
                          ({relativeTimeFormatter(license?.DatumIngetrokkenTot)}
                          )
                        </span>
                      </span>
                    </dd>
                  </>
                )}
              </dl>
              <div className="mt-1">
                Licentiehouder: <strong>{license?.Persoon?.FullName}</strong>
              </div>
              <h5>
                Geboortedatum:{' '}
                <strong>{toDutchDate(license?.Persoon?.Geboortedatum)}</strong>
              </h5>
              <br />
              {isLicenseValidOnDate(license as Certificering) && (
                <>
                  {qrCodeData && (
                    <div
                      style={{
                        textAlign: 'center',
                        background: '#fff',
                        padding: '20px',
                      }}
                    >
                      <QRCode value={qrCodeData} />
                    </div>
                  )}
                  <p style={{ marginTop: '15px' }}>
                    De QR code kunt u gebruiken bij een kennisbijeenkomst voor
                    snelle registratie.
                  </p>
                </>
              )}
            </IonCardContent>
          )}
          <IonLoading
            isOpen={loading}
            message={'Even geduld aub, gegevens worden opgehaald'}
            duration={0}
          />
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default LicenseOverview;
