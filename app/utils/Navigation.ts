type NavScreen = { route: string; title: string };

type NavScreens = {
  home: NavScreen;
  scan: NavScreen;
};

export const navRoutesToTitles: any = {
  home: 'Home',
  scan: ''
};

export const navScreens: NavScreens = {
  home: { route: 'home', title: 'Home' },
  scan: { route: 'scan', title: '' }
};
