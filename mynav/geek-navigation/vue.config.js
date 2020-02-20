let path = require('path')


function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: './boxlib/',
	outputDir: "dist",
	assetsDir: "static",
	
    chainWebpack: config => {
        config.resolve.alias
            .set('images', resolve('src/assets/img/'))
            .set('styles', resolve('src/assets/styles/'))
    },
	/* 生产环境的source map */
	    productionSourceMap: true,
	    integrity: false,
	    configureWebpack: {
	        resolve: {
	            alias: {
	                'assets': '@/assets',
	                'components': '@/components',
	                'views': '@/views',
	            }
	        }
	    },
    css: {
        loaderOptions: {
            sass: {
                // @/ is an alias to src/
                // so this assumes you have a file named `src/variables.scss`
                data: `@import "@/assets/styles/style.scss";`
            }

        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true
            },

        }
    }
}