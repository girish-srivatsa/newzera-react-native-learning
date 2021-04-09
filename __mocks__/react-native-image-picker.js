// Defining a dummy response from ImagePicker
const dummyImgResponse = {
  customButton: 'gallery',
  didCancel: false,
  error: false,
  uri: 'People/Amanda.jpeg',
  type: 'image/jpeg',
};
/*
  Mocks showImagePicker method from the react-native-image-picker library.
  Note: Add more methods to this file, if other methods of this library is used.
*/
export const showImagePicker = jest.fn((options, callback) =>
  callback(dummyImgResponse),
);
export const launchCam = jest.fn((options, callback) =>
  callback(dummyImgResponse),
);
export const launchLibrary = jest.fn((options, callback) =>
  callback(dummyImgResponse),
);

export default {
  showImagePicker,
  launchCam,
  launchLibrary,
};
