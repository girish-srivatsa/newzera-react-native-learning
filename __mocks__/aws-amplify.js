export const Auth = {
  currentSession: jest.fn(() => Promise.resolve()),
  signIn: jest.fn(),
  signOut: jest.fn(() => Promise.resolve()),
  forgotPassword: jest.fn(() => Promise.resolve()),
  confirmSignUp: jest.fn(() => Promise.resolve()),
  currentAuthenticatedUser: jest.fn(() =>
    Promise.resolve({
      attributes: {
        email_verified: true,
        name: 'Tester'
      },
      signInUserSession: {
        idToken: {
          jwtToken: 'AAA111'
        }
      }
    })
  ),
  forgotPasswordSubmit: jest.fn(() => Promise.resolve())
}
