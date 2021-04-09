//@flow

import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Linking,
  TouchableWithoutFeedback,
  ImageBackground,
  Image,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import PropTypes from 'prop-types';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Poly from './Poly';
import DrawPoly from './DrawPoly';
import AsyncStorage from '@react-native-community/async-storage';

type Props = {
  src: String,
  navigation: any,
  str: String,
};
export const DecagonView = (props: Props) => {
  console.log('here');
  const {src, navigation, str} = props;
  const [profilePic, profilePicState] = useState({});
  const [isImageAvailable, isImageAvailableState] = useState(false);
  const [statPic, statPicState] = useState({});
  const getImage = async () => {
    const profilPic = await AsyncStorage.getItem('profilePic');
    const statusPic = await AsyncStorage.getItem('statusPic');
    console.log(profilPic);
    if (profilPic) {
      isImageAvailableState(true);
      profilePicState(JSON.parse(profilPic));
      statPicState(JSON.parse(statusPic));
    }
  };
  useEffect(() => {
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
    if (!isImageAvailable) {
      console.log('in1');
      getImage();
    }
  }, [isImageAvailable, profilePic, statPicState]);
  return (
    <View style={styles.container}>
      {isImageAvailable && (
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <DrawPoly
            sides={10}
            r={120}
            cx={0}
            cy={0}
            stroke={str}
            strokeWidth={50}
            src={profilePic}
            stat={statPic}
            navigation={navigation}
          />
        </View>
      )}

      {!isImageAvailable && (
        <View>
          <DrawPoly
            sides={10}
            r={120}
            cx={0}
            cy={0}
            navigation={navigation}
            stroke="yellow"
            stat={statPic}
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  nameText: {
    fontSize: 40,
    color: '#878787',
  },
  bioText: {
    fontSize: 20,
    color: '#929292',
  },
});
