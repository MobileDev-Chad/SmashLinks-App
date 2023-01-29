import * as React from 'react';
import { Avatar as PaperAvatar } from 'react-native-paper';

const Avatar = ({ source, size }) => (
  <PaperAvatar.Image size={size} source={{ uri: source }} />
);

export default Avatar;
