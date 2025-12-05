import nric from 'nric';
import * as yup from 'yup';

yup.addMethod(yup.string, 'nric', function (message: string = 'Invalid NRIC') {
  return this.test('nric', message, function (value) {

    const { path } = this;

    if(value){
      if (!nric.validate(value)) {
        return this.createError({ path, message });
      }
    }

    return true;
  })
});

yup.addMethod(
  yup.string,
  'phoneNumber',
  function (message: string = 'Phone Number format is not valid') {
    return this.matches(/^[689]\d{7}$/i, { message });
  }
);

yup.addMethod(
  yup.string,
  'individualIDNumber',
  function (message: string = 'Invalid ID Number') {
    return this.matches(/^(?:[ST]\d{7}[A-Z]|[FGM]\d{7}[A-Z])$/, { message });
  }
);

yup.addMethod(
  yup.string,
  'organisationIDNumber',
  function (message: string = 'Invalid ID Number') {
    return this.matches(
      /^(?:\d{8}[A-Z]$|\d{4}\/[A-Z]{2}\d{3}[A-Z]$|[A]\d{7}[A-Z]$|\d{9}[A-Z]$|[ST]\d{2}[PQ]\d{4}[A-Z])$/,
      { message }
    );
  }
);

declare module 'yup' {
  interface StringSchema {
    nric(_message?: string): StringSchema;
    individualIDNumber(_message?: string): StringSchema;
    organisationIDNumber(_message?: string): StringSchema;
    phoneNumber(_message?: string): StringSchema;
  }
}

export default yup;
