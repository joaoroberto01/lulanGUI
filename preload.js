const fs = require ('fs');
const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('fileManager', {
    open: () => ipcRenderer.invoke('dialog:open'),

    read: (path) => {
        return fs.readFileSync(path, {encoding: 'utf-8'})
    },

    write: (path, content) => {

        return fs.writeFileSync(path, content);
    }
})



