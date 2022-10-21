import React from 'react';
import { IonRouterOutlet } from '@ionic/react';
import { Route, Redirect, Switch } from 'react-router';
import HomePage from '../pages/Home';
import { AboutPage } from '../pages/about/About';
import { LoginPage } from '../pages/login/Login';
import DashboardPage from '../pages/dashboard/Dashboard';
import { NotFoundPage } from '../pages/notFound/NotFound';
import LicenseDetails from '../pages/licentie-details/LicenseDetails';
import MijnLicentiesPage from '../pages/mijn-licenties/MijnLicenties';
import DeelMetHandelaarPage from '../pages/deel-met-handelaar/DeelMetHandelaarPage';
import DeelMetHandelaarDetailsPage from '../pages/deel-met-handelaar/DeelMetHandelaarDetailsPage';
import DeelMetKennisaanbiedersPage from '../pages/deel-met-kennisaanbieder/DeelMetKennisaanbiederPage';
import DeelMetKennisaanbiedersDetailsPage from '../pages/deel-met-kennisaanbieder/DeelMetKennisaanbiederDetailsPage';
import ProfilePage from '../pages/profile/ProfilePage';
import OpLocatieDetailsPage from '../pages/bijeenkomsten/op-locatie/OpLocatieDetailsPage';
import WebinarDetailsPage from '../pages/bijeenkomsten/webinar/WebinarDetailsPage';
import DigitaalDetailsPage from '../pages/bijeenkomsten/digitaal/DigitaalDetailsPage';
import CursussenListPage from '../pages/registreer-deelnemers/CursussenListPage';
import CursusDetailsPage from '../pages/registreer-deelnemers/cursus/CursusDetailsPage';
import DeelnemersListPage from '../pages/registreer-deelnemers/cursus/DeelnemersListPage';
import ProtectedRoute from '../routing/ProtectedRoute';
import BijeenkomstenWrapperPage from '../pages/bijeenkomsten/BijeenkomstenWrapperPage';
import CursusWrapperPage from '../pages/registreer-deelnemers/CursusWrapperPage';
import NewsPage from '../pages/news/NewsPage';
import NewsItemPage from '../pages/news/NewsItemPage';

export const Main: React.FC<unknown> = () => {
  return (
    <IonRouterOutlet id="main">
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>

        <ProtectedRoute path="/bijeenkomsten" comp={BijeenkomstenWrapperPage} />

        <ProtectedRoute
          path="/registreer-deelnemers/cursus/overzicht/:cursusId"
          comp={CursusWrapperPage}
        />
        <ProtectedRoute
          path="/registreer-deelnemers/cursus/deelnemers/:cursusId"
          comp={CursusWrapperPage}
        />
        <ProtectedRoute
          path="/registreer-deelnemers/cursus/deelnemer/:cursusId/:deelnemerId"
          comp={CursusWrapperPage}
        />
        <ProtectedRoute
          path="/registreer-deelnemers/cursus/:cursusId"
          comp={CursusWrapperPage}
        />

        <ProtectedRoute
          path="/op-locatie/:cursusId"
          exact
          comp={OpLocatieDetailsPage}
        />
        <ProtectedRoute
          path="/webinar/:cursusId"
          exact
          comp={WebinarDetailsPage}
        />
        <ProtectedRoute
          path="/digitale-bijeenkomsten/:vakId"
          exact
          component={DigitaalDetailsPage}
        />

        <ProtectedRoute
          path="/overzicht/:cursusId"
          exact
          comp={CursusDetailsPage}
        />
        <ProtectedRoute
          path="/deelnemers/:cursusId"
          exact
          comp={DeelnemersListPage}
        />

        <ProtectedRoute
          path="/deel-met-kennisaanbieder"
          exact
          comp={DeelMetKennisaanbiedersPage}
        />
        <ProtectedRoute
          path="/deel-met-kennisaanbieder/:vakgroepId/:persoonVakgroepId"
          exact
          comp={DeelMetKennisaanbiedersDetailsPage}
        />
        <ProtectedRoute
          path="/deel-met-handelaar"
          exact
          comp={DeelMetHandelaarPage}
        />
        <ProtectedRoute
          path="/deel-met-handelaar/:handelshuisVestigingId/:persoonHandelshuisVestigingId"
          exact
          comp={DeelMetHandelaarDetailsPage}
        />
        <ProtectedRoute path="/dashboard" exact comp={DashboardPage} />
        <ProtectedRoute path="/mijn-licenties" exact comp={MijnLicentiesPage} />
        <ProtectedRoute
          path="/mijn-licenties/:certificeringId"
          comp={LicenseDetails}
        />

        <ProtectedRoute
          path="/registreer-deelnemers"
          exact
          comp={CursussenListPage}
        />

        <ProtectedRoute path="/mijn-profiel" exact comp={ProfilePage} />

        <Route path="/home" component={HomePage} />
        <Route path="/nieuws" component={NewsPage} />
        <Route path="/nieuws-item/:id" component={NewsItemPage} />
        <Route path="/inloggen" component={LoginPage} />
        <Route path="/over" exact component={AboutPage} />
        <Route component={NotFoundPage} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </IonRouterOutlet>
  );
};

export default Main;
