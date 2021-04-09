/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App/Containers/App';
import {name as appName} from './app.json';
import {Screen2} from './App/Containers/Screen2';

AppRegistry.registerComponent(appName, () => App);
