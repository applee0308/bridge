var path = require('path');
var Webpack = require('webpack');

var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'dist');
var mainPath = path.resolve(__dirname, 'src', 'index.js');

var config = {

    // Makes sure errors in console map to the correct file and line number
    devtool: 'eval',
    entry: [
        // Our application
        mainPath
    ],
    output: {
        // We need to give Webpack a path. It does not actually need it,
        // because files are kept in memory in webpack-dev-server, but an
        // error will occur if nothing is specified. We use the buildPath
        // as that points to where the files will eventually be bundled
        // in production
        path: buildPath,
        filename: 'bundle.js',

        // Everything related to Webpack should go through a build path,
        // localhost:3000/build. That makes proxying easier to handle
        publicPath: '/build/'
    },
    module: {
        loaders: [
            // Using the babel-core babel-loader
            // babel-preset-es2015 as it gives you
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: [nodeModulesPath],
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};

module.exports = config;
