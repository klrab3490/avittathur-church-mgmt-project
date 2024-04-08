// preload.ts

import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

// Define the valid channels that can be accessed from the renderer process
export type Channels =
  | 'ipc-example'
  | 'connect-to-mongodb'
  | 'insert-special-form'
  | 'fetch-special-form-invoice'
  | 'fetch-special-form-data'
  | 'insert-normal-form'
  | 'fetch-normal-form-invoice';

// Define the electronHandler object
const electronHandler = {
  ipcRenderer: {
    // Send message through IPC channel
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    // Listen to messages from IPC channel
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    // Listen to only one message from IPC channel
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    // Connect to MongoDB
    connectToMongoDB: () => {
      ipcRenderer.send('connect-to-mongodb');
    },
    // Insert special form
    insertSpecialForm: (formData: unknown) => {
      ipcRenderer.send('insert-special-form', formData);
    },
    // Fetch last invoice number from special form
    fetchSpecialFormInvoice: () => {
      ipcRenderer.send('fetch-special-form-invoice');
    },
    fetchSpecialFormData: () => {
      ipcRenderer.send('fetch-special-form-data');
    },
    // Insert normal form
    insertNormalForm: (FormData: unknown) => {
      ipcRenderer.send('insert-normal-form', FormData);
    },
    // Fetch last invoice number from normal form
    fetchNormalFormInvoice: () => {
      ipcRenderer.send('fetch-normal-form-invoice');
    },
  },
};

// Expose the electronHandler object to the window object of the renderer process
contextBridge.exposeInMainWorld('electron', electronHandler);

// Define a type for the electronHandler object
export type ElectronHandler = typeof electronHandler;
