import { sniff, run, file } from './core'

// check the node version
sniff()

console.log(file.tildify)

// // Prevent caching of this module so module.parent is always accurate
// delete require.cache[__filename]
// global['parentDir'] = module.parent ? dirname(module.parent.filename) : ''

export { run }