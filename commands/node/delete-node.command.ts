import { commandManager } from '../manager';
import { useAppStore } from '@/store';
import { DeleteNodeOperation } from '@/model/node/operations/delete-node.operation';
import { ApiFunction } from '@/types';

export const handleDeleteNode = (nodeId: string, api?: ApiFunction) => {
  const { nodes } = useAppStore.getState();
  const nodeToDelete = nodes[nodeId];
  if (!nodeToDelete || !nodeToDelete.parentId) return;

  const parentNode = nodes[nodeToDelete.parentId];
  if (!parentNode) return;

  const operation: DeleteNodeOperation = {
    type: 'delete_node',
    node: nodeToDelete,
    index: parentNode.childIds.indexOf(nodeId),
    isInvertible: true,
  };
  commandManager.execute(operation, api);
}; 