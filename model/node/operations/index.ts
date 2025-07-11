import { AddNodeOperation } from './add-node.operation';
import { DeleteNodeOperation } from './delete-node.operation';
import { MoveNodeOperation } from './move-node.operation';
import { UpdateNodeOperation } from './update-node.operation';

// 1. 组合所有操作定义为一个联合类型
export type NodeOperation =
  | AddNodeOperation
  | DeleteNodeOperation
  | MoveNodeOperation
  | UpdateNodeOperation;

// 2. 提供一个集中的反转逻辑
export function invertNodeOperation(operation: NodeOperation): NodeOperation {
  switch (operation.type) {
    case 'add_node':
      return {
        type: 'delete_node',
        node: operation.node,
        index: operation.index,
        isInvertible: true,
      };
    case 'delete_node':
      return {
        type: 'add_node',
        node: operation.node,
        index: operation.index,
        isInvertible: true,
      };
    case 'update_node':
      return {
        type: 'update_node',
        nodeId: operation.nodeId,
        updates: operation.previousState,
        previousState: operation.updates,
        isInvertible: true,
      };
    case 'move_node':
      return {
        type: 'move_node',
        nodeId: operation.nodeId,
        oldParentId: operation.newParentId,
        oldIndex: operation.newIndex,
        newParentId: operation.oldParentId,
        newIndex: operation.oldIndex,
        isInvertible: true,
      };
    default:
      const exhaustiveCheck: never = operation;
      throw new Error(`未处理的操作类型: ${exhaustiveCheck}`);
  }
} 