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
import {NavigationContainer} from '@react-navigation/native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-community/async-storage';

export const Screen2 = ({navigation, route}) => {
  const statPic = route.params.pic;
  console.log(statPic);
  const [progress, setProgress] = useState(0);
  useInterval(() => {
    if (progress < 100) {
      setProgress(progress + 1);
    }
  }, 50);
  let animation = useRef(new Animated.Value(0));
  useEffect(() => {
    if (progress < 50) {
      AsyncStorage.setItem('read', 'true');
    }
    Animated.timing(animation.current, {
      toValue: progress,
      duration: 100,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        navigation.navigate('StatReadScreen');
      }
    });
  }, [progress, navigation]);
  const width = animation.current.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
      }}>
      <View style={styles.progressBar}>
        <Animated.View
          style={
            ([StyleSheet.absoluteFill],
            {backgroundColor: '#3a4eab', width: width})
          }
        />
      </View>
      <Image source={statPic} style={{width: '90%', height: '50%'}} />
    </View>
  );
};
function useInterval(callback, delay) {
  const savedCallback = useRef();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
const styles = StyleSheet.create({
  progressBar: {
    flexDirection: 'row',
    height: 10,
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5,
  },
  absoluteFill: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
