import { WritableDraft } from 'immer';
import { TreeState, TreeNode } from '../node-types';
import { AddNodeOperation } from '../operations/add-node.operation';

export function addNodeTransform(
  draft: WritableDraft<TreeState>,
  op: AddNodeOperation
): void {
  const { node, index } = op;
  draft.nodes[node.id] = node as WritableDraft<TreeNode>;
  if (node.parentId) {
    const parentNode = draft.nodes[node.parentId];
    if (parentNode) {
      parentNode.childIds.splice(index, 0, node.id);
    }
  } else {
    draft.rootIds.splice(index, 0, node.id);
  }
} 