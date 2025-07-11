import { WritableDraft } from 'immer';
import { TreeState } from '../node-types';
import { DeleteNodeOperation } from '../operations/delete-node.operation';

export function deleteNodeTransform(
  draft: WritableDraft<TreeState>,
  op: DeleteNodeOperation
): void {
  const { node } = op;
  
  // 软删除：不再从 `nodes` 字典中递归删除节点数据，
  // 只是从其父节点的 childIds 列表中移除，从而在UI上“隐藏”它。
  // 这样可以确保在回滚（即重新添加）时，所有子节点的数据仍然存在，可以被一并恢复。
  if (node.parentId) {
    const parent = draft.nodes[node.parentId];
    if (parent) {
      parent.childIds = parent.childIds.filter((id: string) => id !== node.id);
    }
  } else {
    // 如果是根节点，则从 rootIds 中移除
    draft.rootIds = draft.rootIds.filter((id: string) => id !== node.id);
  }
} 
