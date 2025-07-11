import { commandManager } from '../manager';
import { useAppStore } from '@/store';
import { AddNodeOperation } from '@/model/node/operations/add-node.operation';
import { v4 as uuidv4 } from 'uuid';
import { ApiFunction } from '@/types';

export const handleAddNode = (parentId: string, api?: ApiFunction) => {
  const { nodes } = useAppStore.getState();
  const parentNode = nodes[parentId];
  if (!parentNode) return;

  const newNode = {
    id: uuidv4(),
    name: '新节点',
    parentId: parentId,
    childIds: [],
  };

  const operation: AddNodeOperation = {
    type: 'add_node',
    node: newNode,
    index: parentNode.childIds.length,
    isInvertible: true,
  };
  commandManager.execute(operation, api);
}; 
