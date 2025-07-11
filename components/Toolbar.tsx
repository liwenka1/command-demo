"use client";

import {
  Plus,
  Trash2,
  Undo,
  Redo,
  FilePenLine,
  ThumbsUp,
  ThumbsDown,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppStore } from '@/store';
import {
  handleAddNode,
  handleDeleteNode,
  handleUpdateNodeName,
  handleMoveNode,
} from '@/commands/node';
import { commandManager } from '@/commands/manager';
import { useState, useEffect } from 'react';
import { mockSuccessApi, mockFailureApi } from '@/api';

type ApiFunction = (op: any) => Promise<any>;

export const Toolbar = () => {
  const { selectedNodeId, nodes } = useAppStore();
  const [canUndo, setCanUndo] = useState(commandManager.canUndo());
  const [canRedo, setCanRedo] = useState(commandManager.canRedo());
  
  // Dialog state
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [nodeName, setNodeName] = useState('');
  const [updateApi, setUpdateApi] = useState<ApiFunction | undefined>(undefined);

  useEffect(() => {
    const updateButtons = () => {
      setCanUndo(commandManager.canUndo());
      setCanRedo(commandManager.canRedo());
    };
    return useAppStore.subscribe(updateButtons);
  }, []);
  
  // Sync node name for dialog input
  useEffect(() => {
    if (selectedNodeId && nodes[selectedNodeId]) {
      setNodeName(nodes[selectedNodeId].name);
    }
  }, [selectedNodeId, nodes]);

  const onUpdateTrigger = (api: ApiFunction) => {
    setUpdateApi(() => api);
    setUpdateDialogOpen(true);
  };
  
  const onUpdateConfirm = () => {
    if (selectedNodeId && nodeName) {
      handleUpdateNodeName(selectedNodeId, nodeName, updateApi);
    }
    setUpdateDialogOpen(false);
  };

  const onMove = (direction: 'up' | 'down', api: ApiFunction) => {
    if (selectedNodeId) {
      handleMoveNode(selectedNodeId, direction, api);
    }
  };

  const isNodeSelected = !!selectedNodeId;
  const canMove = isNodeSelected && selectedNodeId !== 'root';

  return (
    <div className="p-2 border-b space-y-4">
      {/* Undo/Redo Section */}
      <div className="flex items-center space-x-2">
        <span className="font-semibold w-32">历史记录:</span>
        <Button onClick={() => commandManager.undo()} disabled={!canUndo} variant="outline" size="sm">
          <Undo className="h-4 w-4 mr-2" />
          撤销
        </Button>
        <Button onClick={() => commandManager.redo()} disabled={!canRedo} variant="outline" size="sm">
          <Redo className="h-4 w-4 mr-2" />
          重做
        </Button>
      </div>

      {/* API Success Section */}
      <div className="flex items-center space-x-2 flex-wrap gap-2">
        <span className="font-semibold w-32 flex items-center text-green-600">
          <ThumbsUp className="h-4 w-4 mr-2" />
          API 成功
        </span>
        <Button onClick={() => handleAddNode(selectedNodeId!, mockSuccessApi)} disabled={!isNodeSelected} variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          添加
        </Button>
        <Button onClick={() => handleDeleteNode(selectedNodeId!, mockSuccessApi)} disabled={!isNodeSelected} variant="outline" size="sm">
          <Trash2 className="h-4 w-4 mr-2" />
          删除
        </Button>
        <Button onClick={() => onUpdateTrigger(mockSuccessApi)} disabled={!isNodeSelected} variant="outline" size="sm">
          <FilePenLine className="h-4 w-4 mr-2" />
          更新
        </Button>
        <Button onClick={() => onMove('up', mockSuccessApi)} disabled={!canMove} variant="outline" size="sm">
          <ArrowUp className="h-4 w-4 mr-2" />
          上移
        </Button>
        <Button onClick={() => onMove('down', mockSuccessApi)} disabled={!canMove} variant="outline" size="sm">
          <ArrowDown className="h-4 w-4 mr-2" />
          下移
        </Button>
      </div>

      {/* API Failure Section */}
      <div className="flex items-center space-x-2 flex-wrap gap-2">
        <span className="font-semibold w-32 flex items-center text-red-600">
          <ThumbsDown className="h-4 w-4 mr-2" />
          API 失败
        </span>
        <Button onClick={() => handleAddNode(selectedNodeId!, mockFailureApi)} disabled={!isNodeSelected} variant="destructive" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          添加
        </Button>
        <Button onClick={() => handleDeleteNode(selectedNodeId!, mockFailureApi)} disabled={!isNodeSelected} variant="destructive" size="sm">
          <Trash2 className="h-4 w-4 mr-2" />
          删除
        </Button>
        <Button onClick={() => onUpdateTrigger(mockFailureApi)} disabled={!isNodeSelected} variant="destructive" size="sm">
          <FilePenLine className="h-4 w-4 mr-2" />
          更新
        </Button>
        <Button onClick={() => onMove('up', mockFailureApi)} disabled={!canMove} variant="destructive" size="sm">
          <ArrowUp className="h-4 w-4 mr-2" />
          上移
        </Button>
        <Button onClick={() => onMove('down', mockFailureApi)} disabled={!canMove} variant="destructive" size="sm">
          <ArrowDown className="h-4 w-4 mr-2" />
          下移
        </Button>
      </div>
      
      {/* Update Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>更新节点名称</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="node-name" className="text-right">
                名称
              </Label>
              <Input
                id="node-name"
                value={nodeName}
                onChange={(e) => setNodeName(e.target.value)}
                className="col-span-3"
                onKeyDown={(e) => e.key === 'Enter' && onUpdateConfirm()}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={onUpdateConfirm}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
