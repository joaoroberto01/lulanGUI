const errorLog = document.querySelector('.error-log');
const messageLog = document.querySelector('.message-log');
const pathIndicator = document.getElementById('path-indicator');

let filePath;
let editor;
async function openFile() {
   filePath = await window.fileManager.open();
   if (!filePath) return;

   pathIndicator.innerText = filePath;

   const content = await window.fileManager.read(filePath);
   console.log(content);

   editor.getModel().setValue(content);
}

async function writeFile() {
   if (!editor) return;

   const content = editor.getModel().getValue();

   filePath = await window.fileManager.write(filePath, content);
   pathIndicator.innerText = filePath;
}

async function compile() {
   if (!filePath || !editor) return;
   await writeFile();

   const result = await window.compiler.compile(filePath);
   messageLog.innerText = result.message;
   errorLog.innerText = result.error;
}

function onEditorReady(monacoEditor) {
   const options = {
      //autoIndent: 'full',
      //contextmenu: true,
      //fontFamily: 'monospace',
      fontSize: 13,
      //lineHeight: 24,
      hideCursorInOverviewRuler: true,
      matchBrackets: 'always',
      minimap: {
         enabled: true,
      },
      scrollbar: {
         horizontalSliderSize: 4,
         verticalSliderSize: 18,
      },
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: 'line',
      automaticLayout: true,
      language: 'lulang',
      theme: 'lulang-ptheme'
   };

   editor = monacoEditor.create(document.getElementById('editor'), options);
}
