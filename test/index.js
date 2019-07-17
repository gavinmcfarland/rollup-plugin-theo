import assert from 'assert'
import { rollup } from 'rollup'
import theo from '../'

process.chdir('test')

function makeBundle(options, theoOptions) {
	options.plugins = [theo(theoOptions)]
	return rollup(options)
}

describe('rollup-plugin-theo', () => {
	it('should output tokens.css', () => {
		return makeBundle(
			{ input: 'basic/basic.js' },
			{
				input: 'basic/index.yml',
				output: {
					file: 'basic/tokens.css',
					format: 'custom-properties.css'
				}
			}
		).then(bundle => {
			bundle.generate({ format: 'iife' })
			assert.ok(bundle)
		})
	})
})
