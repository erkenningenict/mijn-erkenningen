import * as React from 'react';
import { Redirect, Route, useHistory } from 'react-router';
import { useToast } from '../components/Toast';
import { Authenticated } from '../contexts/AuthContext';
import { deleteAuthState, getAuthState } from '../helpers/authState';

const Logout: React.FC = () => {
  const history = useHistory();
  const { setAuthenticated } = Authenticated.useContainer();
  const Toast = useToast();

  const showLoggedOutMessage = React.useCallback(() => {
    Toast.error('Inlog token verlopen, log opnieuw in');
  }, [Toast]);
  React.useEffect(() => {
    showLoggedOutMessage();
    deleteAuthState();
    setAuthenticated(false);
  }, [showLoggedOutMessage, setAuthenticated]);
  return <Redirect to={`/inloggen${history.location.search}`}></Redirect>;
};

export const ProtectedRoute: React.FC<any> = ({
  comp: Component,
  ...rest
}: {
  comp: any;
  rest: any;
}) => {
  const authStateJson = getAuthState();
  let authenticated = false;
  if (authStateJson) {
    authenticated = !!authStateJson;
  }

  if (!authenticated) {
    return <Logout />;
  }
  return (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...props}></Component>;
      }}
    />
  );
};
export default ProtectedRoute;
