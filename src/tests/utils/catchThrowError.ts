export default async function catchThrowError(fn: Function) {
  try {
    await fn();
  } catch(error) {
    return error;
  }
}