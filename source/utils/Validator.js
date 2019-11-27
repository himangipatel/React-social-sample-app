/**
 * @author Himangi Patel <himangi.patel@credencys.com>
 */

export const validateEmail = text => {
  console.log(text);
  let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (reg.test(text) === false) {
    return false;
  } else {
    return true;
  }
};

export const validatePassword = text => {
  var reg = /(?=.{8,})/;
  if (reg.test(text) === true) {
    return true;
  } else {
    return false;
  }
};

export const validateMobileNumber = text => {
  var reg = /^([0]|\+91)?\d{10}/;
  var test = reg.test(text);
  if (test) {
    return true;
  } else {
    return false;
  }
};

export const validateEmptyField = text => {
  return (text.trim() === '') ? false : true;
}
