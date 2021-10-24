/**
 * Generate a random string.
 * @param length The length of the string.
 */
const randomString = (length: number): string => {
    const chars = `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`;

    let text = ``;
    for (let i = 0; i < length; i++) text += chars[Math.floor(Math.random() * chars.length)];

    return text;
};

export default randomString;
