import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import EntryScreen from './screens/EntryScreen.js'
import TotalScreen from './screens/TotalScreen.js'
import StatsScreen from './screens/StatsScreen.js'

//Screen names
const homeName = "Entry";
const detailsName = "Total Report";
const settingsName = "Stats";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'ios-create' : 'ios-create-outline';
              size = focused ? (size+8) : size;

            } else if (rn === detailsName) {
              iconName = focused ? 'list' : 'list';
              size = focused ? (size+8) : size;

            } else if (rn === settingsName) {
              iconName = focused ? 'ios-stats-chart' : 'ios-stats-chart-outline';
              size = focused ? (size+8) : size;
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },

            tabBarActiveTintColor: '#00469A',
            tabBarInactiveTintColor: 'grey',
            labelStyle: { paddingBottom: 10, fontSize: 10 },
            style: { padding: 50, height: 106, backgroundColor: '#fff', },
            tabBarStyle: {
              backgroundColor: '#fff',
              height: 60,
              position: 'absolute',
              bottom: 16,
              right: 16,
              left: 16,
              borderRadius: 16
            },
            tabBarLabelStyle: {
              paddingBottom: 8
            },
            headerStyle: {
              backgroundColor: "#00469A",
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16
            },
            headerTitleAlign: 'center',
            headerTintColor: "#fff"
        })}
        >

        <Tab.Screen name={homeName} component={EntryScreen} />
        <Tab.Screen name={detailsName} component={TotalScreen} />
        <Tab.Screen name={settingsName} component={StatsScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;