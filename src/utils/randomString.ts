import crypto from 'crypto';

/**
 * Generate a random string.
 * @param length The length of the string.
 */
const randomString = (length: number): string => crypto.randomBytes(length).toString(`hex`);

export default randomString;
