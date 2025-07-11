import { NodeOperation } from '@/model';

const API_DELAY = 500; // 模拟API延迟

// 模拟API调用成功
export const mockSuccessApi = (operation: NodeOperation): Promise<any> => {
  return new Promise((resolve) => {
    console.log('API 调用开始: 模拟操作成功...', operation);
    setTimeout(() => {
      console.log('API 调用结束: 成功!');
      resolve({ status: 'ok' });
    }, API_DELAY);
  });
};

// 模拟API调用失败
export const mockFailureApi = (operation: NodeOperation): Promise<any> => {
  return new Promise((_, reject) => {
    console.log('API 调用开始: 模拟操作失败...', operation);
    setTimeout(() => {
      const error = new Error('API 请求按预期失败。');
      console.log('API 调用结束: 失败!', error.message);
      reject(error);
    }, API_DELAY);
  });
};
