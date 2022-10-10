async function tryCatch<T>(
  promise: Promise<T>,
  throwIfError = false,
  finallyFunction?: () => {},
  errorFunction?: () => {},
): Promise<[T, undefined] | [undefined, unknown]> {
  if (typeof promise !== 'object') {
    return [undefined, new Error("There it's not a promise")];
  }

  try {
    const result = await promise;
    return [result, undefined];
  } catch (error) {
    if (errorFunction && typeof errorFunction === 'function') {
      errorFunction();
    }
    if (throwIfError) {
      throw error;
    }
    return [undefined, error];
  } finally {
    if (finallyFunction !== null) {
      if (typeof finallyFunction === 'function') {
        finallyFunction();
      }
    }
  }
}

async function tryCatchSync<T, U extends any[]>(
  // eslint-disable-next-line no-unused-vars
  f: (params: U) => T,
  params: U,
  throwIfError = false,
  finallyFunction?: () => {} | void,
  errorFunction?: () => {} | undefined,
): Promise<[T, undefined] | [undefined, unknown]> {
  if (typeof f !== 'function') {
    return [undefined, new Error("There it's not a function")]; // Throw specific error
  }

  try {
    const result = f(params);
    return [result, undefined];
  } catch (error: unknown) {
    if (errorFunction && typeof errorFunction === 'function') {
      errorFunction();
    }
    if (throwIfError) {
      throw error;
    }
    return [undefined, error];
  } finally {
    if (finallyFunction !== null) {
      if (typeof finallyFunction === 'function') {
        finallyFunction();
      }
    }
  }
}

export { tryCatch, tryCatchSync };
