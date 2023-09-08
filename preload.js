const fs = require ('fs');
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('fileManager', {
    read: (path) => {
        return fs.readFileSync(path, {encoding: 'utf-8'})
    },

    write: (path, content) => {

        return fs.writeFileSync(path, content);
    }
})



