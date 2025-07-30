import slugify from 'slugify';
import { makeRandomString } from './make-random-string';

export function makeSlug(value: string) {
  const result = slugify(value, {
    lower: true,
    strict: true,
    trim: true,
  });
  return `${result}-${makeRandomString()}`;
}
