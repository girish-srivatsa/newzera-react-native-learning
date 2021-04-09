const DUMMY_LOCATION = { coords: { latitude: '26.67', longitude: '122.37' } }

export default {
  addListener: jest.fn(),
  getCurrentPosition: jest.fn((callback) => {
    callback(DUMMY_LOCATION)
  }),
  removeListeners: jest.fn(),
  requestAuthorization: jest.fn(),
  setConfiguration: jest.fn(),
  startObserving: jest.fn(),
  stopObserving: jest.fn()
}
