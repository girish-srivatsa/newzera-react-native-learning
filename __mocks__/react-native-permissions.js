const { PERMISSIONS, RESULTS } = require('react-native-permissions/lib/commonjs/constants')
export { PERMISSIONS, RESULTS }

export const openSettings = jest.fn(async () => {})
export const check = jest.fn(async (permission) => RESULTS.GRANTED)
export const request = jest.fn()

request
  .mockReturnValueOnce(new Promise.resolve(RESULTS.GRANTED))
  .mockReturnValueOnce(new Promise.resolve(RESULTS.DENIED))
  .mockReturnValueOnce(new Promise.resolve(RESULTS.BLOCKED))
  .mockReturnValueOnce(new Promise.resolve(RESULTS.UNAVAILABLE))

const notificationOptions = [
  'alert',
  'badge',
  'sound',
  'criticalAlert',
  'carPlay'
  // 'provisional', // excluded as it's not included in NotificationSettings
]

const notificationSettings = {
  alert: true,
  badge: true,
  sound: true,
  carPlay: true,
  criticalAlert: true,
  lockScreen: true,
  notificationCenter: true
}

export const checkNotifications = jest.fn(async () => ({
  status: RESULTS.GRANTED,
  settings: notificationSettings
}))

export const requestNotifications = jest.fn(async (options) => ({
  status: RESULTS.GRANTED,
  settings: options
    .filter((option) => notificationOptions.includes(option))
    .reduce((acc, option) => ({ ...acc, [option]: true }), {
      lockScreen: true,
      notificationCenter: true
    })
}))

export const checkMultiple = jest.fn(async (permissions) =>
  permissions.reduce((acc, permission) => ({
    ...acc,
    [permission]: RESULTS.GRANTED
  }))
)

export const requestMultiple = jest.fn(async (permissions) =>
  permissions.reduce((acc, permission) => ({
    ...acc,
    [permission]: RESULTS.GRANTED
  }))
)

export default {
  PERMISSIONS,
  RESULTS,
  openSettings,
  check,
  request,
  checkNotifications,
  requestNotifications,
  checkMultiple,
  requestMultiple
}
