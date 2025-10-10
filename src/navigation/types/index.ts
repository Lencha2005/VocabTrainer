export type LoggedOutStackType = {
  LOGIN_PAGE: undefined;
  REGISTRATION_PAGE: undefined;
};

export type LoggedInStackType = {
  TAB_BAR_STACK: {
    screen?: keyof TabBarStackType;
  };
  ADD_WORD_PAGE?: {
    page?: number;
    limit?: number;
  };
};

export type TabBarStackType = {
  DICTIONARY_PAGE: undefined;
  RECOMMEND_PAGE: undefined;
  TRAINING_PAGE: undefined;
};

export type RootStackNavigation = {
  LOGGED_IN_STACK: {screens: keyof LoggedInStackType};
  LOGGED_OUT_STACK: {screens: keyof LoggedOutStackType};
};
