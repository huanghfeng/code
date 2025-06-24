import TestPlugin from './plugin.js';
export default {
    mode: 'development',
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /nodule_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // plugins: ["@babel/plugin-transform-arrow-functions"]
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.txt$/,
                use: {
                    loader: './txt-loader.js'
                }
            }
        ]
    },
    plugins: [new TestPlugin()]
}