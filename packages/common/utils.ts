import process from 'node:process'

const symbols = {
  start: '◐',
  success: '✔',
  info: 'ℹ',
} as const

type SymbolType = keyof typeof symbols

function init(symbol: SymbolType, open: number, close: number = 39) {
  return (message: string) => {
    const newlines = message.match(/^(\n*)/)?.[0]
    const trimmedMessage = message.slice(newlines?.length)

    return `${newlines}\u001B[${open}m${symbols[symbol]}\u001B[${close}m ${trimmedMessage}`
  }
}

type LogFn = (message: string) => string

const log: Record<SymbolType, LogFn> = {
  start: init('start', 35),
  success: init('success', 32),
  info: init('info', 36),
}

interface CursorPos { rows: string, cols: string }

async function getCursorPos(): Promise<CursorPos | undefined> {
  const termcodes = { cursorGetPosition: '\u001B[6n' }

  return new Promise((resolve) => {
    process.stdin.setEncoding('utf8')
    process.stdin.setRawMode(true)

    const readfx = () => {
      const buf = process.stdin.read()
      const str = JSON.stringify(buf) // "\u001b[9;1R"
      const regex = /\[(.*)/g
      const xy = regex.exec(str)?.[0].replace(/\[|R\"/g, '').split(';')

      let pos: CursorPos | undefined

      if (xy)
        pos = { rows: xy[0]!, cols: xy[1]! }

      process.stdin.setRawMode(false)
      resolve(pos)
    }

    process.stdin.once('readable', readfx)
    process.stdout.write(termcodes.cursorGetPosition)
  })
}

export type { SymbolType, LogFn }
export { log, getCursorPos }
