import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// Import auto-updater module
import * as dotenv from 'dotenv';
import logger from 'electron-log';
import { autoUpdater } from 'electron-updater';
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '..', '.env') })
// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    title: "Trackhounds",
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Define the custom menu
const menuTemplate: Electron.MenuItemConstructorOptions[] = [
  {
    label: 'Help',
    submenu: [
      {
        label: 'Documentation',
        click: () => {
          if (win) {
            win.loadURL(VITE_DEV_SERVER_URL ? `${VITE_DEV_SERVER_URL}#/documentation` : `file://${path.join(RENDERER_DIST, 'index.html#/documentation')}`)
          }
        },
      },
      {
        label: 'About',
        click: () => {
          if (win) {
            win.loadURL(VITE_DEV_SERVER_URL ? `${VITE_DEV_SERVER_URL}#/about` : `file://${path.join(RENDERER_DIST, 'index.html#/about')}`)
          }
        },
      },
    ],
  },
]

// Set the custom menu
const menu = Menu.buildFromTemplate(menuTemplate)
Menu.setApplicationMenu(menu)

// Setup auto-updater
autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = false

// Force production update mode
if (app.isPackaged) {
  autoUpdater.logger = logger;
  logger.transports.file.level = "info";
  
  // This ensures the app knows it's in production mode
  process.env.NODE_ENV = 'production';
}

// Add update-related IPC handlers
ipcMain.handle('check-for-updates', async () => {
  try {
    const checkResult = await autoUpdater.checkForUpdates()
    return {
      updateAvailable: !!checkResult?.updateInfo,
      version: checkResult?.updateInfo?.version || null,
      releaseNotes: checkResult?.updateInfo?.releaseNotes || null
    }
  } catch (error) {
    console.error('Error checking for updates:', error)
    return {
      updateAvailable: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
})

ipcMain.handle('download-update', async () => {
  try {
    const downloadResult = await autoUpdater.downloadUpdate()
    return {
      success: true,
      downloadedPath: Array.isArray(downloadResult) ? downloadResult.join(', ') : null
    }
  } catch (error) {
    console.error('Error downloading update:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
})

ipcMain.on('install-update', () => {
  // This will quit and install the update
  autoUpdater.quitAndInstall(false, true)
})

ipcMain.handle('get-app-version', () => {
  return app.getVersion()
})

// Set up update event listeners
autoUpdater.on('update-available', (info) => {
  if (win) {
    win.webContents.send('update-available', info)
  }
})

autoUpdater.on('update-not-available', (info) => {
  if (win) {
    win.webContents.send('update-not-available', info)
  }
})

autoUpdater.on('download-progress', (progressInfo) => {
  if (win) {
    win.webContents.send('download-progress', progressInfo)
  }
})

autoUpdater.on('update-downloaded', (info) => {
  if (win) {
    win.webContents.send('update-downloaded', info)
  }
})

autoUpdater.on('error', (error) => {
  console.error('AutoUpdater error:', error);
  if (win) {
    win.webContents.send('update-error', error.message);
  }
});

// Force `app.isPackaged` to `true` if running from an ASAR archive
if (process.resourcesPath.includes('app.asar')) {
  Object.defineProperty(app, 'isPackaged', {
    get() {
      return true;
    },
  });
  process.env.NODE_ENV = 'production';
  console.log('Forcing app.isPackaged = true');
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)
