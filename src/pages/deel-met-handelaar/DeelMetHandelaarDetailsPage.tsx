import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonBackButton,
  IonLoading,
  IonButton,
  IonInput,
  IonLabel,
  IonList,
  IonListHeader,
} from '@ionic/react';
import React, { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { client } from '../../AppWrapper';
import { AddressLink } from '../../components/AddressLink';
import { EmailLink } from '../../components/EmailLink';
import ErrorComponent from '../../components/ErrorComponent';
import { PhoneLink } from '../../components/PhoneLink';
import { useToast } from '../../components/Toast';
import { WebsiteLink } from '../../components/WebsiteLink';
import { IsOffline } from '../../contexts/OfflineContext';
import { checkAuthenticationError } from '../../helpers/error-helper';
import {
  useApp_GetHandelshuisVestigingDetailsQuery,
  useApp_InsertPersoonHandelshuisvestigingForPersoonIdMutation,
  useApp_UpdatePersoonHandelshuisvestigingForPersoonIdMutation,
  useApp_DeletePersoonHandelshuisvestigingForPersoonIdMutation,
  useApp_GetPersoonHandelshuisVestigingenQuery,
} from '../../__generated__/graphql';

export interface DeelMetHandelaarDetailsPageProps {}

type Inputs = {
  debiteurnummer: string;
};

const DeelMetHandelaarDetailsPage: React.FC<
  DeelMetHandelaarDetailsPageProps
> = () => {
  const { offline } = IsOffline.useContainer();
  const Toast = useToast();
  const { handelshuisVestigingId, persoonHandelshuisVestigingId } = useParams<{
    handelshuisVestigingId: string;
    persoonHandelshuisVestigingId: string;
  }>();

  const history = useHistory();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      debiteurnummer: '',
    },
  });

  const { loading, error, data } = useApp_GetHandelshuisVestigingDetailsQuery({
    variables: {
      input: +handelshuisVestigingId,
    },
    fetchPolicy: 'cache-and-network',
  });

  const {
    loading: personListLoading,
    error: personListError,
    data: personListData,
  } = useApp_GetPersoonHandelshuisVestigingenQuery({
    skip: typeof persoonHandelshuisVestigingId === 'undefined',
    fetchPolicy: 'cache-and-network',
  });

  const [
    insert,
    { loading: insertMutationLoading, error: insertMutationError },
  ] = useApp_InsertPersoonHandelshuisvestigingForPersoonIdMutation();

  const [
    update,
    { loading: updateMutationLoading, error: updateMutationError },
  ] = useApp_UpdatePersoonHandelshuisvestigingForPersoonIdMutation();

  const [
    deleteConnection,
    { loading: deleteMutationLoading, error: deleteMutationError },
  ] = useApp_DeletePersoonHandelshuisvestigingForPersoonIdMutation();

  const d =
    data?.GetHandelshuisVestigingen && data?.GetHandelshuisVestigingen[0];

  useEffect(() => {
    const persoonHandelshuisVestiging =
      personListData?.GetPersoonHandelshuisvestigingenForPersoonId?.find(
        (phv) =>
          phv.PersoonHandelshuisVestigingID === +persoonHandelshuisVestigingId,
      );
    if (persoonHandelshuisVestiging) {
      reset({
        debiteurnummer: persoonHandelshuisVestiging.DebiteurNr,
      });
    }
  }, [
    reset,
    persoonHandelshuisVestigingId,
    personListData?.GetPersoonHandelshuisvestigingenForPersoonId,
  ]);

  if (error) {
    console.log('#DH# error', error);
    return <ErrorComponent error={error} />;
  }
  if (personListError) {
    console.log('#DH# error', personListError);
    return <ErrorComponent error={personListError} />;
  }
  if (insertMutationError) {
    console.log('#DH# error', insertMutationError);
    return <ErrorComponent error={insertMutationError} />;
  }
  if (updateMutationError) {
    console.log('#DH# error', updateMutationError);
    return <ErrorComponent error={updateMutationError} />;
  }
  if (deleteMutationError) {
    console.log('#DH# error', deleteMutationError);
    return <ErrorComponent error={deleteMutationError} />;
  }

  const refreshParentQuery = async () => {
    await client.refetchQueries({
      include: ['App_GetPersoonHandelshuisVestigingen'],
    });
  };

  const onSubmit: SubmitHandler<Inputs> = async (formData: Inputs) => {
    try {
      if (
        persoonHandelshuisVestigingId === 'undefined' ||
        persoonHandelshuisVestigingId === null
      ) {
        // create new
        await insert({
          variables: {
            input: {
              HandelshuisVestigingID: d?.HandelshuisVestigingID ?? 0,
              DebiteurNr: formData.debiteurnummer,
            },
          },
        });
      } else {
        // update
        await update({
          variables: {
            input: {
              PersoonHandelshuisVestigingID: +persoonHandelshuisVestigingId,
              DebiteurNr: formData.debiteurnummer,
            },
          },
        });
      }
      Toast.success(`Gegevens bijgewerkt`);
      await refreshParentQuery();
      history.goBack();
    } catch (err: any) {
      console.log('#DH# err?', err);

      if (!checkAuthenticationError(err)) {
        Toast.error(`Fout bij opslaan actie.`);
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deleteConnection({
        variables: {
          input: {
            PersoonHandelshuisVestigingID: +persoonHandelshuisVestigingId,
          },
        },
      });
      await refreshParentQuery();
      Toast.success(`Gegevens bijgewerkt`);
      history.goBack();
    } catch (err: any) {
      console.log('#DH# err?', err);

      if (!checkAuthenticationError(err)) {
        Toast.error(`Fout bij opheffen delen met handelaar.`);
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/deel-met-handelaar"></IonBackButton>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Handelaar</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <>
          {d && (
            <>
              <IonCard className="welcome-card">
                <IonCardHeader>
                  <div style={{ fontSize: '16px', marginBottom: '15px' }}>
                    <strong style={{ marginBottom: '10px', display: 'block' }}>
                      {d.Naam}
                    </strong>

                    {d.Contactgegevens?.DisplayAddress && (
                      <div className="mb-1">
                        <AddressLink
                          address={
                            d.Contactgegevens?.DisplayAddress === 'Onbekend'
                              ? d.Contactgegevens.Woonplaats
                              : d.Contactgegevens.DisplayAddress
                          }
                        />
                      </div>
                    )}
                    {d.Contactgegevens?.Email && (
                      <div className="mb-1">
                        <EmailLink email={d.Contactgegevens?.Email} />
                      </div>
                    )}
                    {d.Contactgegevens?.Telefoon && (
                      <div className="mb-1">
                        <PhoneLink phone={d.Contactgegevens?.Telefoon} />
                      </div>
                    )}
                    {d.Contactgegevens?.Website && (
                      <div className="mb-1">
                        <WebsiteLink website={d.Contactgegevens?.Website} />
                      </div>
                    )}
                  </div>
                </IonCardHeader>
              </IonCard>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <IonList>
                  <IonListHeader>
                    Deel mijn gegevens met deze handelaar
                  </IonListHeader>
                </IonList>
                <div style={{ marginBottom: '25px' }}></div>
                <IonLabel class="ion-padding">Uw debiteur nummer</IonLabel>
                <Controller
                  render={({ field: { onChange, value, name } }) => (
                    <IonInput
                      type="text"
                      name={name}
                      value={value}
                      onIonChange={onChange}
                      autocomplete="off"
                      placeholder="Vul optioneel uw debiteurnummer in"
                      maxlength={50}
                      class="ion-padding"
                    ></IonInput>
                  )}
                  control={control}
                  name="debiteurnummer"
                />
                <IonButton
                  expand="block"
                  type="submit"
                  style={{ margin: 14 }}
                  disabled={isSubmitting || offline}
                >
                  Opslaan
                </IonButton>
                {persoonHandelshuisVestigingId !== 'undefined' && (
                  <IonButton
                    expand="block"
                    color="danger"
                    style={{ margin: 14 }}
                    onClick={handleDelete}
                    disabled={offline}
                  >
                    Gegevens niet meer delen
                  </IonButton>
                )}
              </form>
              <IonContent className="ion-padding">
                <IonLabel>
                  <p>
                    Een handelaar (distributeur) mag een professioneel
                    gewasbeschermingsmiddel enkel op de markt brengen voor een
                    afnemer die beschikt over een geldig bewijs van
                    vakbekwaamheid (Wet gewasbeschermingsmiddelen en biociden;
                    artikel 73).
                  </p>
                  <p>
                    Om te kunnen verifiëren of u daadwerkelijk over een geldig
                    bewijs van vakbekwaamheid beschikt kunt u uw distributeur
                    toegang geven tot enkele van uw licentiegegevens (nummer,
                    start- en vervaldatum en type, n.a.w. gegevens). De gegevens
                    mogen uitsluitend gebruikt worden voor het verifiëren van de
                    geldigheid van uw vakbekwaamheidsbewijs.
                  </p>
                  <p>
                    Te allen tijde kunt U de toestemming verlenen of weer
                    intrekken.
                  </p>
                </IonLabel>
              </IonContent>

              <IonLoading
                isOpen={loading || personListLoading}
                message={'Even geduld aub, gegevens worden opgehaald'}
                duration={0}
              />
              <IonLoading
                isOpen={
                  insertMutationLoading ||
                  updateMutationLoading ||
                  deleteMutationLoading
                }
                message={'Even geduld aub, gegevens worden opgeslagen'}
                duration={0}
              />
            </>
          )}
        </>
      </IonContent>
    </IonPage>
  );
};

export default DeelMetHandelaarDetailsPage;
