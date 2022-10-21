import React from 'react';
import App from './App';
import jwtDecode from 'jwt-decode';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
  Operation,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

import './styles.css';
import {
  deleteAuthState,
  getAuthState,
  setAuthState,
} from './helpers/authState';

import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { ToastProvider } from './components/Toast';
import { IsOffline } from './contexts/OfflineContext';

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);

const cache = new InMemoryCache({
  typePolicies: {
    Certificering: {
      keyFields: ['CertificeringID'],
    },
    Certificaat: {
      keyFields: ['CertificaatID'],
    },
    Persoon: {
      keyFields: ['PersoonID'],
    },
    Cursus: {
      keyFields: ['CursusID'],
    },
    Sessie: {
      keyFields: ['SessieID'],
    },
    Vak: {
      keyFields: ['VakID'],
    },
    Vakgroep: {
      keyFields: ['VakgroepID'],
    },
    ExamenInstelling: {
      keyFields: ['ExamenInstellingID'],
    },
    Contactgegevens: {
      keyFields: ['ContactgegevensID'],
    },
    CursusDeelname: {
      keyFields: ['CursusDeelnameID'],
    },
    Studieresultaat: {
      keyFields: ['StudieresultaatID'],
    },
    StudyProgress: {
      keyFields: ['Certificering', ['CertificeringID']],
    },
    Lokatie: {
      keyFields: ['LokatieID'],
    },
    CursusSessie: {
      keyFields: ['CourseCode'],
    },
    My: {
      keyFields: ['personId'],
      merge: true,
    },
    Thema: {
      keyFields: ['ThemaID'],
    },
    Competentie: {
      keyFields: ['CompetentieID'],
    },
    Kennisgebieden: {
      keyFields: ['KennisgebiedID'],
    },
    Land: {
      keyFields: ['Value'],
    },
    PersoonHandelshuisVestiging: {
      keyFields: ['PersoonHandelshuisVestigingID'],
    },
    Handelshuis: {
      keyFields: ['HandelshuisID'],
    },
    HandelshuisVestiging: {
      keyFields: ['HandelshuisVestigingID'],
    },
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      if (message === 'Not authenticated as user') {
        // redirect to login
        // history.replace(`/inloggen?redirect=${window.location.pathname}`);
        window.location.replace(
          `/inloggen?redirect=${window.location.pathname}`,
        );
        return;
      } else {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        );
        return;
      }
    });

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
    return;
  }
});

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_ERKENNINGEN_GRAPHQL_API_URL,
  credentials: 'include',
});

const refreshTokenLink = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => {
    const accessToken = getAuthState()?.accessToken;

    if (!accessToken) return true;

    try {
      const { exp } = jwtDecode(accessToken) as { exp: number };
      const expires = new Date(exp * 1000);
      if (new Date().getTime() >= expires.getTime()) return false;
      return true;
    } catch {
      return false;
    }
  },
  fetchAccessToken: async () => {
    const refreshToken = getAuthState()?.refreshToken;
    const res = await fetch(
      process.env.REACT_APP_ERKENNINGEN_GRAPHQL_API_URL as string,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          query: `mutation App_regenerateAccessToken { regenerateAccessToken(refreshToken: "${refreshToken}") { accessToken refreshToken } }`,
        }),
      },
    );
    return res.json();
  },
  handleResponse:
    (operation: Operation, accessTokenField: string) => (response: any) => {
      if (!response) {
        return { accessToken: null };
      }
      const state = getAuthState();
      setAuthState(
        state?.user as any,
        state?.roles as any,
        response.data?.regenerateAccessToken.accessToken,
        response.data?.regenerateAccessToken.refreshToken,
      );
      return {
        accessToken: response.data?.regenerateAccessToken.accessToken,
        refreshToken: response.data?.regenerateAccessToken.refreshToken,
      };
    },
  handleFetch: (accessToken: string) => {
    const state = getAuthState();

    if (!accessToken) {
      deleteAuthState();
      return;
    }

    return setAuthState(
      state?.user as any,
      state?.roles as any,
      accessToken,
      state?.refreshToken as string,
    );
  },
  handleError: (err: Error, operation: Operation) => {
    console.log('#DH# error jwt refresh token err', err);
    console.log('#DH# error jwt refresh token operation', operation);
    if (err.message !== 'Failed to fetch') {
      deleteAuthState();
      window.location.replace(`/inloggen?redirect=${window.location.pathname}`);
    }
  },
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const res = getAuthState();

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      accessToken: res?.accessToken ? `Bearer ${res.accessToken}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: from([refreshTokenLink, errorLink, authLink, httpLink]),
  cache,
  name: 'bureau-erkenningen-app',
  version: '1.3',
});

export const AppWrapper: React.FC = () => {
  // const history = useHistory();
  // console.log('#DH# history', history.location);

  return (
    <ApolloProvider client={client}>
      <ToastProvider value={{ duration: 2000 }}>
        <IsOffline.Provider>
          <App />
        </IsOffline.Provider>
      </ToastProvider>
    </ApolloProvider>
  );
};

export default AppWrapper;
