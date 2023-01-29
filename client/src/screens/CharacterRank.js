import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Text } from 'react-native-paper';
import Screen from '../components/Screen';

function CharacterRank(props) {
  const [selected, setSelected] = useState('Choose a Character');
  return (
      <View style={styles.container}>
        <Picker
          mode="dropdown"
          style={{ height: 50, width: 150 }}
          selectedValue={selected}
          onValueChange={(itemValue) => setSelected(itemValue)}
        >
          {/* {CharacterList.map((item, index) => {
            return (
              <Picker.Item label={item.name} value={item.name} key={index} />
            );
          })} */}
        </Picker>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default CharacterRank;