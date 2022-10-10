import 'jest-extended';
import { tryCatch, tryCatchSync } from '../index';

const getDataAsyncPromise = (): Promise<number> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(5), 2000)
  })
}

const getDataSync = (value) => {
  return value + 10;
}

describe('tryCatchSync Tests', () => {
  test('get value 5', async () => {
    const response = await tryCatchSync(getDataSync, 5);
    expect(response).toIncludeAllMembers([15, undefined]);
  });
});

describe('tryCatch Tests', () => {
  test('get value 5 asynchronously', async () => {
    const response = await tryCatch<number>( getDataAsyncPromise());
    expect(response).toIncludeAllMembers([5, undefined]);
  });
});
