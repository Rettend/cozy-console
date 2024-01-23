// -----------------------------------------------------------------------------
// ------------------------------- NOT WORKING ---------------------------------
// -----------------------------------------------------------------------------
// the terminal gets weird when the cursor is at the bottom of the screen
// i tried rendering just one line or the all of them, but it doesn't work

import process from 'node:process'
import readline from 'node:readline'
import { Console } from 'node:console'
import { type SymbolType, getCursorPos, log } from '../../common/utils'

interface ConsoleEntry { message: string, type: SymbolType }

export class CozyConsole extends Console {
  private entries = new Map<number, ConsoleEntry>()
  private startLine: number | undefined
  private scrolledLines = 0

  async getId() {
    const pos = await getCursorPos()
    return pos ? Number(pos.rows) : 0
  }

  async start(message: string) {
    let id = await this.getId()

    if (!this.startLine)
      this.startLine = id
    else if (!this.scrolledLines)
      id--

    this.entries.set(id, { message, type: 'start' })
    this.render(true)

    return id
  }

  success = this.createLog('success')
  override info = this.createLog('info')

  private createLog(type: SymbolType) {
    return (message: string, id: number) => {
      const entry = this.entries.get(id - this.scrolledLines)

      if (entry) {
        entry.message = message
        entry.type = type
        this.render(false)
      }
    }
  }

  private render(_scroll: boolean) {
    if (this.startLine) {
      let currentLine = this.startLine - this.scrolledLines

      readline.cursorTo(process.stdout, 0, currentLine - 1)
      readline.clearScreenDown(process.stdout)

      for (const [_, entry] of this.entries) {
        // if (process.stdout.rows === currentLine + this.scrolledLines && scroll) {
        //   this.scrolledLines++
        //   currentLine--
        //   // this.startLine--
        //   this.entries = new Map([...this.entries].map(([id, entry]) => [id - 1, entry]))
        // }

        readline.cursorTo(process.stdout, 0, currentLine)
        currentLine++

        const logFn = log[entry.type]

        process.stdout.write(logFn(`${entry.message}\n`))
        // process.stdout.write(logFn(`${entry.message} \t ${process.stdout.rows}/${currentLine} - ${this.scrolledLines}`))

        // // if it is the last entry, print debug info:
        // if (entry === [...this.entries][this.entries.size - 1]?.[1]) {
        //   process.stdout.write(', { ')
        //   const entriesArray = Array.from(this.entries, ([id, entry]) => `${id} ${entry.type}`)
        //   process.stdout.write(entriesArray.join(', '))
        //   process.stdout.write(' }\n')
        // }
        // else {
        //   process.stdout.write('\n')
        // }
      }
    }
  }
}

export const cozy = new CozyConsole(process.stdout, process.stderr)
