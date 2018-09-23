# rollup-plugin-theo

Transform [Design Tokens](https://github.com/salesforce-ux/theo#overview) files using Theo.

## Installation

```bash
npm install --save-dev rollup-plugin-theo
```

## Usage

```js
import theo from 'rollup-plugin-theo';

export default {
	//...
	plugins: [
		theo({
			input: "./path/to/tokens.yml",
			output: "./path/to/tokens.css",
			format: "custom-properties.css"
		})
	]
};
```

See the [list of formats](https://github.com/salesforce-ux/theo#formats) available.

Feel free to raise an issue if something is working quite right or if you have some suggestions to make it better.
