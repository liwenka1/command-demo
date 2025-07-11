'use client';

import { useAppStore } from '@/store';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight, File } from 'lucide-react';
import React, { useState } from 'react';

interface TreeNodeComponentProps {
  nodeId: string;
}

export const TreeNodeComponent = ({ nodeId }: TreeNodeComponentProps) => {
  const { nodes, selectedNodeId, setSelectedNodeId } = useAppStore();
  const node = nodes[nodeId];
  
  const [isOpen, setIsOpen] = useState(true);

  if (!node) {
    return null; // 如果节点不存在，则不渲染任何内容
  }

  const isSelected = selectedNodeId === node.id;
  const hasChildren = node.childIds && node.childIds.length > 0;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedNodeId(node.id);
  };

  return (
    <div className="pl-4">
      <div
        className={cn(
          'flex items-center p-1 cursor-pointer rounded-md hover:bg-gray-200 dark:hover:bg-gray-700',
          isSelected && 'bg-blue-200 dark:bg-blue-800'
        )}
        onClick={handleSelect}
      >
        <span onClick={handleToggle} className="pr-1">
          {hasChildren ? (
            isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />
          ) : (
            <File size={16} className="text-gray-500" />
          )}
        </span>
        <span>{node.name}</span>
      </div>
      {isOpen && hasChildren && (
        <div>
          {node.childIds.map((childId) => (
            <TreeNodeComponent key={childId} nodeId={childId} />
          ))}
        </div>
      )}
    </div>
  );
}; 