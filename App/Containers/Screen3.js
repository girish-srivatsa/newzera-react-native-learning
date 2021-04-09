/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useEffect, useRef, useState} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  StatusBar,
  Animated,
} from 'react-native';
import {Bio} from '../Components/Bio';
import {NavigationContainer} from '@react-navigation/native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-community/async-storage';
import {DecagonView} from '../Components/DecagonView';

export const Screen3 = ({navigation}) => {
  const getRead = async () => {
    const a = await AsyncStorage.getItem('read');
    if (a === 'true') {
      navigation.replace('StatReadScreen');
    }
  };
  useEffect(() => {
    getRead();
  });
  console.log('in');
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <DecagonView navigation={navigation} str="yellow" />
      </View>
      <View style={{flex: 1}}>
        <Bio />
      </View>
    </View>
  );
};
