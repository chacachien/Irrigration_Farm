module.exports = function (api) {
	api.cache(true)
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					root: ['./src'],
					alias: {
						assets: './assets',
						components: './src/Components',
						'@constants': './constants',
						'@hooks': './hooks',
						'@navigation': './navigation',
						'@screens': './screens',
						'@services': './services',
						'@utils': './utils',
					},
				},
			],
		],
	}
}
