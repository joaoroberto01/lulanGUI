const { app, BrowserWindow } = require('electron');
const path = require('path');

const nativeImage = require('electron').nativeImage

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: nativeImage.createFromPath(path.join(__dirname, 'app.png'))
    })

    win.loadFile('pages/main.html')
}

app.whenReady().then(() => {
    createWindow()
})