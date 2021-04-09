import React from 'react';
import {mount} from 'enzyme';
import {MockedProvider} from '@apollo/client/testing';
import AsyncStorage from '@react-native-community/async-storage';
import {useQuery, gql, useMutation} from '@apollo/client';
import {Screen1} from '../../App/Containers/Screen1';
var ReactTestUtils = require('react-dom/test-utils');

jest.mock('@react-native-community/async-storage');

const createTestProps = (props) => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...props,
});

const waitForComponentToPaint = async (wrapper) => {
  await ReactTestUtils.act(async () => {
    await new Promise((resolve) => setTimeout(resolve));
    wrapper.update();
  });
};
let mutated = false;
const GET_BIO_OUTPUT = {
  name: '123',
  description: '123',
  url: '123',
  profileUrl: 'https://picsum.photos/id/237/200/300',
};

const INIT_GET_BIO_OUTPUT = {
  name: '123',
  description: '123',
  url: '123',
  profileUrl: '123',
};

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

const ADD_PROFILE = gql`
  mutation AddProfile($url: String!) {
    addProfilePicture(name: "123", profileUrl: $url) {
      name
      profileUrl
    }
  }
`;

const ADD_PROFILE_OUTPUT = {
  name: '123',
  profileUrl: 'People/Amanda.jpeg',
};

const result_mocks = [
  {
    request: {
      query: GET_BIO,
    },
    result: () => {
      return {
        data: {
          getUserDetails: GET_BIO_OUTPUT,
        },
      };
    },
  },
  {
    request: {
      query: ADD_PROFILE,
      variables: {
        url: 'People/Amanda.jpeg',
      },
    },
    result: () => {
      mutated = true;
      return {
        data: {
          addProfilePicture: ADD_PROFILE_OUTPUT,
        },
      };
    },
  },
];

const error_mocks = [
  {
    request: {
      query: GET_BIO,
    },
    error: new Error('invalid bio'),
  },
];

const init_mocks = [
  {
    request: {
      query: GET_BIO,
    },
    result: () => {
      return {
        data: {
          getUserDetails: INIT_GET_BIO_OUTPUT,
        },
      };
    },
  },
];

describe('Test for Screen1', () => {
  let props;

  beforeAll(async () => {
    jest.setTimeout(100000);
    props = createTestProps({});
    await AsyncStorage.setItem('read', 'false');
    await AsyncStorage.setItem(
      'profilePic',
      'https://picsum.photos/id/237/200/300',
    );
    await AsyncStorage.setItem(
      'statusPic',
      'https://picsum.photos/id/237/200/300',
    );
    mutated = false;
    console.log('before done');
  });

  afterAll(async () => {
    await AsyncStorage.removeItem('read');
    await AsyncStorage.removeItem('profilePic');
    await AsyncStorage.removeItem('statusPic');
  });

  afterEach(async () => {
    mutated = false;
  });

  test('should render loading state', async () => {
    const wrapper = mount(
      <MockedProvider mocks={result_mocks} addTypename={false}>
        <Screen1 {...props} />
      </MockedProvider>,
    );

    expect(wrapper.find('DecagonButton')).toHaveLength(1);
    expect(wrapper.find('Bio')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
  });
  test('should render error state', async () => {
    const wrapper = mount(
      <MockedProvider mocks={error_mocks} addTypename={false}>
        <Screen1 {...props} />
      </MockedProvider>,
    );

    await new Promise((resolve) => setTimeout(resolve, 5000));
    wrapper.update();

    expect(wrapper.find('DecagonButton')).toHaveLength(1);
    expect(wrapper.find('Bio')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
  });

  test('should render initial state', async () => {
    const wrapper = mount(
      <MockedProvider mocks={init_mocks} addTypename={false}>
        <Screen1 {...props} />
      </MockedProvider>,
    );

    await new Promise((resolve) => setTimeout(resolve, 5000));
    wrapper.update();

    expect(wrapper.find('DecagonButton')).toHaveLength(1);
    expect(wrapper.find('Bio')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
  });

  test('should render data state', async () => {
    const wrapper = mount(
      <MockedProvider mocks={result_mocks} addTypename={false}>
        <Screen1 {...props} />
      </MockedProvider>,
    );
    await new Promise((resolve) => setTimeout(resolve, 0));
    wrapper.update();

    expect(wrapper.find('DecagonButton')).toHaveLength(1);
    expect(wrapper.find('Bio')).toHaveLength(1);
    expect(wrapper.find('Bio').text()).toMatch('123');
    expect(wrapper.find('Bio').text()).toMatch('123');
    expect(wrapper.find('Bio').text()).toMatch('123');
    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
  });
  test('should test press', async () => {
    const wrapper = mount(
      <MockedProvider mocks={result_mocks} addTypename={false}>
        <Screen1 {...props} />
      </MockedProvider>,
    );

    await new Promise((resolve) => setTimeout(resolve, 3000));
    wrapper.update();

    wrapper
      .find('DecagonButton')
      .find('IconButtonF')
      .find('TouchableWithoutFeedback')
      .at(0)
      .prop('onPress')();

    await new Promise((resolve) => setTimeout(resolve, 1000));
    const pic = await AsyncStorage.getItem('statusPic');
    expect(pic).toMatch('{"uri":"People/Amanda.jpeg"}');
  });
  test('should test long press', async () => {
    const wrapper = mount(
      <MockedProvider mocks={result_mocks} addTypename={false}>
        <Screen1 {...props} />
      </MockedProvider>,
    );

    await new Promise((resolve) => setTimeout(resolve, 5000));
    wrapper.update();
    expect(wrapper).toMatchSnapshot();

    wrapper
      .find('DecagonButton')
      .find('Poly')
      .find('Svg')
      .find('Image')
      .prop('onLongPress')();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(mutated).toBe(true);
    wrapper.unmount();
  });
});
