/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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
import {Screen2} from './Screen2';
import {Screen1} from './Screen1';
import {Nav} from '../Navigators/Navigator';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import {ApolloProvider} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3000/dev/graphql/',
  cache: new InMemoryCache({
    typePolicies: {
      Bio: {
        fields: {
          profileurl: {
            merge: true,
          },
        },
      },
    },
  }),
});
const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Nav />
      </NavigationContainer>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
