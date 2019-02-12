import babel from 'rollup-plugin-babel';

var pkg = require('./package.json');

export default {
	input: 'index.js',
	plugins: [babel()],
	output: [
		{
			format: 'cjs',
			dest: pkg['main']
		},
		{
			format: 'es',
			dest: pkg['jsnext:main']
		}
	]
};
