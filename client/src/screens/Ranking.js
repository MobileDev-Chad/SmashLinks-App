import { Platform } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { theme } from '../core/theme';
import Searchbar from '../components/Searchbar';
import { ActiveList, CharacterRank, FriendsRank, GlobalRank } from '../screens';
import Screen from '../components/Screen';

const Tab = createMaterialTopTabNavigator();

export default function Ranking() {
  return (
    <Screen>
      <Searchbar placeholder='Search for Player'/>
      <Tab.Navigator
        initialRouteName="Active"
        screenOptions={{
          tabBarActiveTintColor: '#0084ff',
          tabBarInactiveTintColor: theme.colors.inactiveGreyColor,
          tabBarLabelStyle: {
            fontSize: Platform.OS === 'ios' ? 9 : 10,
            fontWeight: 'bold',
          },
        }}
      >
        <Tab.Screen
          name="Active"
          component={ActiveList}
          options={{ tabBarLabel: 'Active' }}
        />
        <Tab.Screen
          name="Global"
          component={GlobalRank}
          options={{ tabBarLabel: 'Global' }}
        />
        <Tab.Screen
          name="Character"
          component={CharacterRank}
          options={{ tabBarLabel: 'Character' }}
        />
        <Tab.Screen
          name="Friends"
          component={FriendsRank}
          options={{ tabBarLabel: 'Friends' }}
        />
      </Tab.Navigator>
    </Screen>
  );
}
