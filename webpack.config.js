/**
 * 
 *  https://webpack.js.org/configuration/
 * 
 *  Webpack是用于现代JavaScript应用程序的模块绑定器。
 * 
 *  当Webpack处理您的应用程序时，它递归地构建一个包含应用程序所需的每个模块的依赖关系图，然后将所有这些模块都打包成一小部分（通常只有一个），由浏览器加载。
 * 
 * 
 */

var path = require("path")
var webpack = require("webpack")


var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {

    /**
     *  Webpack创建了所有应用程序依赖关系的图形。
     * 
     *  该图的起始点被称为入口点。
     * 
     *  该入口点通知的WebPack 从哪里开始，并遵循相关性的图表知道捆绑什么。
     * 
     *  可以将应用程序的入口点视为上下文根或第一个启动应用程序的文件。
     *  
     *  一般来说对于每个HTML文档，只使用一个入口点。
     * 
     *  entry: string|Array<string>
     */
    entry: {
        /**
         *  程序入口
         */
        index: ['./src/index.js'],
        /**
         * 第三方库
         */
        vendors: ['babel-polyfill', 'history', 'lodash', 'react', 'react-dom', 'react-redux', 'react-router', 'react-router-dom', 'react-router-redux', 'redux', 'redux-oidc'],
    },

    /**
     * 将所有资源打包在一起后，需要告诉Webpack在何处构建应用程序。
     */
    output: {
        /**
         *  打包后文件目录（绝对路径）
         */
        path: path.join(__dirname, './dist'),
        /**
         *  打包后文件名
         */
        filename: 'js/[name]-[hash:5].bundle.js',
        /**
         *  项目发布时打包文件引用地址
         */
        publicPath: '/',
        /**
         *  按需加载时，模块文件输出名称
         */
        chunkFilename: 'js/[name]-[hash:5].bundle.js',
    },

    /**
     *  目标是让您的项目中的所有资源都是webpack的关注点，而不是浏览器。（这并不意味着他们都必须打包在一起）。webpack将每个文件（.css，.html，.scss，.jpg等）视为一个模块。
     * 
     *  但是，webpack 只能理解JavaScript。
     *
     *  Webpack中的装载器将这些文件转换成模块，因为它们被添加到依赖关系图中。
     *
     *  在高级应用中，它们在您的webpack配置中有两个目的。
     *
     *      确定某个装载程序应该转换哪些文件。（test）
     *
     *      转换该文件，以便它可以添加到您的依赖关系图（最终是您的包）。（use）
     * 
     *  例如 { test: /\.txt$/, use: 'raw-loader' } 这告诉webpack的编译器如下：
     * 
     *  “嘿webpack编译器，当你遇到一个'.txt' 文件在一个 require()/ import 语句中，在打包之前使用 raw-loader 来转换它”。
     */
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "less-loader"
                }]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }]
    },
    /**
     * 当发生JavaScript异常时，通常会想知道什么文件和行生成此错误。由于Webpack将文件输出到一个或多个bundle中，因此可能不方便跟踪文件。
     * 
     * 使用 source-map 可以解决这个问题
     */
    // devtool: "cheap-eval-source-map",

    /**
     * webpack-dev-server 可用于快速开发应用程序
     * 
     * 下面是webpack-dev-server（简称：dev-server）行为的选项。
     * 
     */
    devServer: {
        /**
         *  打包的文件将在此路径下的浏览器中可用。
         * 
         *  假设服务器正在运行http://localhost:8080 output.filename 设置为 bundle.js。 默认情况下publicPath是"/"，所以你的包可用http://localhost:8080/bundle.js。
         * 
         *  该publicPath是可以改变的，因此包放在一个目录：
         */
        publicPath: "/",
        /**
         *  告诉服务器从哪里提供内容。只有当您要提供静态文件时，才需要这样做。devServer.publicPath将用于确定捆绑包应从何处提供，并优先。
         * 
         *  默认情况下，它将使用您当前的工作目录来提供内容，但您可以将其修改为另一个目录。
         * 
         *  请注意，建议使用绝对路径。
         */
        contentBase: path.join(__dirname, "dist"),
        /**
         *  实时刷新
         */
        hot: true,
        /**
         *  代理
         */
        proxy: {
            "/api": {
                target: "http://square.x-dva.com",
                secure: false
            }
        },
        /**
         * 指定一个端口号以侦听请求
         */
        port: 8989
    },
    /**
     *  由于加载程序仅在每个文件的基础上执行转换，plugins最常用（但不限于）对打包模块的“编译”或“块”执行操作和自定义功能（以及更多）。
     * 
     *  Webpack插件系统非常强大，可定制。
     * 
     *  为了使用插件，您只需要require()它并将其添加到plugins数组。
     * 
     *  大多数插件可通过选项进行自定义。
     * 
     *  由于可以在配置中多次使用相同插件进行不同的目的，因此需要通过调用 new 创建一个实例。
     * 
     */
    plugins: [
        /**
         *  单独打包css文件
         */
        new ExtractTextPlugin("css/index.css"),
        /**
         *  发布前清空发布文件夹
         */
        new CleanWebpackPlugin(['dist'], {
            root: '',           // An absolute path for the root  of webpack.config.js
            verbose: true,      // Write logs to console.
            dry: false          // Do not delete anything, good for testing.
        }),
        /**
         *  修改文件时自动更新
         */
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         NODE_ENV: JSON.stringify('production')
        //     }
        // }),
        // new webpack.optimize.UglifyJsPlugin(),
        /**
         *  自动配置html页面
         */
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['vendors', 'index'],
            /**
             *  inject: true | 'head' | 'body' | false Inject all assets into the given template or templateContent - When passing true or 'body' all javascript resources will be placed at the bottom of the body element. 
             * 
             *  'head' will place the scripts in the head element.
             */
            inject: 'body',
            /**
             *  js文件排序
             */
            chunksSortMode: function (chunk1, chunk2) {
                var order = ['vendors', 'index'];
                var order1 = order.indexOf(chunk1.names[0]);
                var order2 = order.indexOf(chunk2.names[0]);
                return order1 - order2;
            },
        }),
        /**y
         *  自动打开浏览器
         */
        new OpenBrowserPlugin({
            url: 'http://localhost:8989/index.html#/'
        })
    ]
}

