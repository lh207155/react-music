const { app, BrowserWindow } = require("electron");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1440,
    height: 810,
    // frame: false,
    // titleBarStyle: "hidden",
  });
  win.loadURL("http://192.168.0.102:5173/");
};

app.whenReady().then(() => {
  console.log("123");
  createWindow();
});
