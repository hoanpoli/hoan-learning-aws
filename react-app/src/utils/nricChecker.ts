const getCheckDigit = (pre: string, digits: number[]) => {
  const weights = [2, 7, 6, 5, 4, 3, 2];
  const checkST = ['J', 'Z', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'D', 'C', 'B', 'A'];
  const checkFG = ['X', 'W', 'U', 'T', 'R', 'Q', 'P', 'N', 'M', 'L', 'K'];
  const checkM = ['X', 'W', 'U', 'T', 'R', 'Q', 'P', 'N', 'J', 'L', 'L'];
  let sum = 0;

  for (let i = 0; i < digits.length; i++) {
    sum += digits[i] * weights[i]
  }

  let offset = 0;
  if (pre === 'T' || pre === 'G') {
    offset = 4;
  } else if (pre === 'M') {
    offset = 3;
  }

  const dValue = (sum + offset) % 11;

  if (pre === 'T' || pre === 'S') {
    return checkST[dValue];
  } else if (pre === 'F' || pre === 'G') {
    return checkFG[dValue];
  } else if (pre === 'M') {
    return checkM[dValue];
  } else {
    return false;
  }
}

export const validateNRIC = (value: string | undefined)  => {
  try {
    if (typeof value !== 'string' || value.length !== 9)  {
      return false;
    }

    const pre = value.slice(0, 1);
    const digits = value.slice(1, 8)
      .split('')
      .map((num) => parseInt(num));

    if (digits.some((x) => isNaN(x))) {
      return false;
    }

    const checkDigit = value.slice(8, 9);
    return checkDigit === getCheckDigit(pre, digits);
  } catch (e) {
    return false;
  }
}