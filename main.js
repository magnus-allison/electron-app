const electron = require('electron');
const path = require('path');
const url = require('url');

const {app, BrowserWindow} = electron;

let mainWindow;

// Listen for app to be ready
app.on('ready', function(){
  // Create new window
  mainWindow = new BrowserWindow({width: 870, height: 580});
  // Load html in window
  mainWindow.setResizable(false);
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'interface/index.html'),
    protocol: 'file:',
    slashes:true
  }));
    
  // Quit app when closed
  mainWindow.on('closed', function(){
    app.quit();
  });

});