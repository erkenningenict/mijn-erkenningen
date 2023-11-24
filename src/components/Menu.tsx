import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { getMenuItems } from '../menu/menu.service';
import { deleteAuthState, getAuthState } from '../helpers/authState';
import { Authenticated } from '../contexts/AuthContext';

const Menu: React.FC<unknown> = () => {
  const authState = getAuthState();
  const history = useHistory();
  const appPages = getMenuItems(authState);
  const { setAuthenticated } = Authenticated.useContainer();

  // const [logout] = useApp_LogoutMutation({});

  return (
    <IonMenu contentId="main" type="overlay">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonMenuToggle autoHide={false}>
            {appPages.map((appPage: any, index: number) => {
              return appPage.title !== 'Uitloggen' ? (
                <IonItem
                  key={index}
                  button
                  routerLink={appPage.url}
                  routerDirection="root"
                >
                  {/* <IonIcon slot="start" icon={appPage.icon} /> */}
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              ) : (
                <IonItem
                  key={index}
                  button
                  onClick={async () => {
                    try {
                      // await logout();
                      // setTimeout needed to correctly reset menu items
                      // setTimeout(() => {
                      setAuthenticated(false);
                      history.push('/inloggen', { direction: 'root' });
                      // }, 1);
                      deleteAuthState();
                    } catch (err) {
                      // setTimeout needed to correctly reset menu items
                      // setTimeout(() => {
                      setAuthenticated(false);
                      history.push('/inloggen', { direction: 'root' });
                      // }, 1);
                      deleteAuthState();
                      <IonToast
                        isOpen={true}
                        message="Kon niet uitloggen"
                        duration={2000}
                        position="top"
                        color="danger"
                      />;
                    }
                  }}
                >
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              );
            })}
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
