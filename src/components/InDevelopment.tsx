import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

const InDevelopment: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>In ontwikkeling</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>In ontwikkeling...</IonCardTitle>
            <IonCardSubtitle></IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <p>Deze functionaliteit is nog in ontwikkeling.</p>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default InDevelopment;
