import { WritableDraft } from 'immer';
import { TreeState } from '../node-types';
import { UpdateNodeOperation } from '../operations/update-node.operation';

export function updateNodeTransform(
  draft: WritableDraft<TreeState>,
  op: UpdateNodeOperation
): void {
  const { nodeId, updates } = op;
  const node = draft.nodes[nodeId];
  if (node) {
    Object.assign(node, updates);
  }
} 