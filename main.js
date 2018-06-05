const electron = require('electron');
const path = require('path');

const {app, BrowserWindow, Menu, Tray} = electron;

let mainWin
let tray

app.on("ready",function(){
    tray = new Tray(path.join(__dirname,"icon.png"))
    const contextMenu = Menu.buildFromTemplate([
        {
            label:'Quit',
            click(){
                app.quit();
            }
        }
    ])
    tray.setToolTip("Gmail Desktop Client");
    tray.setContextMenu(contextMenu);

    const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
    mainWin = new BrowserWindow(
        {
            width:360,
            height:640,
            x:width-420,
            y:height-640,
            resizable:false,
            movable:false,
            minimizable:false,
            maximizable:false,
            skipTaskbar:true,
            title:"Gmail",
            icon:path.join(__dirname,"icon.png"),
            show:false
        }
    )
    mainWin.loadURL("https://mail.google.com/mail/mu");

    mainWin.once("ready-to-show",function(){
        mainWin.show();
    })

    mainWin.on("close",function(){
        app.quit();
    })

    tray.on('click',function(){
        mainWin.isVisible() ? mainWin.hide() : mainWin.show()
    })

    mainWin.setMenu(null);
})