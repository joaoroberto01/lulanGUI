
document.querySelector('#filePicker').addEventListener('click', async (event) => {
   const filePath = await window.fileManager.open();
   console.log(filePath);
});
