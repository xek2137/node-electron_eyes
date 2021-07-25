'use strict';

const path = require('path');
const {app, BrowserWindow} = require('electron');

function main() {

  let mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 800,
    height: 600,
  })

  mainWindow.loadFile(path.join('app', 'index.html'));
  mainWindow.webContents.openDevTools();
}

app.on('ready', main);

app.on('window-all-closed', function() {
  app.quit();
});