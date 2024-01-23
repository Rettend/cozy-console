import process from 'node:process'
import { Console } from 'node:console'
import { type LogFn, log } from '../../common/utils'

export class CozyConsoleMini extends Console {
  private lastLineLength = 0

  start(message: string) {
    if (this.lastLineLength > 0)
      process.stdout.write('\n')

    process.stdout.write(log.start(message))
    this.lastLineLength = message.length
  }

  success(message: string) {
    this.clearPrev(log.success, message)
  }

  override info(message: string) {
    this.clearPrev(log.info, message)
  }

  private clearPrev(fn: LogFn, message: string) {
    if (this.lastLineLength === 0) {
      process.stdout.write(fn(message))
    }
    else {
      process.stdout.write(`\r`)
      process.stdout.write(fn(message))
      process.stdout.write(`${' '.repeat(Math.max(this.lastLineLength - message.length, 0))}\n`)
      this.lastLineLength = 0
    }
  }
}

export const cozy = new CozyConsoleMini(process.stdout, process.stderr)
