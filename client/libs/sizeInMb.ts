export const sizeInMb = (bytes: number): string => {
  return `${(bytes / (1024 * 1024)).toFixed(3)} MB`;
};
