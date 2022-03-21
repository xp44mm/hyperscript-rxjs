const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',

    output: {
        filename: 'hyperscript-rxjs-test.js',
    },

})
