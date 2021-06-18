import * as path from 'path';

import * as Webpack from 'webpack';
import * as WebpackDevServer from 'webpack-dev-server';

interface Configuration extends Webpack.Configuration {
    devServer?: WebpackDevServer.Configuration
}

const config: Configuration = {
    entry: `./src/client/index.js`,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: `ts-loader`,
                        options: {
                            transpileOnly: true,
                            experimentalWatchApi: true
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: `babel-loader`,
                options: { presets: [`@babel/env`] }
            },
            {
                test: /\.css$/,
                use: [`style-loader`, `css-loader`]
            }
        ]
    },

    resolve: {
        extensions: [`*`, `.js`, `.jsx`, `.ts`, `.tsx`]
    },

    output: {
        path: path.resolve(__dirname, `dist`),
        publicPath: `/dist`,
        filename: `bundle.min.js`
    },

    devServer: {
        contentBase: path.resolve(__dirname, `public`),
        port: 3000,
        publicPath: `http://localhost:3000/dist`,
        hotOnly: true
    },

    plugins: [new Webpack.HotModuleReplacementPlugin()]
};

export default config;
