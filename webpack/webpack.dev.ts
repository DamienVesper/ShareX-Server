import merge from 'webpack-merge';

import common from './webpack.common';

const config = merge(common, {
    mode: `development`,
    devtool: `source-map`
});

export default config;
