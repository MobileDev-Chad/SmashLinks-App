import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { theme } from '../core/theme';

export default function Header({ children, style, ...props }) {
  return (
    <Text style={[styles.header, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    color: theme.colors.white,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
});
