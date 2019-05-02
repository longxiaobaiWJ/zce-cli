import { join } from 'path'
import { strings, system } from 'gluegun'
import { Toolbox } from 'gluegun/build/domain/toolbox'
import { stub } from 'sinon'

export const runCommand = async (cmd: string): Promise<string> =>
  system.run(`node ${join(__dirname, '../bin/zce.js')} ${cmd}`)

export const createFakeToolbox = (): Toolbox => {
  const toolbox = new Toolbox()
  toolbox.pluginName = 'zce'
  toolbox.meta = {
    src: join(__dirname, '../src'),
    version: stub().returns('0.1.0'),
    commandInfo: stub()
  }
  // toolbox.config = null
  toolbox.filesystem = {
    resolve: stub(),
    dir: stub(),
    chmodSync: stub(),
    rename: stub(),
    exists: stub()
  }
  // toolbox.semver = null
  // toolbox.http = null
  toolbox.parameters = { first: undefined, options: {} }
  toolbox.print = {
    info: stub(),
    warning: stub(),
    success: stub(),
    error: stub(),
    table: stub(),
    newline: stub(),
    spin: stub().returns({ stop: stub() }),
    colors: {
      red: stub().returns('red string'),
      green: stub().returns('green string'),
      blue: stub().returns('blue string'),
      yellow: stub().returns('yellow string'),
      gray: stub().returns('gray string'),
      rainbow: stub().returns('rainbow string')
    }
  }
  toolbox.prompt = {
    ask: async () => ({ answer: undefined }),
    confirm: stub(),
    separator: stub()
  }
  toolbox.strings = strings
  toolbox.system = {
    spawn: stub(),
    which: stub()
  }
  toolbox.template = {
    generate: stub()
  }
  // toolbox.patching = null
  return toolbox
}