import { TreeNode } from '../node-types';

export type AddNodeOperation = {
  type: 'add_node';
  node: TreeNode;
  index: number;
  isInvertible: true;
}; 