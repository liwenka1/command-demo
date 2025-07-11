'use client';

import { useAppStore } from '@/store';
import { TreeNodeComponent } from './TreeNodeComponent';

export const TreeView = () => {
  const { rootIds } = useAppStore();

  return (
    <div className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-800">
      {rootIds.map((nodeId) => (
        <TreeNodeComponent key={nodeId} nodeId={nodeId} />
      ))}
    </div>
  );
}; 
