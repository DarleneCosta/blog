import { logColor } from './log-color';

const simulateWaitInMs = Number(process.env.SIMULATE_WAIT_IN_MS) || 0;

export async function asyncDelay(ms = simulateWaitInMs, verbose = false) {
  if (ms <= 0) {
    return;
  }
  if (verbose) {
    logColor('asyncDelay', `${ms / 1000}s`);
  }
  await new Promise(resolve => setTimeout(resolve, ms));
}
