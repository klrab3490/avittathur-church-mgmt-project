/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import connectToMongoDB from '../database/dbConfig';
import SpecialFormModel from '../database/models/Forms/specialFormModel';
import NormalFormModel from '../database/models/Forms/normalFormModel';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

ipcMain.on('connect-to-mongodb', async (event) => {
  try {
    await connectToMongoDB();
    event.reply('connect-to-mongodb', 'success');
  } catch (error) {
    event.reply('connect-to-mongodb', 'error');
  }
});

ipcMain.on('insert-special-form', async (event, formData) => {
  try {
    console.log('Inserting form data:', formData);
    const specialForm = new SpecialFormModel(formData);
    await specialForm.save();
    event.reply('insert-special-form', 'Form data saved successfully');
  } catch (error) {
    console.error('Error inserting form data:', error);
    event.reply(
      'insert-special-form',
      'An error occurred while inserting form data',
    );
  }
});

ipcMain.on('get-normal-form-invoice-number', async (event) => {
  try {
    const latestInvoice = await NormalFormModel.findOne({ formType: 'invoice' })
      .sort({ _id: -1 })
      .select('invoice')
      .exec();
    // If an invoice exists, return its number
    if (latestInvoice && latestInvoice.invoice) {
      event.reply('get-invoice-number', latestInvoice.invoice);
    } else {
      // If no invoice exists, send null
      const invoice = '0000';
      event.reply('get-invoice-number', invoice);
    }
  } catch (error) {
    // If an error occurs, log the error and send an error message back to the renderer process
    console.error('Error fetching previous invoice number:', error);
    event.reply(
      'get-invoice-number-error',
      'An error occurred while fetching the invoice number',
    );
  }
});

ipcMain.on('insert-normal-form', async (event, formData) => {
  try {
    console.log('Inserting form data:', formData);
    const normalForm = new NormalFormModel(formData);
    await normalForm.save();
    event.reply('insert-normal-form', 'Form data saved successfully');
  } catch (error) {
    console.error('Error inserting form data:', error);
    event.reply(
      'insert-normal-form',
      'An error occurred while inserting form data',
    );
  }
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1920,
    height: 1080,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
