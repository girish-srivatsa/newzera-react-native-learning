//@flow

import 'react-native-gesture-handler';
import React, {useState, Component, useEffect} from 'react';
var RNFetchBlob = require('react-native-fetch-blob').default;

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Linking,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import PropTypes from 'prop-types';
import {TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Poly from './Poly';
import {DecagonView} from './DecagonView';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import {IconButtonF} from './IconButton';
import {useQuery, gql} from '@apollo/client';
const GET_BIO = gql`
  query {
    getUserDetails(name: "123") {
      name
      description
      url
      profileUrl
    }
  }
`;

export const DecagonButton = ({navigation}) => {
  const {loading, error, data} = useQuery(GET_BIO);
  const photoTapped = () => {
    ImagePicker.showImagePicker(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
        saveToPhotos: true,
        storageOptions: {
          cameraRoll: true,
        },
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log(
            'User tapped custom button please: ',
            response.customButton,
          );
          const source = {uri: response.uri};
          console.log(source);
          console.log(response);
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          AsyncStorage.setItem('statusPic', JSON.stringify(source));
        } else {
          /*
          const source = {uri: response.uri};
          console.log(source);
          console.log(response);
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          AsyncStorage.setItem('statusPic', JSON.stringify(source));
          */
        }
      },
    );
  };
  if (data) {
    if (data.getUserDetails.profileUrl !== '123') {
      return (
        <View style={styles.container}>
          <Poly sides={10} r={100} src={data.getUserDetails.profileUrl} />
          <IconButtonF onPress={photoTapped} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Poly sides={10} r={100} src={require('./Assets/add.png')} />
          <IconButtonF onPress={photoTapped} />
        </View>
      );
    }
  }
  if (loading) {
    return <View></View>;
  }
  if (error) {
    return <View></View>;
  }
  /*
  return (
    <View style={styles.container}>
      {isImageAvailable && (
        // eslint-disable-next-line react-native/no-inline-styles
        <Poly sides={10} r={100} src={profilePic} />
      )}

      {!isImageAvailable && (
        <Poly sides={10} r={100} src={require('./Assets/add.png')} />
      )}
      <IconButtonF onPress={selectPhotoTapped} />
    </View>
  );*/
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    left: 50 + Math.round(100 * Math.sin((Math.PI / 5) * 1)),
    top: 50 + Math.round(100 * Math.cos((Math.PI / 5) * 1)),
  },
});
