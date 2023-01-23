import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Screen from '../components/Screen';
import Logo from '../components/Logo';
import { useAuthValue } from '../auth/context';
import { Text } from 'react-native-paper';
import { FONTS, SIZES, theme } from '../core/theme';
import ItemSeperator from '../components/ItemSeperator';
// import CharacterList from '../data/CharacterList';
import CardCover from '../components/CardCover';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import Avatar from '../components/Avatar';

const Dashboard = (props) => {
  const navigation = props.navigation;
  const { currentUser } = useAuthValue();

//   const getData = async () => {
//     try {
//       const CharacterListUpdate = await AsyncStorage.getItem('update');
//       if (CharacterListUpdate !== null) {
//         // sorts array by highest to lowest by selected
//         CharacterList.sort((a, b) => {
//           return b.selected - a.selected;
//         });
//       }
//     } catch (e) {
//       // error reading value
//     }
//   };

//   getData();

//   let highestPlayed = CharacterList[0];

//   const totalSelected = CharacterList.reduce((accumulator, object) => {
//     return accumulator + object.selected;
//   }, 0);

  return (
    <Screen>
      <View style={styles.containerStyle}>
        <View style={styles.imageContainerStyle}>
          <Image
            style={styles.imageStyle}
            source={require('../assets/colorful-abstract-liquid.jpg')}
          />
        </View>
      </View>

      <View style={{ marginTop: -80 }}>
        <View style={styles.row}>
          <Logo />
        </View>
        <Text style={{ ...FONTS.h4, alignSelf: 'center' }}>
          {currentUser.username}
        </Text>
        <Text
          style={{
            color: theme.colors.lightGray3,
            ...FONTS.body4,
            alignSelf: 'center',
          }}
        >
          Global Rank: #?
        </Text>
      </View>

      {/* Character Stats */}
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 10,
        }}
      >
        {CharacterList.map((item, index) => {
          return (
            <Screen style={styles.screen}>
              <View
                key={item.id}
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <View style={{ flex: 1 }}>
                  <ProgressBar
                    color={theme.colors.primary}
                    progress={item.selected / totalSelected}
                  />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Avatar source={item.images.portrait} size={50} />
                </View>
              </View>
            </Screen>
          );
        })}
      </ScrollView>

      <View style={styles.row}>
        <View style={styles.section}>
          <Text style={{ ...FONTS.h4 }}>?</Text>
          <Text style={{ color: theme.colors.lightGray3, ...FONTS.body4 }}>
            Wins
          </Text>
        </View>

        <ItemSeperator
          height={25}
          width={1}
          backgroundColor={theme.colors.gray}
        />

        <View style={styles.section}>
          <Text style={{ ...FONTS.h4 }}>?</Text>
          <Text style={{ color: theme.colors.lightGray3, ...FONTS.body4 }}>
            Loses
          </Text>
        </View>

        <ItemSeperator
          height={25}
          width={1}
          backgroundColor={theme.colors.gray}
        />

        <View style={styles.section}>
          <Text style={{ ...FONTS.h4 }}>?</Text>
          <Text style={{ color: theme.colors.lightGray3, ...FONTS.body4 }}>
            Matches
          </Text>
        </View>
      </View>

      <View style={styles.btnContainer}>
        <Button
          mode="contained"
          style={{ width: '45%' }}
          labelStyle={styles.btnText}
          onPress={() => navigation.navigate('Statistics')}
        >
          Stats
        </Button>
        <Button
          mode="outlined"
          style={{ width: '45%' }}
          labelStyle={styles.btnText}
          onPress={() => navigation.navigate('History')}
        >
          History
        </Button>
      </View> */}
    </Screen>
  );
};
const styles = StyleSheet.create({
  containerStyle: {
    alignSelf: 'center',
    width: Dimensions.get('window').width,
    overflow: 'hidden',
    height: 160,
  },
  imageContainerStyle: {
    borderRadius: Dimensions.get('window').width,
    width: Dimensions.get('window').width * 2,
    height: Dimensions.get('window').width * 2,
    marginLeft: -(Dimensions.get('window').width / 2),
    position: 'absolute',
    bottom: 0,
    overflow: 'hidden',
  },
  imageStyle: {
    height: Dimensions.get('window').width / 1.7,
    width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: 0,
    marginLeft: Dimensions.get('window').width / 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    paddingVertical: SIZES.padding2,
  },
  section: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: SIZES.padding2,
    paddingHorizontal: SIZES.padding2,
  },
  btnText: {
    fontSize: 10,
  },
  screen: {
    paddingHorizontal: SIZES.padding2,
  },
});

export default Dashboard;
