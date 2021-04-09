import {View} from 'react-native';
import React from 'react';

import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import moment from "moment"
//moment.tz.setDefault('UTC');

configure({adapter: new Adapter()});

// eslint-disable-next-line global-require
jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('react-native/Libraries/LayoutAnimation/LayoutAnimation.js');

// usedFor GroupMemberDetails.js test
const originalNavigation = require.requireActual('@react-navigation/native');
jest.mock('@react-navigation/native', () => ({
  ...originalNavigation,
  useNavigation: () => jest.fn(),
}));

// usedFor ChatOptionsGroupTest.js and ChatOptionsInfividualTest.js

// used in multiple Chat Component Screens

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

jest.mock('react-native/Libraries/LayoutAnimation/LayoutAnimation.js');

jest.mock('react-native/Libraries/Share/Share.js');

function setupTimeTravelForRNAnimated() {
  const MockDate = require('mockdate');
  const frameTime = 50;
  global.withAnimatedTimeTravelEnabled = (func) => {
    MockDate.set(0);
    jest.useFakeTimers();
    func();
    MockDate.reset();
    jest.useRealTimers();
  };
  global.requestAnimationFrame = (callback) => {
    setTimeout(callback, frameTime);
  };
  global.timeTravel = (time = frameTime) => {
    const tickTravel = () => {
      const now = Date.now();
      MockDate.set(new Date(now + frameTime));
      // Run the timers forward
      jest.advanceTimersByTime(frameTime);
    };
    // Step through each of the frames
    const frames = time / frameTime;
    for (let i = 0; i < frames; i++) {
      tickTravel();
    }
  };
}
setupTimeTravelForRNAnimated();

const originalConsoleError = console.error;
console.error = (message) => {
  if (message.startsWith('Warning:')) {
    return;
  }
  originalConsoleError(message);
};

window.alert = (msg) => {
  console.log(msg);
};
