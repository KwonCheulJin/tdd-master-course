import { setupServer } from 'msw/node';
import { mswHandler } from './handlers/index';

export const mockInNode = setupServer(...mswHandler);
