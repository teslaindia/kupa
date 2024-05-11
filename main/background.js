import path from 'path'
import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (isProd) {
    await mainWindow.loadURL('app://./login')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/login`)
    // mainWindow.webContents.openDevTools()
  }
})()

var shemOved = "";
var kupa = [];

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`)
})

ipcMain.on('hithabrut', async (event, arg) => {
  shemOved = arg;
})

ipcMain.on("maavarletashlum", async (event, arg) => {
  // return if arg is not an array
  if (arg?.length < 1) return;
  kupa = arg;
})

ipcMain.on("bdokpritimbakupa", async (event, arg) => {
  event.reply("pritimbakupa", kupa);
})

ipcMain.on("bituliska", async (event, arg) => {
  kupa = [];
});

ipcMain.on('hitnatkoot', async (event, arg) => {
  shemOved = "";
})

ipcMain.on('maHooShemHaOved', async (event, arg) => {
  event.reply('shemOved', shemOved);
})
