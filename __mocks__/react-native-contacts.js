// Defining a dummy contact for testing purpose
const DUMMY = [
  {
    recordID: '1',
    emailAddresses: [
      {
        label: 'work',
        email: 'carl-jung@example.com'
      }
    ],
    familyName: 'Jung',
    givenName: 'Carl',
    phoneNumbers: [
      {
        label: 'mobile',
        number: '(555) 555-5555'
      }
    ],
    thumbnailPath: 'content://com.android.contacts/display_photo/3'
  },
  {
    recordID: '2',
    emailAddresses: [
      {
        label: 'work',
        email: 'sher@example.com'
      }
    ],
    familyName: 'Lock',
    givenName: 'Sher',
    phoneNumbers: [
      {
        label: 'mobile',
        number: '(999) 999-9999'
      }
    ],
    thumbnailPath: 'content://com.android.contacts/display_photo/2'
  },
  {
    recordID: '3',
    emailAddresses: [],
    familyName: '',
    givenName: 'abc',
    phoneNumbers: [
      {
        label: 'mobile',
        number: '(111) 111-1111'
      }
    ],
    thumbnailPath: 'content://com.android.contacts/display_photo/1'
  },
  {
    recordID: '4',
    emailAddresses: [
      {
        label: 'home',
        email: 'withoutphone@example.com'
      }
    ],
    familyName: 'Phone',
    givenName: 'Without',
    phoneNumbers: [],
    thumbnailPath: 'content://com.android.contacts/display_photo/4'
  }
]

/*
  Mocking the methods of react-native-contacts
  Note: Add the more methods in this file if you use more methods provided by this package
*/

export const getAll = jest.fn((callback) => {
  callback(null, DUMMY)
})

export const getContactsByPhoneNumber = jest.fn((number, callback) => callback(null, DUMMY))
export const getContactsByEmailAddress = jest.fn((number, callback) => callback(null, DUMMY))

export default {
  getAll,
  getContactsByPhoneNumber,
  getContactsByEmailAddress
}
