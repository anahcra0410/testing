/**
 * Centralised test data and configuration values for the QA automation assignment.
 */
export const testData = {
  urls: {
    login: 'https://practicetestautomation.com/practice-test-login/',
    secureArea: 'https://practicetestautomation.com/logged-in-successfully/'
  },
  credentials: {
    valid: {
      username: 'student',
      password: 'Password123'
    },
    invalidUsername: {
      username: 'students',
      password: 'Password123'
    },
    invalidPassword: {
      username: 'student',
      password: 'Password321'
    },
    blank: {
      username: '',
      password: ''
    }
  },
  messages: {
    success: 'Congratulations student. You successfully logged in!',
    invalidUsername: 'Your username is invalid!',
    invalidPassword: 'Your password is invalid!'
  }
};

