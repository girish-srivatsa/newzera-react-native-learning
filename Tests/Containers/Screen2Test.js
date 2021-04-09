import React from 'react';
import {mount} from 'enzyme';
import {MockedProvider} from '@apollo/client/testing';
import AsyncStorage from '@react-native-community/async-storage';
import {useQuery, gql, useMutation} from '@apollo/client';
import {Screen2} from '../../App/Containers/Screen2';
var ReactTestUtils = require('react-dom/test-utils');

jest.mock('@react-native-community/async-storage');

const createTestProps = (props) => ({
  navigation: {
    navigate: jest.fn(),
  },
  route: {
    params: {
      pic: 'People/Amanda.jpeg',
    },
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

describe('Test for Screen2', () => {
  let props;

  beforeAll(async () => {
    jest.setTimeout(100000);
    props = createTestProps({});
    mutated = false;
    console.log('before done');
  });

  afterAll(async () => {});

  afterEach(async () => {
    mutated = false;
  });
  test('should render loading state', async () => {
    global.withAnimatedTimeTravelEnabled(() => {
      const wrapper = mount(
        <MockedProvider mocks={result_mocks} addTypename={false}>
          <Screen2 {...props} />
        </MockedProvider>,
      );

      expect(wrapper.find('Image')).toHaveLength(2);
      expect(props.route.params.pic).toMatch('People/Amanda.jpeg');
      global.timeTravel(2600);
      expect(props.navigation.navigate).toHaveBeenCalledTimes(0);
      expect(wrapper.find('Image')).toHaveLength(2);
      expect(props.route.params.pic).toMatch('People/Amanda.jpeg');
      global.timeTravel(2500);
      expect(props.navigation.navigate).toHaveBeenCalledTimes(1);
      expect(wrapper.find('Image')).toHaveLength(2);
      expect(props.route.params.pic).toMatch('People/Amanda.jpeg');
      expect(wrapper).toMatchSnapshot();

      wrapper.unmount();
    });
  });
  /*
  test('should render data state', async () => {
    const wrapper = mount(
      <MockedProvider mocks={result_mocks} addTypename={false}>
        <Screen3 {...props} />
      </MockedProvider>,
    );
    await new Promise((resolve) => setTimeout(resolve, 0));
    wrapper.update();

    expect(wrapper.find('DecagonView')).toHaveLength(1);
    expect(wrapper.find('Bio')).toHaveLength(1);
    expect(wrapper.find('Bio').text()).toMatch('123');
    expect(wrapper.find('Bio').text()).toMatch('123');
    expect(wrapper.find('Bio').text()).toMatch('123');
    expect(wrapper.find('DecagonView').find('DrawPoly').prop('stroke')).toMatch(
      'yellow',
    );
    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
  });
  test('should test press', async () => {
    const wrapper = mount(
      <MockedProvider mocks={result_mocks} addTypename={false}>
        <Screen3 {...props} />
      </MockedProvider>,
    );

    await new Promise((resolve) => setTimeout(resolve, 3000));
    wrapper.update();

    wrapper
      .find('DecagonView')
      .find('DrawPoly')
      .find('Svg')
      .find('Image')
      .at(0)
      .prop('onPress')();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(props.navigation.navigate).toHaveBeenCalledTimes(1);
  });
  test('should test long press', async () => {
    const wrapper = mount(
      <MockedProvider mocks={result_mocks} addTypename={false}>
        <Screen3 {...props} />
      </MockedProvider>,
    );

    await new Promise((resolve) => setTimeout(resolve, 5000));
    wrapper.update();
    expect(wrapper).toMatchSnapshot();

    wrapper.find('DecagonView').find('Svg').find('Image').prop('onLongPress')();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(mutated).toBe(true);
    wrapper.unmount();
  });*/
});
