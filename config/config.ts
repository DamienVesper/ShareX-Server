import { name, version } from '../package.json';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import * as dotenv from 'dotenv';
dotenv.config();

interface Args {
    port: number
}

const argv = (yargs(hideBin(process.argv)).options({
    port: { type: `number`, default: 8080 }
}).argv as Args);

const config = {
    name,

    port: argv.port,
    domain: `i.alru.ga`,

    version
};

export default config;
