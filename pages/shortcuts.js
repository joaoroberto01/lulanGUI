document.onkeydown = (event) => {
    if (!controlOrCommand(event)) return;
    
    if (event.key == 's') {
        writeFile();
    } else if (event.key == 'o') {
        openFile();
    }
    
    if (!event.shiftKey) return;
    
    if (event.key == 'r') {
        compile();
    }
    
    event.preventDefault();
}

function controlOrCommand(event) {
    if (window.navigator.platform.match("Mac")) {
        return event.metaKey;
    }
    return event.ctrlKey;
}