const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin"); //最新版本copy-webpack-plugin插件暂不兼容，推荐v5.0.0

let filePath = "";
let Timestamp = "";
//编译环境判断,判断是否H5环境
if (process.env.UNI_PLATFORM === "h5") {
	filePath = "static/js/"; //打包文件存放文件夹路径
	Timestamp = "." + new Date().getTime(); //时间戳
}

module.exports = {
	productionSourceMap: false, // 生产打包时不输出map文件，增加打包速度
	configureWebpack: {
		output: {
			// 输出重构  打包编译后的 文件目录 文件名称 【模块名称.时间戳】
			filename: `${filePath}[name]${Timestamp}.js`,
			chunkFilename: `${filePath}[name]${Timestamp}.js`,
		},
		plugins: [
			// 自定义分包静态资源目录
			new CopyWebpackPlugin([{
				from: path.join(__dirname, "/static_sub"),
				to: path.join(
					__dirname + "/unpackage/",
					"dist",
					process.env.NODE_ENV === "production" ? "build" : "dev",
					process.env.UNI_PLATFORM,
					"/"
				),
			}, ]),
		],
	},
};
