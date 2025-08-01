import { SIMULATE_WAIT_IN_MS } from '@/lib/constants';
import { logColor } from './log-color';

export async function asyncDelay(ms = SIMULATE_WAIT_IN_MS, verbose = false) {
  if (ms <= 0) {
    return;
  }
  if (verbose) {
    logColor('asyncDelay', `${ms / 1000}s`);
  }
  await new Promise(resolve => setTimeout(resolve, ms));
}
