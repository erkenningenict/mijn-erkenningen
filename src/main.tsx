import React from 'react';
import { createRoot } from 'react-dom/client';
import { IonReactRouter } from '@ionic/react-router';
import AppWrapper from './AppWrapper';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <IonReactRouter>
      <AppWrapper />
    </IonReactRouter>
  </React.StrictMode>,
);
