import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card } from 'react-native-paper';
import { theme } from '../core/theme';

const CardCover = ({ source, backgroundColor, width, height, color }) => (
  <View style={styles.container}>
    <Card style={styles.cardContainer}>
      <Card.Cover
        style={{ width, height }}
        source={{ uri: source }}
        backgroundColor={backgroundColor}
        color={color}
      />
    </Card>
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  cardContainer: {
    backgroundColor: theme.colors.primary,
    margin: 3,
    padding: 3,
  },
});

export default CardCover;
