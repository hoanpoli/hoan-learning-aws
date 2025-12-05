export const amountValidation = (value: string) => {
  let formatted = value.replace(/\D/g, '');

  if (formatted.startsWith('0')) {
    formatted = formatted.substring(1);
  }

  if (formatted.length > 6) {
    formatted = formatted.substring(0, 6);
  }

  return formatted;
}

export const fullnameValidation = (value: string) => {
  let formatted = value.replace(/[0-9]/g, '');

  if (formatted.length > 50) {
    formatted = formatted.substring(0, 50);
  }

  return formatted;
}

export const validationMaxCharacters = (value: string, max: number) => {
  let formatted = value;

  if (formatted.length > max) {
    formatted = formatted.substring(0, max);
  }

  return formatted;
}