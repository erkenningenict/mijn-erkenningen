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
  useApp_VakgroepDetailsQuery,
  useApp_InsertPersoonVakgroepForPersoonIdMutation,
  useApp_UpdatePersoonVakgroepForPersoonIdMutation,
  useApp_DeletePersoonVakgroepForPersoonIdMutation,
  useApp_GetPersoonVakgroepenQuery,
} from '../../__generated__/graphql';

export interface DeelMetKennisaanbiederDetailsPageProps {}

type Inputs = {
  debiteurnummer: string;
};

const DeelMetKennisaanbiederDetailsPage: React.FC<DeelMetKennisaanbiederDetailsPageProps> =
  () => {
    const { offline } = IsOffline.useContainer();
    const Toast = useToast();
    const { vakgroepId, persoonVakgroepId } = useParams<{
      vakgroepId: string;
      persoonVakgroepId: string;
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

    const { loading, error, data } = useApp_VakgroepDetailsQuery({
      variables: {
        input: +vakgroepId,
      },
      fetchPolicy: 'cache-and-network',
    });

    const {
      loading: personListLoading,
      error: personListError,
      data: personListData,
    } = useApp_GetPersoonVakgroepenQuery({
      skip: typeof persoonVakgroepId === 'undefined',
      fetchPolicy: 'cache-and-network',
    });

    const [
      insert,
      { loading: insertMutationLoading, error: insertMutationError },
    ] = useApp_InsertPersoonVakgroepForPersoonIdMutation();

    const [
      update,
      { loading: updateMutationLoading, error: updateMutationError },
    ] = useApp_UpdatePersoonVakgroepForPersoonIdMutation();

    const [
      deleteConnection,
      { loading: deleteMutationLoading, error: deleteMutationError },
    ] = useApp_DeletePersoonVakgroepForPersoonIdMutation();

    const d = data?.Vakgroepen && data?.Vakgroepen[0];

    useEffect(() => {
      const persoonVakgroep =
        personListData?.GetPersoonVakgroepenForPersoonId?.find(
          (phv) => phv.PersoonVakgroepID === +persoonVakgroepId,
        );
      if (persoonVakgroep) {
        reset({
          debiteurnummer: persoonVakgroep.DebiteurNr,
        });
      }
    }, [
      reset,
      persoonVakgroepId,
      personListData?.GetPersoonVakgroepenForPersoonId,
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
        include: ['App_GetPersoonVakgroepen'],
      });
    };

    const onSubmit: SubmitHandler<Inputs> = async (formData: Inputs) => {
      try {
        if (persoonVakgroepId === 'undefined' || persoonVakgroepId === null) {
          // create new
          await insert({
            variables: {
              input: {
                VakgroepID: d?.VakgroepID ?? 0,
                DebiteurNr: formData.debiteurnummer,
              },
            },
          });
        } else {
          // update
          await update({
            variables: {
              input: {
                PersoonVakgroepID: +persoonVakgroepId,
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
              PersoonVakgroepID: +persoonVakgroepId,
            },
          },
        });
        await refreshParentQuery();
        Toast.success(`Gegevens bijgewerkt`);
        history.goBack();
      } catch (err: any) {
        console.log('#DH# err?', err);

        if (!checkAuthenticationError(err)) {
          Toast.error(`Fout bij opheffen delen met kennisaanbieder.`);
        }
      }
    };

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/deel-met-kennisaanbieder"></IonBackButton>
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Kennisaanbieder</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <>
            {d && (
              <>
                <IonCard className="welcome-card">
                  <IonCardHeader>
                    <div style={{ fontSize: '16px', marginBottom: '15px' }}>
                      <strong
                        style={{ marginBottom: '10px', display: 'block' }}
                      >
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
                      Deel mijn gegevens met deze kennisaanbieder
                    </IonListHeader>
                  </IonList>
                  <div style={{ marginBottom: '15px' }}></div>
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
                  {persoonVakgroepId !== 'undefined' && (
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
                      U kunt uw kennisaanbieder zicht geven op enkele van de
                      gegevens van uw bewijs (nummer, start- en vervaldatum en
                      type). Wijzigingen kunnen zo door uw kennisaanbieder
                      bijgehouden worden. Te allen tijde kunt U de toestemming
                      verlenen of weer intrekken.
                    </p>
                  </IonLabel>
                </IonContent>

                {(loading || personListLoading) && (
                  <IonLoading
                    isOpen={true}
                    message={'Even geduld aub, gegevens worden opgehaald'}
                    duration={0}
                  />
                )}
                {(insertMutationLoading ||
                  updateMutationLoading ||
                  deleteMutationLoading) && (
                  <IonLoading
                    isOpen={true}
                    message={'Even geduld aub, gegevens worden opgeslagen'}
                    duration={0}
                  />
                )}
              </>
            )}
          </>
        </IonContent>
      </IonPage>
    );
  };

export default DeelMetKennisaanbiederDetailsPage;
