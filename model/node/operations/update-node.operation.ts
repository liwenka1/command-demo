import { TreeNode } from '../node-types';

export type UpdateNodeOperation = {
  type: 'update_node';
  nodeId: string;
  updates: Partial<TreeNode>;
  previousState: Partial<TreeNode>;
  isInvertible: true;
}; 