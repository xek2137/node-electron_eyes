'use strict';

const path = require('path');
const {app, BrowserWindow} = require('electron');

function main() {

  let mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 480,
    height: 640,
    frame: false,
  })

  mainWindow.loadFile(path.join('app', 'index.html'));
  /* For DevTools */
  // mainWindow.webContents.openDevTools();
}

app.on('ready', main);

app.on('window-all-closed', function() {
  app.quit();
});