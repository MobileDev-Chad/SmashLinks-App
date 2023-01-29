import { DefaultTheme } from 'react-native-paper';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#000000',
    primary: '#0084ff',
    secondary: '#414757',
    border: 'transparent',
    error: '#f13a59',
    defaultbackgroundColor: '#efefef', // light gray
    background: '#0c0c0c',
    black: '#000000',
    white: '#FFFFFF',
    gray: '#212125',
    gray1: '#1f1f1f',
    lightGray: '#3B3B3B',
    lightGray2: '#212125',
    lightGray3: '#757575',
    yellow: '#ffff00',
    red: '##ff0000',
    blue: '#0000ff',
    green: '#008000',
    lightgreen: '#90ee90',
    brown: '#a52a2a',
    pink: '#ffc0cb',
    orange: '#ffa500',
    purple: '#800080',
    transparentWhite: 'rgba(255, 255, 255, 0.2)',
    transparentBlack: 'rgba(0, 0, 0, 0.8)',
    transparentBlack1: 'rgba(0, 0, 0, 0.4)',
    
    // icon styles
    accentColor: '#0084ff',
    inactiveGreyColor: '#626262',
    lightGreyCOlor: '#7f8c8d',
    separator: '#bdc3c7',
    white: 'white',
    black: 'black',
    grey: 'grey',
    green: 'green',
    onlineGreen: '#2ecc71',
    lightWhite: '#f9f9f9',
  },
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  h1: { fontFamily: 'Roboto-Black', fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: 'Roboto-Bold', fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: 'Roboto-Bold', fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: 'Roboto-Bold', fontSize: SIZES.h4, lineHeight: 22 },
  body1: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
};
