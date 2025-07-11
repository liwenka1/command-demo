import { WritableDraft } from 'immer';
import { TreeState } from '../node-types';
import { MoveNodeOperation } from '../operations/move-node.operation';

export function moveNodeTransform(
  draft: WritableDraft<TreeState>,
  op: MoveNodeOperation
): void {
  const { nodeId, oldParentId, newParentId, newIndex } = op;

  // 确保新旧父节点是相同的
  if (oldParentId !== newParentId) {
    // 注意：在真实世界的场景中，你可能需要处理跨父节点的移动。
    // 在这个例子中，我们假设移动只在同一个父节点内发生。
    console.warn('跨父节点移动尚未实现，但操作定义允许此行为。');
  }

  const parent = draft.nodes[newParentId!];
  if (parent && parent.childIds) {
    // 1. 从旧位置移除
    const childIds = parent.childIds.filter(id => id !== nodeId);
    // 2. 插入到新位置
    childIds.splice(newIndex, 0, nodeId);
    parent.childIds = childIds;
  }
} 