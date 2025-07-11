import { NodeOperation } from '@/model';

/**
 * 全局API函数类型定义。
 * @param op 节点操作
 * @returns 一个解析为任意值的 Promise
 */
export type ApiFunction = (op: NodeOperation) => Promise<any>; 