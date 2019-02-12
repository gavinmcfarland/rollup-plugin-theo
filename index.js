import fs from "fs";
import theoModule from "theo";

theoModule.registerFormat(
  'custom-values.css',
  `{{#each props as |prop|}}
  {{#if prop.comment~}}
  {{{trimLeft (indent (comment (trim prop.comment)))}}}
  {{/if~}}
@value {{{prop.name}}} {
	value: {{#eq prop.type "string"}}"{{/eq}}{{{prop.value}}}{{#eq prop.type "string"}}"{{/eq}};
}
	{{/each}}
`
);

function convertTokens(input, output, format) {
	theoModule
		.convert({
			transform: {
				type: "web",
				file: input
			},
			format: {
				type: format
			}
		})
		.then(filecontent => {
			// $button-background: rgb(0, 112, 210);
			fs.writeFile(output, filecontent, err => {
				if (err) throw err;

				// console.log("The file was succesfully saved!");
			});
		})
		.catch(error => console.log(`Something went wrong: ${error}`));
}

export default function theo(opts = {}) {
	if (!opts.input || !opts.output || !opts.format) {
	  throw Error("Input, output and format option must be specified");
	}

	// const filter = createFilter(opts.include, opts.exclude);

	return {
		name: "theo",
		generateBundle() {
			convertTokens(opts.input + "/index.yml", opts.output, opts.format);
			fs.watch(opts.input, {recursive:true}, () => {
				convertTokens(opts.input + "/index.yml", opts.output, opts.format);
			});
		}
	};
}
