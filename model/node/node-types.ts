// model/node/node-types.ts

/**
 * 树节点的定义，为扁平化数据结构设计。
 */
export interface TreeNode {
  id: string;
  name: string;
  parentId: string | null; // 指向父节点的ID，根节点为 null
  childIds: string[];    // 只存储子节点的ID数组
}

/**
 * 整个树状态的定义。
 */
export interface TreeState {
  nodes: { [id: string]: TreeNode }; // 节点字典，用于 O(1) 复杂度的查找
  rootIds: string[]; // 根节点 ID 列表
  selectedNodeId: string | null;
} 
