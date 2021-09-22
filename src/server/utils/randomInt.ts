/**
 * Generate a random integer.
 * @param min The minimum amount specified for the range.
 * @param max The maximum amount specified for the range.
 */
const randomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min)) + min;

export default randomInt;
