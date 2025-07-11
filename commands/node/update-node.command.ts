import { commandManager } from '../manager';
import { useAppStore } from '@/store';
import { UpdateNodeOperation } from '@/model/node/operations/update-node.operation';
import { ApiFunction } from '@/types';

export const handleUpdateNodeName = (
  nodeId: string,
  newName: string,
  api?: ApiFunction
) => {
  const { nodes } = useAppStore.getState();
  const nodeToUpdate = nodes[nodeId];
  if (!nodeToUpdate) return;

  const operation: UpdateNodeOperation = {
    type: 'update_node',
    nodeId: nodeId,
    updates: { name: newName },
    previousState: { name: nodeToUpdate.name },
    isInvertible: true,
  };
  commandManager.execute(operation, api);
}; 