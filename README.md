# rollup-plugin-theo

Transform [Design Tokens](https://github.com/salesforce-ux/theo#overview) files using Theo.

```js
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

Feel free to raise an issue if something is working quite right and help is welcomed.
