import { setupWorker } from 'msw/browser';
import { mswHandler } from './handlers/index';
export const mockInBrowser = setupWorker(...mswHandler);
