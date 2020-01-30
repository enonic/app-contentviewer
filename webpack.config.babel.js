import path from 'path';
const SRC_DIR = 'src/main/resources';
const DST_DIR = 'build/resources/main';
const SRC_ASSETS_DIR = path.join(__dirname, SRC_DIR, 'assets');
const DST_ASSETS_DIR = path.join(__dirname, DST_DIR, 'assets');
const isProd = false;

module.exports = {
    context: SRC_ASSETS_DIR,
    entry: ['./js/contentviewer.js'],
    output: {
        path: DST_ASSETS_DIR,
        filename: './js/bundle.js',
        publicPath: DST_ASSETS_DIR
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : 'source-map'
};
