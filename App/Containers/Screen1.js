/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
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
import {Screen2} from './Screen2';
import AsyncStorage from '@react-native-community/async-storage';

export const Screen1 = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <DecagonButton navigation={navigation} />
      </View>
      <View style={{flex: 1}}>
        <Bio />
      </View>
    </View>
  );
};
