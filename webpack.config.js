const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    plugins: [
        // use the clean plugin to delete the dist folder before a build
        new CleanWebpackPlugin(['dist']),
        // create our index.html to view our app in the browser
        new HtmlWebpackPlugin({
            title: 'Your Phrase Fireworks!'
        })
    ],
};
