export const createImgSrc = (
  originalSrc: string,
  prefix = '/blog-ssg-nextjs',
  suffix = '',
) => {
  return `${prefix}${originalSrc}${suffix}`;
};
