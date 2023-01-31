import Constants from 'expo-constants';

const settings = {
  dev: {
    apiUrl: 'https://all-trees-grow-65-93-58-234.loca.lt',
  },
  staging: {
    apiUrl: 'https://all-trees-grow-65-93-58-234.loca.lt',
  },
  prod: {
    apiUrl: 'https://all-trees-grow-65-93-58-234.loca.lt',
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === 'staging') return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
