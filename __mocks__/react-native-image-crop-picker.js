// Defining a dummy response from ImagePicker
const dummyImgResponse = {
  path: 'images/abc.jpeg',
  mime: 'image/jpeg'
}
/*
  Mocks showImagePicker method from the react-native-image-picker library.
  Note: Add more methods to this file, if other methods of this library is used.
*/

export default {
  openCamera: jest.fn(() => Promise.resolve(dummyImgResponse)),
  openPicker: jest.fn(() => Promise.resolve(dummyImgResponse))
}
