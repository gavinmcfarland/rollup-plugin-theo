import fs from 'fs'
import theoModule from 'theo'

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
)

const isWatching =
	process.argv.includes('-w') || process.argv.includes('--watch')

function convertTokens(input, output, format) {
	theoModule
		.convert({
			transform: {
				type: 'web',
				file: input
			},
			format: {
				type: format
			}
		})
		.then(filecontent => {
			fs.writeFile(output, filecontent, err => {
				if (err) throw err
			})
		})
		.catch(error => console.log(`Something went wrong: ${error}`))
}

export default function theo(opts = {}) {
	if (!opts.input || !opts.output) {
		if (!opts.output.file || !opts.output.format) {
			throw Error('Input, output and format option must be specified')
		}
	}

	return {
		name: 'theo',
		generateBundle() {
			convertTokens(opts.input, opts.output.file, opts.output.format)
			if (isWatching) {
				fs.watch(opts.input, { recursive: true }, () => {
					convertTokens(
						opts.input,
						opts.output.file,
						opts.output.format
					)
				})
			}
		}
	}
}
