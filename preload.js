const fs = require ('fs');
const { contextBridge, dialog } = require('electron');


contextBridge.exposeInMainWorld('fileManager', {
    read: (path) => {
        return fs.readFileSync(path, {encoding: 'utf-8'})
    },

    write: (path, content) => {

        return fs.writeFileSync(path, content);
    }
})

contextBridge.exposeInMainWorld('filePicker', {
    open: () => {
        dialog.showOpenDialog({
            properties: ['openFile', 'multiSelections']
        }, function (files) {
            if (files !== undefined) {
                // handle files
            }
        });
    },

    
})




