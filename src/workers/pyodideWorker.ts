// Classic (non-module) worker so we can use importScripts to pull Pyodide
// straight from a CDN — no bundler config needed, and the wasm/data assets
// resolve relative to indexURL instead of our own origin.
declare function importScripts(...urls: string[]): void
declare function loadPyodide(config: { indexURL: string }): Promise<any>

const PYODIDE_VERSION = '0.26.4'
const PYODIDE_CDN = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`

let pyodideInstance: any = null
let pyodideLoading: Promise<any> | null = null

function ensurePyodide(): Promise<any> {
  if (pyodideInstance) return Promise.resolve(pyodideInstance)
  if (!pyodideLoading) {
    pyodideLoading = (async () => {
      importScripts(`${PYODIDE_CDN}pyodide.js`)
      const pyodide = await loadPyodide({ indexURL: PYODIDE_CDN })
      pyodideInstance = pyodide
      return pyodide
    })()
  }
  return pyodideLoading
}

type IncomingMessage =
  | { id: string; type: 'init' }
  | { id: string; type: 'run'; harness: string }

;(self as any).onmessage = async (e: MessageEvent) => {
  const msg = e.data as IncomingMessage

  if (msg.type === 'init') {
    try {
      await ensurePyodide()
      ;(self as any).postMessage({ id: msg.id, type: 'ready' })
    } catch (err) {
      ;(self as any).postMessage({ id: msg.id, type: 'error', error: String(err) })
    }
    return
  }

  if (msg.type === 'run') {
    try {
      const pyodide = await ensurePyodide()
      const resultJson = await pyodide.runPythonAsync(msg.harness)
      ;(self as any).postMessage({ id: msg.id, type: 'result', data: resultJson })
    } catch (err) {
      ;(self as any).postMessage({ id: msg.id, type: 'error', error: String(err) })
    }
  }
}
