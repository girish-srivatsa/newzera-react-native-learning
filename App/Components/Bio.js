//@flow

import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Linking,
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
type Props = {
  name: String,
  profession: String,
  url: String,
};
export const Bio = (props: Props) => {
  const {loading, error, data} = useQuery(GET_BIO);
  const {name, profession, url} = props;
  //console.log(loading, error, data);
  if (loading) {
    return <View />;
  }
  if (error) {
    return <View />;
  }
  //console.log(Object.keys(data));
  //console.log(data.getUserDetails);
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{data.getUserDetails.name}</Text>
      <Text style={styles.bioText}>{data.getUserDetails.description}</Text>
      <Text style={styles.bioText}>{data.getUserDetails.url}</Text>
    </View>
  );
};

Bio.defaultProps = {
  name: 'hi',
  profession: 'bye',
  url: 'www.google.com',
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
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
