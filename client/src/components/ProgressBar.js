import * as React from 'react';
import { ProgressBar as PaperProgressBar, MD3Colors } from 'react-native-paper';

const ProgressBar = ({ color,progress }) => (
  <PaperProgressBar progress={progress} color={color} />
);

export default ProgressBar;
