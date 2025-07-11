import { produce, WritableDraft } from 'immer';
import { TreeState } from '../node-types';
import { NodeOperation } from '../operations';

import { addNodeTransform } from './add-node.transform';
import { deleteNodeTransform } from './delete-node.transform';
import { moveNodeTransform } from './move-node.transform';
import { updateNodeTransform } from './update-node.transform';

// 1. 创建一个从操作类型到其对应转换函数的映射
const transformMap = {
  add_node: addNodeTransform,
  delete_node: deleteNodeTransform,
  move_node: moveNodeTransform,
  update_node: updateNodeTransform,
};

/**
 * 封装了所有用于修改树状态的变换逻辑。
 */
export class NodeTransforms {
  /**
   * 将一个节点操作应用到当前树状态，并返回一个新的树状态。
   * 它会根据操作类型，动态地调用正确的转换函数。
   * @param state 当前的树状态
   * @param op 要应用的节点操作
   * @returns 一个新的、经过修改的树状态
   */
  public static apply(state: TreeState, op: NodeOperation): TreeState {
    return produce(state, (draft: WritableDraft<TreeState>) => {
      // 2. 根据操作类型从映射中查找并执行转换函数
      const transform = transformMap[op.type];
      if (transform) {
        // The type assertion is safe here because the map keys are the operation types.
        (transform as any)(draft, op);
      }
    });
  }
} 