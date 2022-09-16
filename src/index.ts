
/**
 * @param {Function | Promise} promise - Promise function to resolve.
 * @returns {Promise<[Error, undefined]|[null, object]>} Promise - Promise function to resolve.
 */
export async function tryCatch<T>(
  promise: (() => Promise<T>) | Promise<T> | (() => T),
  finallyFunction:()=>{} = null, throwIfError = false,
): Promise<[T, undefined] | [undefined, Error]> {
  if(typeof promise !== "function") 
    return [undefined, new Error("")]; // Throw specific error
  
  return promise
    .then((result) => {
      return [result, null];
    })
    .catch((error) => {
      if (throwIfError === true) {
        throw error;
      }
      return [null, error];
    })
    .finally(() => {
      if (finallyFunction !== null) {
        if (typeof finallyFunction === 'function') {
          finallyFunction();
        }
      }
    });
};


/**
 * @param {Function | Promise} promise - Promise function to resolve.
 * @returns {Promise<[Error, undefined]|[null, object]>} Promise - Promise function to resolve.
 */
export async function tryCatchSync<T>(f: () => T, ...params, finallyFunction:()=>{} = null, throwIfError = false,
): [T, undefined] | [undefined, Error]> {
  if(typeof f !== "function") 
    return [undefined, new Error("")]; // Throw specific error
  
 try {
    const result = f(params);
    return [result, undefined];
  } catch (error: unknown) {
    return [undefined, error as Error];
  }
};
