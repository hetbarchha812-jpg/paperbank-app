const { app, BrowserWindow, shell, Menu } = require('electron');
const path = require('path');

const SITE_URL = 'https://paperbank.freehosting.dev/';
const SITE_HOST = 'paperbank.freehosting.dev';
const SPLASH_MIN_MS = 2500;   // splash ketla millisecond batavvi
const SPLASH_MAX_MS = 10000;  // site dhimi hoy to pan aatli var pachi hatavvi

let win, splash;

function createWindow() {
  Menu.setApplicationMenu(null);

  splash = new BrowserWindow({
    width: 420, height: 320, frame: false, resizable: false,
    alwaysOnTop: true, center: true, backgroundColor: '#ffffff'
  });
  splash.loadFile(path.join(__dirname, 'splash.html'));

  win = new BrowserWindow({
    width: 1280, height: 800, show: false, autoHideMenuBar: true,
    title: 'PaperBank',
    webPreferences: { contextIsolation: true, nodeIntegration: false }
  });

  let loaded = false, minPassed = false;
  const reveal = () => {
    if (!(loaded && minPassed)) return;
    if (splash && !splash.isDestroyed()) splash.close();
    if (!win.isVisible()) { win.maximize(); win.show(); }
  };

  setTimeout(() => { minPassed = true; reveal(); }, SPLASH_MIN_MS);
  setTimeout(() => { loaded = true; minPassed = true; reveal(); }, SPLASH_MAX_MS);

  win.webContents.on('did-finish-load', () => { loaded = true; reveal(); });
  win.webContents.on('did-fail-load', (e, code, desc, url, isMainFrame) => {
    if (!isMainFrame || code === -3) return;
    loaded = true;
    win.loadFile(path.join(__dirname, 'offline.html'));
    reveal();
  });

  win.webContents.setWindowOpenHandler(({ url }) => {
    try { if (new URL(url).host === SITE_HOST) return { action: 'allow' }; } catch (e) {}
    shell.openExternal(url);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (e, url) => {
    try {
      const u = new URL(url);
      if (u.protocol.startsWith('http') && u.host !== SITE_HOST) {
        e.preventDefault();
        shell.openExternal(url);
      }
    } catch (err) {}
  });

  win.loadURL(SITE_URL);
}

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (win) { if (win.isMinimized()) win.restore(); win.focus(); }
  });
  app.whenReady().then(createWindow);
}
app.on('window-all-closed', () => app.quit());
