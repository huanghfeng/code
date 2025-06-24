export default class TestPlugin {
    apply(compiler) {
        compiler.hooks.done.tap('TestPlugin', (stats) => {
            console.log("webpack构建完成");
        })
    }
}