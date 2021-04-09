import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Svg, {Polyline, ClipPath, Defs, Path, Rect} from 'react-native-svg';
import {Image} from 'react-native-svg';
import {IconButtonF} from './IconButton';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import {useQuery, gql, useMutation} from '@apollo/client';
const ADD_PROFILE = gql`
  mutation AddProfile($url: String!) {
    addProfilePicture(name: "123", profileUrl: $url) {
      name
      profileUrl
    }
  }
`;

const Poly = (props) => {
  const [addProfile, {data}] = useMutation(ADD_PROFILE);
  let points = [];
  for (let i = 1; i < props.sides + 2; i++) {
    let cx = props.cx || props.r;
    let cy = props.cy || props.r;
    points.push({
      x: cx + Math.round(props.r * Math.sin((Math.PI / (props.sides / 2)) * i)),
      y: cy + Math.round(props.r * Math.cos((Math.PI / (props.sides / 2)) * i)),
    });
  }

  let pointsStr = '';
  points.forEach((val) => {
    pointsStr += `${val.x},${val.y} `;
  });
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
          /*
          const source = {uri: response.uri};
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
  //console.log('poly');
  //console.log(props.src);
  if (data) {
    return (
      <Svg
        width={props.width || props.r * 2}
        height={props.height || props.r * 2}>
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
          href={data.addProfilePicture.profileUrl}
          clipPath="#clip"
          onLongPress={photoTapped}
        />
      </Svg>
    );
  }
  return (
    <Svg
      width={props.width || props.r * 2}
      height={props.height || props.r * 2}>
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
      />
    </Svg>
  );
};

Poly.propTypes = {
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
};

export default Poly;
