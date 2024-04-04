// preload.ts

import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

// Define a function to handle the 'insertSpecialForm' IPC channel
const handleInsertSpecialForm = (formData: any) => {
  return ipcRenderer.invoke('insertSpecialForm', formData);
};

// Define the valid channels that can be accessed from the renderer process
export type Channels = 'ipc-example' | 'connect-to-mongodb' | 'insert-special-form';

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
    sendInsertSpecialForm(formData: any) {
      ipcRenderer.send('insert-special-form', formData);
    },
  },
};

// Expose the electronHandler object to the window object of the renderer process
contextBridge.exposeInMainWorld('electron', electronHandler);

// Define a type for the electronHandler object
export type ElectronHandler = typeof electronHandler;
