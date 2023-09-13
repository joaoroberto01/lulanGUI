const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');

const nativeImage = require('electron').nativeImage;

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: nativeImage.createFromPath(path.join(__dirname, 'app.png')),
        autoHideMenuBar: true,
        
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('pages/main.html')
}

app.whenReady().then(() => {
    createWindow();

    ipcMain.handle('dialog:open', async () => {
        const { canceled, filePaths } = await dialog.showOpenDialog()
        if (!canceled) {
            return filePaths[0];
        }
    });
})