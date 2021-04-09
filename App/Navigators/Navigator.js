import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {Bio} from '../Components/Bio';
import {IconButtonF} from '../Components/IconButton';
import {DecagonView} from '../Components/DecagonView';
import {DecagonButton} from '../Components/DecagonButton';
import {Screen2} from '../Containers/Screen2';
import {Screen1} from '../Containers/Screen1';
import {Screen3} from '../Containers/Screen3';
import {Screen4} from '../Containers/Screen4';
import AsyncStorage from '@react-native-community/async-storage';
import {useState} from 'react';

const Stack = createStackNavigator();

export const Nav = () => {
  const [stat, statState] = useState('');
  const getRoot = async () => {
    const sta = await AsyncStorage.getItem('statusPic');
    if (!sta) {
      statState('HomeScreen');
      return;
    }
    const read = await AsyncStorage.getItem('read');
    if (read === 'true') {
      statState('StatReadScreen');
      return;
    } else {
      statState('StatUnreadScreen');
    }
  };
  return (
    <Stack.Navigator
      initialRouteName={stat}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={Screen1} />
      <Stack.Screen name="StatScreen" component={Screen2} />
      <Stack.Screen name="StatUnreadScreen" component={Screen3} />
      <Stack.Screen name="StatReadScreen" component={Screen4} />
    </Stack.Navigator>
  );
};
