/**
 * Returns toWrap split with newlines inserted at relevant points to avoid exceeding lineLength characters per line.
 * Attempts to break between words but will split using hyphens if necessary.
 * 
 * @param {string} toWrap the string to wrap
 * @param {number} lineLength the maximum number of characters per line
 */
export function wrapString(toWrap, lineLength) {
    const words = toWrap.split(" ");
    let wrapped = "";
    let currentLineLength = 0;

    words.forEach(word => {
        let remainingLength = lineLength - currentLineLength;
        if (word.length >= remainingLength && word.length <= lineLength || word.length > lineLength && remainingLength < 3) {
            wrapped = wrapped.concat("\n");
            currentLineLength = 0;
            remainingLength = lineLength - currentLineLength;
        }

        if (word.length > lineLength) {
            let first = "";
            let second = "";

            if (currentLineLength === 0) {
                first = word.slice(0, remainingLength - 1);
                second = word.slice(remainingLength - 1, word.length);
                wrapped = wrapped.concat(first, "-\n", second);
            } else {
                first = word.slice(0, remainingLength - 2);
                second = word.slice(remainingLength - 2, word.length);
                wrapped = wrapped.concat(" ", first, "-\n", second);
            }
            currentLineLength = second.length;
        } else {
            if (currentLineLength === 0) {
                wrapped = wrapped.concat(word);
                currentLineLength += word.length;
            } else {
                wrapped = wrapped.concat(" ", word);
                currentLineLength += word.length + 1;
            }
        }
    })

    return wrapped;
}

/**
 * Prints the provided string, breaking it where necessary to ensure it does not exceed maxLength characters per line.
 * 
 * @param {string} toPrint the string to print
 * @param {number} lineLength the maximum number of characters to print per line
 */
export function logWrapped(toPrint, lineLength) {
    console.log(wrapString(toPrint, lineLength));
}

/**
 * Prints the provided string surrounded by separators.
 * 
 * @param {string} toPrint the string to print
 * @param {number} lineLength the maximum number of characters to print per line
 */
export function logSeparated(toPrint, lineLength) {
    console.log("=".repeat(lineLength));
    logWrapped(toPrint, lineLength);
    console.log("=".repeat(lineLength));
}

/**
 * Returns true if the string complies with DD/MM/YYYY date formatting and is a valid date. Returns false otherwise.
 * 
 * @param {string} date the date to validate
 */
export function isValidDateString(date) {
    const daysInMonths = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // assume 29 days in February for simplicity
    const segments = date.split("/"); // split the date into the three segments (i.e. DD, MM, YYYY)

    if (segments.length !== 3) return false; // if there are too few or too many segments something is wrong
    if (segments[0].length !== 2 || segments[1].length !== 2 || segments[2].length !== 4) return false; // if there are too few or too many digits in each segment somthing is wrong
    
    let numbers = [1];

    for (let i = 0; i < 3; i++) {
        numbers[i] = Number(segments[i]); // convert each of the segments into a number
        if (isNaN(numbers[i])) return false; // if the result isn't a number something is wrong
    }

    // if there are too many days, too many months or any of the numbers are <= 0 something is wrong
    if (numbers[1] <= 0 || numbers[1] > 12 || numbers[0] <= 0 || numbers[0] > daysInMonths[numbers[1] - 1] || numbers[2] <= 0) return false;

    return true; // date is valid
}