import Constants from 'expo-constants';

const settings = {
  dev: {
    apiUrl: 'https://smashlinks-server.herokuapp.com',
  },
  staging: {
    apiUrl: 'https://smashlinks-server.herokuapp.com',
  },
  prod: {
    apiUrl: 'https://smashlinks-server.herokuapp.com',
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === 'staging') return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
