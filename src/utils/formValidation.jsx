// const specialCharacterPattern = new RegExp(/[~`!#$%\^&*+=()@\[\]\\;,/{}|\":<>\?\']/);
const emailPattern = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
// const mobilePattern = new RegExp(/^\d+$/);
// const integerGreaterThan0 = new RegExp(/^[1-9]+[0-9]*$/);
// const invalidText = (invalidChars) => { return `The character${invalidChars.length > 1 ? 's' : ''} ${invalidChars.length > 1 ? 'are' : 'is'} not allowed.` };
// const fieldRequiredText = 'This field is required';
const fieldRequiredText = 'Không để trống trường này';
const fieldContainSpaceText = 'This field can not contain spaces';
const emailInvalidText = 'Email không hợp lệ';

const validateLoginForm = (values, edited = false) => {
  let errors = {};
  if (!values.email) {
    errors.email = fieldRequiredText;
  } else if (!emailPattern.test(values.email)) {
    errors.email = emailInvalidText;
  }

  if (!values.password) {
    errors.password = fieldRequiredText;
  }
  
  return errors;
}
const validateCreatePostForm = (values, edited = false) => {
  let errors = {};
  if (!values.title) {
    errors.title = fieldRequiredText;
  }
  if (!values.title_google) {
    errors.title_google = fieldRequiredText;
  }
  if (!values.url) {
    errors.url = fieldRequiredText;
  }
  if (!values.keyword) {
    errors.keyword = fieldRequiredText;
  }
  if (!values.description) {
    errors.description = fieldRequiredText;
  }
  if (!values.description_google) {
    errors.description_google = fieldRequiredText;
  }
  return errors;
}
const validateCreateUserForm = (values, edited = false) => {
  let errors = {};
  if (!values.username) {
    errors.username = fieldRequiredText;
  }

  if (!values.password) {
    errors.password = fieldRequiredText;
  }
  if (!values.fullname) {
    errors.fullname = fieldRequiredText;
  }

  if (!values.email) {
    errors.email = fieldRequiredText;
  } else if (!emailPattern.test(values.email)) {
    errors.email = emailInvalidText;
  }

  return errors;
}
const validateUpdateUserForm = (values, edited = false) => {
  let errors = {};
  if (!values.username) {
    errors.username = fieldRequiredText;
  }

  if (!values.fullname) {
    errors.fullname = fieldRequiredText;
  }

  if (!values.email) {
    errors.email = fieldRequiredText;
  } else if (!emailPattern.test(values.email)) {
    errors.email = emailInvalidText;
  }

  return errors;
}
export {
  validateLoginForm,
  validateCreatePostForm,
  validateCreateUserForm,
  validateUpdateUserForm
}
