import {
  Settings,
  Dashboard,
  GameLobby,
  Friends,
  Ranking,
  StageSelect,
  History, 
  Statistics,
  GamePlay
} from '../screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabIcon from '../components/TabIcon';
import { theme } from '../core/theme';

const Tab = createBottomTabNavigator();
const GameStack = createNativeStackNavigator();
const StatsStack = createNativeStackNavigator();

export default AppNavigator = (props) => {

  
  return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.inactiveGreyColor,
        }}
      >
        <Tab.Screen
          name="Home"
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({ focused, color }) => (
              <TabIcon name="home" color={color} focused={focused} />
            ),
            headerShown: false,
          }}
        >
           {() => (
            <StatsStack.Navigator screenOptions={{headerShown:false}}>
              <StatsStack.Screen  name="Dashboard" component={Dashboard} />
              <StatsStack.Screen  name="Statistics" component={Statistics} />
              <StatsStack.Screen name="History" component={History} />
            </StatsStack.Navigator>
          )}
        </Tab.Screen>

        <Tab.Screen
          name="Ranking"
          component={Ranking}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <TabIcon
                name="bar-graph"
                color={color}
                type="entypo"
                focused={focused}
              />
            ),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="Play"
          options={{
            unmountOnBlur: true,
            tabBarStyle: { display: "none" },
            tabBarIcon: ({ focused, color }) => (
              <TabIcon
                name="game-controller"
                color={color}
                type="rounded"
                focused={focused}
              />
            ),
            headerShown: false,
          }}
        >
          {() => (
            <GameStack.Navigator screenOptions={{headerShown:false}}>
              <GameStack.Screen name="GameLobby" component={GameLobby} />
              <GameStack.Screen  name="StageSelect" component={StageSelect} />
              <GameStack.Screen name="GamePlay" component={GamePlay} />
            </GameStack.Navigator>
          )}
        </Tab.Screen>

        <Tab.Screen
          name="Friends"
          component={Friends}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <TabIcon
                name="supervisor-account"
                color={color}
                focused={focused}
              />
            ),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <TabIcon name="settings" color={color} focused={focused} />
            ),
            headerShown: false,
          }}
        />

      </Tab.Navigator>
  );
};
