import { handlers } from './handlers';
import { setupWorker } from 'msw';

const initMocks = () => {
  try {
    const worker = setupWorker(...handlers);
    return worker.start();
  } catch (e) {
    if (import.meta.env.DEV) {
      console.error(`Failed to start worker. Error is : ${e}`);
    }
    return false;
  }
};

export { initMocks };
