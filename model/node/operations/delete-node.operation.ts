import { TreeNode } from '../node-types';

export type DeleteNodeOperation = {
  type: 'delete_node';
  node: TreeNode;
  index: number;
  isInvertible: true;
}; 