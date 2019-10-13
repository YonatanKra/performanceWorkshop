const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    plugins: [
        // create our index.html to view our app in the browser
        new HtmlWebpackPlugin({
            title: 'Your Killer App!'
        })
    ],
    module: {
        rules: [
            // use the html loader
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: {loader: 'html-loader'}
            },
            // use the css loaders (first load the css, then inject the style)
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
};
