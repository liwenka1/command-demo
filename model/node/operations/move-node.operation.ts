export type MoveNodeOperation = {
  type: 'move_node';
  nodeId: string;
  oldParentId: string | null;
  oldIndex: number;
  newParentId: string | null;
  newIndex: number;
  isInvertible: true;
}; 