const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  publicPath: "/",
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    historyApiFallback: true
  },
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        components: "@/components",
        views: "@/views",
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                appendTsSuffixTo: [/\.vue$/]
              }
            }
          ],
          exclude: /node_modules/
        }
      ]
    }
  }
})