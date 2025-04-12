/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The built directory structure
     *
     * ```tree
     * ├─┬─┬ dist
     * │ │ └── index.html
     * │ │
     * │ ├─┬ dist-electron
     * │ │ ├── main.js
     * │ │ └── preload.js
     * │
     * ```
     */
    APP_ROOT: string
    /** /dist/ or /public/ */
    VITE_PUBLIC: string
  }
}

// Used in Renderer process, expose in `preload.ts`
interface Window {
  ipcRenderer: import('electron').IpcRenderer & {
    checkForUpdates: () => Promise<{
      updateAvailable: boolean;
      version?: string;
      releaseNotes?: string;
      error?: string;
    }>;
    downloadUpdate: () => Promise<{
      success: boolean;
      downloadedPath?: string;
      error?: string;
    }>;
    installUpdate: () => void;
    getAppVersion: () => Promise<string>;
  }
}
