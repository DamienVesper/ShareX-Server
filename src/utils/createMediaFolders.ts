import * as fs from 'fs';

import log from './log';

/**
 * Create media folders, if not present already.
 */
const createMediaFolders = (): void => {
    log(`cyan`, `Checking if ShareX folders exist...`);
    if (process.platform !== `linux`) {
        log(`red`, `Media folders can only be created on Linux, aborting...`);
        return;
    }

    const mediaPath = `/var/www/sharex/i`;
    const configPath = `/var/www/sharex/configs`;

    if (!fs.existsSync(mediaPath)) {
        log(`yellow`, `Media folder does not exist, creating...`);
        fs.mkdirSync(mediaPath);
    }

    if (!fs.existsSync(configPath)) {
        log(`yellow`, `Config folder does not exist, creating...`);
        fs.mkdirSync(configPath);
    }

    log(`green`, `Finished checking all folders.`);
};

export default createMediaFolders;
