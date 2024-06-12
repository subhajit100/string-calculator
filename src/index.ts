function findDelimiterAndNumberString(numbersWithoutSpaces: string): {
  delimiter: string;
  remainingString: string;
} {
  // Find the position of the newline character
  let newlineIndex = numbersWithoutSpaces.indexOf("\n");

  // Extract the delimiter between '//' and '\n'
  if (newlineIndex !== -1) {
    let delimiter = numbersWithoutSpaces.substring(2, newlineIndex);
    let remainingString = numbersWithoutSpaces.substring(newlineIndex + 1);
    return { delimiter, remainingString };
  } else {
    throw new Error(
      "Invalid format: no newline character found after delimiter"
    );
  }
}

// works both for single as well as multiple delimiters, if delimiter passed then that one used, else a combination of , and \n will be used.
function findSumFromNumbersString(
  numbersWithoutSpaces: string,
  negNumbersList: number[],
  delimiter?: string
) {
  let splitString: RegExp | string = /[, \n]+/;
  if (delimiter) {
    splitString = delimiter;
  }
  return numbersWithoutSpaces
    .split(splitString)
    .map(Number)
    .reduce((acc, curr) => {
      // maintain a list of negative numbers
      if (curr < 0) {
        negNumbersList.push(curr);
      }
      return acc + curr;
    }, 0);
}

export function add(numbers: string): number {
  // check if numbers empty string or not defined
  let result = 0;
  if (!numbers) {
    return result;
  }
  // remove spaces in string if any
  const numbersWithoutSpaces = numbers.replace(/ /g, "");
  const negNumbersList: number[] = [];
  //   console.log("numbers without spaces", numbersWithoutSpaces)

  // check if we have dynamic delimiters configured in this form:- //[delimiter]\n[numbers…]
  if (
    numbersWithoutSpaces.length > 2 &&
    numbersWithoutSpaces.startsWith("//")
  ) {
    const { delimiter, remainingString } =
      findDelimiterAndNumberString(numbersWithoutSpaces);
    result = findSumFromNumbersString(
      remainingString,
      negNumbersList,
      delimiter
    );
  } else {
    // split out the strings into an array of numbers and find the sum
    result = findSumFromNumbersString(numbersWithoutSpaces, negNumbersList);
  }

  if (negNumbersList.length > 0) {
    // throw error in the form:- negative numbers not allowed: -9,-3,-14
    const negNumberString = negNumbersList.join(",");
    throw new Error(`negative numbers not allowed: ${negNumberString}`);
  }
  return result;
}
