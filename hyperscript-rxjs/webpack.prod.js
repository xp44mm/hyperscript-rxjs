const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'production',

    externals: [
        function rxjsExternals({ request }, callback) {
            const root = request.split('/')
            if (root[0] === 'rxjs') {
                return callback(null, {
                    commonjs: request,
                    commonjs2: request,
                    amd: request,
                    root,
                })
            } else { callback() }
        },
    ],

    output: {
        filename: 'hyperscript-rxjs.js',
        library: 'hyperscriptRxjs',
        libraryTarget: 'umd',
        globalObject: 'this',
    },
})
