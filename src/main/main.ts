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
import AccountBookModel from '../database/models/Acoount/accountBook';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

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
    const Amount = formData.amount;
    const proportions = {
      vicar: (Amount * 11) / 20,
      kapaya: (Amount * 3) / 20,
      choir: (Amount * 3) / 20,
      alter: (Amount * 1) / 20,
      chruch: (Amount * 2) / 20,
    };

    const total = Object.values(proportions).reduce(
      (sum, value) => sum + value,
      0,
    );
    const accountBook = new AccountBookModel({
      ...proportions,
      total,
      // eslint-disable-next-line no-underscore-dangle
      formId: specialForm._id,
    });
    await specialForm.save();
    await accountBook.save();
    event.reply('insert-special-form', 'Form data saved successfully');
  } catch (error) {
    console.error('Error inserting form data:', error);
    event.reply(
      'insert-special-form',
      'An error occurred while inserting form data',
    );
  }
});

ipcMain.on('fetch-special-form-invoice', async (event) => {
  try {
    // Query the database to fetch the latest inserted form data
    const latestFormDataSP = await SpecialFormModel.findOne()
      .sort({ _id: -1 })
      .select('invoice')
      .exec();
    console.log('Special Form Last Invoice Number :', latestFormDataSP);
    if (latestFormDataSP) {
      event.reply('fetch-special-form-invoice', {
        success: true,
        data: latestFormDataSP.invoice,
      });
    } else {
      event.reply('fetch-special-form-invoice', {
        success: false,
        message: 'No data found',
      });
    }
  } catch (error) {
    console.error('Error fetching latest form data:', error);
    event.reply('fetch-special-form-invoice', {
      success: false,
      message: 'An error occurred while fetching data',
    });
  }
});

ipcMain.on('fetch-special-form-data', async (event) => {
  try {
    let specialFormData = await SpecialFormModel.find().exec();

    // Convert ObjectId to string
    specialFormData = specialFormData.map((doc) => {
      const document = doc.toObject();
      // eslint-disable-next-line no-underscore-dangle
      document._id = parseInt(document._id, 10);
      return document;
    });

    console.log('Data: ', specialFormData);
    if (specialFormData) {
      event.reply('fetch-special-form-data', {
        success: true,
        data: specialFormData,
      });
    } else {
      event.reply('fetch-special-form-data', {
        success: false,
        message: 'No data found',
      });
    }
  } catch (error) {
    console.error('Error fetching special form data:', error);
    event.reply('fetch-special-form-data', {
      success: false,
      message: 'An error occurred while fetching data',
    });
  }
});

ipcMain.on('insert-normal-form', async (event, formData) => {
  try {
    console.log('Inserting form data:', formData);
    const normalForm = new NormalFormModel(formData);
    const Amount = formData.amount;
    const proportions = {
      vicar: (Amount * 11) / 20,
      kapaya: (Amount * 3) / 20,
      choir: (Amount * 3) / 20,
      alter: (Amount * 1) / 20,
      chruch: (Amount * 2) / 20,
    };

    const total = Object.values(proportions).reduce(
      (sum, value) => sum + value,
      0,
    );
    const accountBook = new AccountBookModel({
      ...proportions,
      total,
      // eslint-disable-next-line no-underscore-dangle
      formId: normalForm._id,
    });
    await normalForm.save();
    await accountBook.save();
    event.reply('insert-normal-form', 'Form data saved successfully');
  } catch (error) {
    console.error('Error inserting form data:', error);
    event.reply(
      'insert-normal-form',
      'An error occurred while inserting form data',
    );
  }
});

ipcMain.on('fetch-normal-form-invoice', async (event) => {
  try {
    // Query the database to fetch the last inserted form data invoice number
    const latestFormDataNF = await NormalFormModel.findOne()
      .sort({ _id: -1 })
      .select('invoice')
      .exec();
    console.log('Normal Form Last Invoice Number :', latestFormDataNF);
    if (latestFormDataNF) {
      event.reply('fetch-normal-form-invoice', {
        success: true,
        data: latestFormDataNF.invoice,
      });
    } else {
      event.reply('fetch-normal-form-invoice', {
        success: false,
        message: 'No data found',
      });
    }
  } catch (error) {
    console.error('Error fetching latest form data:', error);
    event.reply('fetch-normal-form-invoice', {
      success: false,
      message: 'An error occurred while fetching data',
    });
  }
});

ipcMain.on('fetch-normal-form-data', async (event) => {
  try {
    let normalFormData = await NormalFormModel.find().exec();

    // Convert ObjectId to string
    normalFormData = normalFormData.map((doc) => {
      const document = doc.toObject();
      // eslint-disable-next-line no-underscore-dangle
      document._id = parseInt(document._id, 10);
      return document;
    });

    console.log('Data: ', normalFormData);
    if (normalFormData) {
      event.reply('fetch-normal-form-data', {
        success: true,
        data: normalFormData,
      });
    } else {
      event.reply('fetch-normal-form-data', {
        success: false,
        message: 'No data found',
      });
    }
  } catch (error) {
    console.error('Error fetching special form data:', error);
    event.reply('fetch-normal-form-data', {
      success: false,
      message: 'An error occurred while fetching data',
    });
  }
});

ipcMain.on('fetch-account-book-data', async (event) => {
  try {
    let accountBookData = await AccountBookModel.find().exec();

    // Convert ObjectId to string
    accountBookData = accountBookData.map((doc) => {
      const document = doc.toObject();
      // eslint-disable-next-line no-underscore-dangle
      document._id = parseInt(document._id, 10);
      return document;
    });

    console.log('Data: ', accountBookData);
    if (accountBookData) {
      event.reply('fetch-account-book-data', {
        success: true,
        data: accountBookData,
      });
    } else {
      event.reply('fetch-account-book-data', {
        success: false,
        message: 'No data found',
      });
    }
  } catch (error) {
    console.error('Error fetching account book data:', error);
    event.reply('fetch-account-book-data', {
      success: false,
      message: 'An error occurred while fetching data',
    });
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
