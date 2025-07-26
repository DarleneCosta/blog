import { POST_SIMULATE_DELAY_MS } from '@/lib/posts/constants';
import { logColor } from './log-color';

export async function asyncDelay({
  ms = POST_SIMULATE_DELAY_MS,
  verbose = false,
}: {
  ms?: number;
  verbose?: boolean;
}) {
  if (ms <= 0) {
    return;
  }
  if (verbose) {
    logColor('asyncDelay', `${ms / 1000}s`);
  }
  await new Promise(resolve => setTimeout(resolve, ms));
}
