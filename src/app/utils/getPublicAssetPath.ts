export function getPublicAssetPath(path: string) {
  const prefix = process.env.NODE_ENV === 'production' ? '/clide' : '';
  return `${prefix}${path}`;
} 