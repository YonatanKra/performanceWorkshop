const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const merge = require('webpack-merge'); // don't forget to install this one
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin()
    ]
});
