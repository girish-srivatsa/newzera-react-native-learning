import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Svg, {G, Polyline, ClipPath, Defs, Path, Rect} from 'react-native-svg';
import {Image} from 'react-native-svg';
import {IconButtonF} from './IconButton';
import {
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useQuery, gql, useMutation} from '@apollo/client';
const ADD_PROFILE = gql`
  mutation AddProfile($url: String!) {
    addProfilePicture(name: "123", profileUrl: $url) {
      name
      profileUrl
    }
  }
`;

const DrawPoly = (props) => {
  const [addProfile, {data}] = useMutation(ADD_PROFILE);

  console.log('1');
  console.log(props.stat);
  /*const fromCam = () => {
    ImagePicker.launchCamera(
      {
        saveToPhotos: true,
      },
      (response) => {
        //source = response.uri;
        const source = {uri: response.uri};
        console.log(source);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        AsyncStorage.setItem('profilePic', JSON.stringify(source));
        addProfile({variables: {url: response.uri.toString()}});
      },
    );
  };
  const fromLib = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
        storageOptions: {
          cameraRoll: true,
        },
      },
      (response) => {
        const source = {uri: response.uri};
        console.log(source);
        console.log(response);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        AsyncStorage.setItem('profilePic', JSON.stringify(source));
        addProfile({variables: {url: response.uri.toString()}});
      },
    );
  };

  const selectPhotoTapped = () => {
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        {
          text: 'Camera',
          onPress: fromCam,
        },
        {
          text: 'Lib',
          onPress: fromLib,
        },
        {text: 'Cancel', onPress: () => null, style: 'cancel'},
      ],
      {cancelable: false},
    );
  };*/
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
          AsyncStorage.setItem('profilePic', JSON.stringify(source));
          addProfile({variables: {url: response.uri.toString()}});
        } else {
          /* const source = {uri: response.uri};
          console.log(source);
          console.log(response);
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          AsyncStorage.setItem('profilePic', JSON.stringify(source));
          addProfile({variables: {url: response.uri.toString()}});*/
        }
      },
    );
  };
  let points = [];
  for (let i = 1; i < props.sides + 2; i++) {
    let cx = props.cx || props.r + 5;
    let cy = props.cy || props.r + 5;
    points.push({
      x: cx + Math.round(props.r * Math.sin((Math.PI / (props.sides / 2)) * i)),
      y: cy + Math.round(props.r * Math.cos((Math.PI / (props.sides / 2)) * i)),
    });
  }
  let point1 = [];
  for (let i = 1; i < props.sides + 2; i++) {
    let cx = props.cx || props.r + 5;
    let cy = props.cy || props.r + 5;
    point1.push({
      x:
        cx +
        Math.round((props.r + 5) * Math.sin((Math.PI / (props.sides / 2)) * i)),
      y:
        cy +
        Math.round((props.r + 5) * Math.cos((Math.PI / (props.sides / 2)) * i)),
    });
  }
  let pointsStr = '';
  let pointsStr1 = '';
  points.forEach((val) => {
    pointsStr += `${val.x},${val.y} `;
  });
  point1.forEach((val) => {
    pointsStr1 += `${val.x},${val.y} `;
  });
  //console.log('poly');
  //console.log(props.src);
  return (
    <Svg
      width={props.width || (props.r + 5) * 2}
      height={props.height || (props.r + 5) * 2}>
      <Polyline points={pointsStr1} strokeWidth={4} stroke={props.stroke} />
      <Defs>
        <ClipPath id="clip">
          <Polyline
            points={pointsStr}
            strokeWidth={2}
            fill="white"
            stroke="gray"
          />
        </ClipPath>
      </Defs>
      <Image
        x={props.cx}
        y={props.cy}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        href={props.src}
        clipPath="#clip"
        onLongPress={photoTapped}
        onPress={() => {
          console.log('stat', props.stat);
          props.navigation.navigate('StatScreen', {pic: props.stat});
        }}
      />
    </Svg>
  );
};

DrawPoly.propTypes = {
  r: PropTypes.number.isRequired,
  sides: PropTypes.number.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  cx: PropTypes.number,
  cy: PropTypes.number,
  strokeWidth: PropTypes.number,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  src: PropTypes.any,
  navigation: PropTypes.any,
  stat: PropTypes.any,
};

export default DrawPoly;
