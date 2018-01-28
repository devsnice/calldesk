const phoneRegexp = /^((\+7)(\s)((\()[0-9]{3}(\)))(\s)([0-9]{3})([-])([0-9]{4}))$/;

const masks = {
  phone: [
    '+',
    '7',
    ' ',
    '(',
    /[1-9]/,
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ]
};

/*
 *  Check the correction of a phone
**/

export const isValidPhone = phone => {
  return phoneRegexp.test(phone);
};

/*
 *  Get setting for MaskedInput component
**/

export const getMasksProps = type => {
  switch (type) {
    case 'phone':
      return {
        mask: masks.phone,
        showMask: true,
        guide: true
      };
    default:
      return {};
  }
};
