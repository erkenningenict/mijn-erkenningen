import { home, list, informationCircle } from 'ionicons/icons';
import { ApplicationRolesEnum } from '../enums/enums';
import { IAuthState } from '../helpers/authState';

export interface AppPage {
  url: string;
  icon: string;
  title: string;
  order: number;
}

export function getMenuItems(auth: IAuthState | null): AppPage[] {
  let appPages: AppPage[] = [
    {
      title: 'Home',
      url: '/home',
      icon: home,
      order: 100,
    },
    {
      title: 'Nieuws',
      url: '/nieuws',
      icon: list,
      order: 99,
    },
    {
      title: 'Over deze app',
      url: '/over',
      icon: informationCircle,
      order: 899,
    },
  ];

  if (auth?.isAuthenticated) {
    if (auth?.roles?.includes(ApplicationRolesEnum.RegisteredUsers)) {
      const authenticatedMenuItems: AppPage[] = [
        {
          title: 'Mijn profiel',
          url: '/mijn-profiel',
          icon: list,
          order: 800,
        },
        {
          title: 'Uitloggen',
          url: '/uitloggen',
          icon: list,
          order: 999,
        },
      ];
      appPages = appPages.concat(authenticatedMenuItems);
    }

    if (
      auth?.roles?.includes(ApplicationRolesEnum.Hoogleraar) ||
      auth?.roles?.includes(ApplicationRolesEnum.Aanwezigheidsregistratie)
    ) {
      const hoogleraarPages: AppPage[] = [
        {
          title: 'Dashboard',
          url: '/dashboard',
          icon: list,
          order: 100,
        },
        {
          title: 'Registreer deelnemers',
          url: '/registreer-deelnemers',
          icon: list,
          order: 510,
        },
      ];
      appPages = appPages.concat(hoogleraarPages);
    }

    if (auth?.roles?.includes(ApplicationRolesEnum.Student)) {
      const studentMenuItems: AppPage[] = [
        {
          title: 'Dashboard',
          url: '/dashboard',
          icon: list,
          order: 100,
        },
        {
          title: 'Mijn licenties',
          url: '/mijn-licenties',
          icon: list,
          order: 200,
        },
        {
          title: 'Zoek bijeenkomst',
          url: '/bijeenkomsten/op-locatie',
          icon: list,
          order: 300,
        },
        {
          title: 'Deel met kennisaanbieder',
          url: '/deel-met-kennisaanbieder',
          icon: list,
          order: 400,
        },
        {
          title: 'Deel met handelaar',
          url: '/deel-met-handelaar',
          icon: list,
          order: 410,
        },
      ];
      appPages = appPages
        .filter((ap) => ap.url !== '/home')
        .concat(studentMenuItems);
    }
  } else {
    const notAuthenticatedMenuItems: AppPage[] = [
      {
        title: 'Inloggen',
        url: '/inloggen',
        icon: list,
        order: 200,
      },
    ];

    appPages = appPages.concat(notAuthenticatedMenuItems);
  }

  const menuItems = appPages.filter(
    (appPage, index, self) =>
      self.findIndex((t) => t.url === appPage.url) === index,
  );

  return menuItems.sort((a: AppPage, b: AppPage) =>
    a.order > b.order ? 1 : -1,
  );
}
