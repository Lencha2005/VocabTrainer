export type LoggedOutStackType = {
  LOGIN_PAGE: undefined;
  REGISTRATION_PAGE: undefined;
};

export type LoggedInStackType = {
  TAB_BAR_STACK: undefined;
};

export type TabBarStackType = {
  DICTIONARY_PAGE: undefined;
  RECOMMEND_PAGE: undefined;
  TRAINING_PAGE: undefined;
};

const LoggedOutStackScreens: LoggedOutStackType = {
  LOGIN_PAGE: undefined,
  REGISTRATION_PAGE: undefined,
};

const LoggedInStackScreens: LoggedInStackType = {
  TAB_BAR_STACK: undefined,
};

export type RootStackNavigation = {
  LOGGED_IN_STACK: {screens: keyof typeof LoggedInStackScreens};
  LOGGED_OUT_STACK: {screens: keyof typeof LoggedOutStackScreens};
};
