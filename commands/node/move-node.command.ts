import { commandManager } from '../manager';
import { useAppStore } from '@/store';
import { MoveNodeOperation } from '@/model/node/operations/move-node.operation';
import { ApiFunction } from '@/types';

export const handleMoveNode = (
  nodeId: string,
  direction: 'up' | 'down',
  api?: ApiFunction
) => {
  const { nodes } = useAppStore.getState();
  const node = nodes[nodeId];
  if (!node || !node.parentId) return;

  const parent = nodes[node.parentId];
  if (!parent) return;

  const siblings = parent.childIds;
  const oldIndex = siblings.indexOf(nodeId);

  let newIndex = oldIndex;
  if (direction === 'up') {
    newIndex = Math.max(0, oldIndex - 1);
  } else {
    newIndex = Math.min(siblings.length - 1, oldIndex + 1);
  }

  if (newIndex === oldIndex) return;

  const operation: MoveNodeOperation = {
    type: 'move_node',
    nodeId,
    oldParentId: parent.id,
    newParentId: parent.id,
    oldIndex,
    newIndex,
    isInvertible: true,
  };

  commandManager.execute(operation, api);
}; 
