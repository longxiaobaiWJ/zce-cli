import { cursorTo, clearScreenDown } from 'readline'
import { Instance } from 'chalk'
import redent from 'redent'
import ora, { Ora } from 'ora'

// Disable colors output for testing
// chalk.level = process.env.NODE_ENV !== 'test'
export const chalk = new Instance({
  // level: process.env.NODE_ENV === 'test' ? 0 : 3
})

/**
 * Writes a normal message.
 * @param message The message to show.
 */
export const log = (message?: unknown, ...optionalParams: unknown[]): void => {
  console.log(message, ...optionalParams)
}

/**
 * Writes a normal information message.
 * This is the default type you should use.
 * @param message The message to show.
 */
export const info = (message?: unknown, ...optionalParams: unknown[]): void => {
  log(chalk.reset(message), ...optionalParams)
}

/**
 * Writes a success message.
 * When something is successful.  Use sparingly.
 * @param message The message to show.
 */
export const success = (message?: unknown, ...optionalParams: unknown[]): void => {
  log(chalk.green(message), ...optionalParams)
}

/**
 * Writes a warning message.
 * This is when the user might not be getting what they're expecting.
 * @param message The message to show.
 */
export const warn = (message?: unknown, ...optionalParams: unknown[]): void => {
  log(chalk.yellow(message), ...optionalParams)
}

/**
 * Writes an error message.
 * This is when something horribly goes wrong.
 * @param message The message to show.
 */
export const error = (message?: unknown, ...optionalParams: unknown[]): void => {
  log(chalk.red(message), ...optionalParams)
}

/**
 * Writes a debug message.
 * This is for devs only.
 * @param message The message to show.
 */
export const debug = (message: unknown, title = 'DEBUG'): void => {
  log(chalk.magenta(`↓↓↓ --------------------[ ${title} ]-------------------- ↓↓↓`))
  log(message)
  log(chalk.magenta(`↑↑↑ --------------------[ ${title} ]-------------------- ↑↑↑`))
}

/**
 * Pad `input` to `width`.
 * @param input input text
 * @param width width
 */
export const pad = (input: string, width: number): string => {
  const len = Math.max(0, width - input.length)
  return input + Array(len + 1).join(' ')
}

/**
 * Table message.
 * @param obj indent text
 * @param size indent size
 */
export const table = (obj: Record<string, unknown>, minCels = 20): string => {
  const keys = Object.keys(obj)
  minCels = Math.max(minCels, ...keys.map(k => k.length))
  return keys.map(k => `${pad(k, minCels)} ${obj[k]}`).join('\n')
}

/**
 * Indent message.
 * @param input indent text
 * @param size indent size
 */
export const indent = (input: string, size = 2): string => {
  return redent(input, size)
}

/**
 * Print a blank line.
 */
export const newline = (): void => {
  log('')
}

/**
 * Prints a divider line
 */
export const divider = (): void => {
  log(
    chalk.gray('--------------------------------------------------------------------------------')
  )
}

/**
 * Clear console.
 * @param title Default title
 */
export const clear = (title?: string): void => {
  if (!process.stdout.isTTY) return
  const blank = '\n'.repeat(process.stdout.rows || 30)
  log(blank)
  cursorTo(process.stdout, 0, 0)
  clearScreenDown(process.stdout)
  title && log(title)
}

/**
 * Creates a spinner and starts it up.
 * @param options The text for the spinner or an ora options.
 * @returns The Ora spinner.
 */
export const spin = (options: string | Record<string, unknown> = ''): Ora => {
  return ora(options).start()
}