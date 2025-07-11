import { useAppStore } from '@/store';
import {
  NodeOperation,
  invertNodeOperation,
} from '@/model';

export class CommandManager {
  private history: NodeOperation[] = [];
  private redoStack: NodeOperation[] = []; // 用于存放重做操作的栈

  public async execute(
    operation: NodeOperation,
    api?: (op: NodeOperation) => Promise<any>
  ) {
    // 只有可逆的操作才能被添加到历史记录中，用于撤销/重做
    if (!operation.isInvertible) {
      useAppStore.getState().applyOperation(operation);
      // 不可逆的操作会清空历史记录
      this.history = [];
      this.redoStack = [];
      return;
    }

    const { applyOperation } = useAppStore.getState();

    // 1. 乐观更新：立即在UI上应用操作
    applyOperation(operation);

    // 2. API 调用
    if (api) {
      try {
        await api(operation);
        // API 成功，将操作计入历史
        this.history.push(operation);
        this.redoStack = []; // 任何新的操作都会清空重做栈
      } catch (error) {
        // 3. 回滚：API失败，应用反向操作来回滚UI状态
        console.error('API调用失败，正在回滚:', error);
        const inverseOperation = invertNodeOperation(operation);
        applyOperation(inverseOperation);
      }
    } else {
      // 没有API调用，直接计入历史
      this.history.push(operation);
      this.redoStack = [];
    }
  }

  public undo() {
    const { applyOperation } = useAppStore.getState();
    const lastOperation = this.history.pop();
    if (!lastOperation) return;

    const inverseOperation = invertNodeOperation(lastOperation);
    applyOperation(inverseOperation);
    this.redoStack.push(lastOperation);
  }

  public redo() {
    const { applyOperation } = useAppStore.getState();
    const lastOperation = this.redoStack.pop();
    if (!lastOperation) return;

    applyOperation(lastOperation);
    this.history.push(lastOperation);
  }

  public canUndo(): boolean {
    return this.history.length > 0;
  }

  public canRedo(): boolean {
    return this.redoStack.length > 0;
  }
}

export const commandManager = new CommandManager(); 
