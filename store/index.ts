import { create } from 'zustand';
import { TreeState, TreeNode } from '@/model/node/node-types';
import { NodeTransforms } from '@/model/node/transforms';
import { NodeOperation } from '@/model/node/operations';


// 初始数据，采用扁平化结构
const initialNodes: { [id: string]: TreeNode } = {
  'root': { id: 'root', name: 'Root', parentId: null, childIds: ['1', '2'] },
  '1': { id: '1', name: 'Child 1', parentId: 'root', childIds: ['3'] },
  '2': { id: '2', name: 'Child 2', parentId: 'root', childIds: [] },
  '3': { id: '3', name: 'Child 1.1', parentId: '1', childIds: [] },
};

const initialTreeState: TreeState = {
  nodes: initialNodes,
  rootIds: ['root'],
  selectedNodeId: null,
};


interface AppState extends TreeState {
  // 这个 action 将会是所有命令修改状态的唯一入口
  applyOperation: (op: NodeOperation) => void;
  setSelectedNodeId: (id: string | null) => void;
}


export const useAppStore = create<AppState>((set) => ({
  ...initialTreeState,
  
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),

  applyOperation: (op) => {
    set((state) => NodeTransforms.apply(state, op));
  },
})); 
