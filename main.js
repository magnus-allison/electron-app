const electron = require('electron');
const path = require('path');
const url = require('url');

const {app, BrowserWindow} = electron;

let mainWindow;

// Listen for app to be ready
app.on('ready', function(){
  // Create new window
  mainWindow = new BrowserWindow({width: 932, height: 740});
  // Load html in window
  mainWindow.setResizable(false);
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes:true
  }));
    
  // Quit app when closed
  mainWindow.on('closed', function(){
    app.quit();
  });

});