import { cozy } from '../packages/cozy-console/src/index'

export {}

console.log('hello world')
const git = await cozy.start('Removing git hook from git')
await new Promise(resolve => setTimeout(resolve, 2000))
const vscode = await cozy.start(`Removing VSCode settings...`)
await new Promise(resolve => setTimeout(resolve, 2000))
const config = await cozy.start(`Removing config files...`)
// await new Promise(resolve => setTimeout(resolve, 2000))
// const pkg = await cozy.start(`Removing packages.......`)
// await new Promise(resolve => setTimeout(resolve, 2000))
// const deps = await cozy.start(`Removing dependencies...`)
// await new Promise(resolve => setTimeout(resolve, 2000))
// const files = await cozy.start(`Removing files.......`)
// await new Promise(resolve => setTimeout(resolve, 2000))
// const done = await cozy.start(`We are Done bois!!!!!`)

await new Promise(resolve => setTimeout(resolve, 2000))
cozy.info('No config files found', config)
await new Promise(resolve => setTimeout(resolve, 2000))
cozy.info(`No settings found.....`, vscode)
await new Promise(resolve => setTimeout(resolve, 2000))
cozy.success(`Removed from git.....`, git)
// await new Promise(resolve => setTimeout(resolve, 2000))
// cozy.info(`Removed dependencies...`, deps)
// await new Promise(resolve => setTimeout(resolve, 2000))
// cozy.success(`Removed files.........`, files)
// await new Promise(resolve => setTimeout(resolve, 2000))
// cozy.info(`Removed packages......`, pkg)
// await new Promise(resolve => setTimeout(resolve, 2000))
// cozy.success(`Done bois!!!!!!!!!!!!!!!`, done)
