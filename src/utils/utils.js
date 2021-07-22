export const ASYNC_STORAGE_KEYS = {
  IS_LOGGEDIN: "IS_LOGGEDIN",
  UID: "UID"
}

export const emailIDRegex = /^[\w-.]+@([\w-]+\.)+[a-zA-z]{2,3}([.]*[a-z]{2})*$/;
export const mobileRegex = /^\d{10}$/;
export const registerData = [
  {
    id: 'firstName',
    title: 'First Name',
  },
  {
    id: 'lastName',
    title: 'Last Name',
  },
  {
    id: 'email',
    title: 'Email Id',
    regex: emailIDRegex
  },
  {
    id: 'mobile',
    title: 'Mobile Number',
    regex: /^\d{10}$/
  },
  {
    id: 'password',
    title: 'Enter Password',
  },
  {
    id: 'confirmPassword',
    title: 'Confirm Password',
  },
];

export const showPassword = require('../assets/eye.png')
export const hidePassword = require('../assets/hidden.png')


