//@flow

import 'react-native-gesture-handler';
import React, {useState, Component, useEffect} from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
var ImagePicker = require('react-native-image-picker');
import AsyncStorage from '@react-native-community/async-storage';

type Props = {
  onPress: PropTypes.func,
};
export const IconButtonF = (props: Props) => {
  const {onPress} = props;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Icon name={'add-circle'} size={40} color={'#f9c44e'} />
    </TouchableWithoutFeedback>
  );
};
/*
export default class IconButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePic: null,
      isImageThere: false,
    };
  }

  componentDidMount = () => {
    this.getImage();
  };

  getImage = async () => {
    const profilePic = await AsyncStorage.getItem('profilePic');
    if (profilePic) {
      this.setState({
        isImageAvailable: true,
        profilePic: JSON.parse(profilePic),
      });
    }
  };

  fromCam = () => {
    console.log('in');
    let s;
    console.log(ImagePicker.launchCamera);
    ImagePicker.launchCamera({}, (response) => {
      console.log('full');
      console.log(response.errorMessage);
      //source = response.uri;
    });
    return s;
  };
  fromLib = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        AsyncStorage.setItem('profilePic', JSON.stringify(source));
        console.log(source);
        this.setState({
          profilePic: source,
          isImageAvailable: true,
        });
      },
    );
  };

  selectPhotoTapped = () => {
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        {
          text: 'Camera',
          onPress: this.fromCam,
        },
        {
          text: 'Lib',
          onPress: this.fromLib,
          style: 'cancel',
        },
        {text: 'CAncel', onPress: () => null},
      ],
      {cancelable: false},
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.selectPhotoTapped}>
          <Icon name={'add-circle'} size={40} color={'#f9c44e'} />
        </TouchableWithoutFeedback>
        <Image
          // eslint-disable-next-line react-native/no-inline-styles
          style={{width: 50, height: 50}}
          source={require('./Assets/add.png')}
        />
        {this.state.isImageAvailable && (
          <Image
            source={this.state.profilePic}
            style={{width: 200, height: 200}}
          />
        )}

        {!this.state.isImageAvailable && (
          <Image
            // eslint-disable-next-line react-native/no-inline-styles
            style={{width: 50, height: 50}}
            source={require('./Assets/add.png')}
          />
        )}
      </View>
    );
  }
}
*/
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
