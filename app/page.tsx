'use client';

import { Toolbar } from '@/components/Toolbar';
import { TreeView } from '@/components/tree/TreeView';

const Home = () => {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">命令模式演示</h1>
      <div className="border rounded-lg shadow-lg">
        <Toolbar />
        <TreeView />
      </div>
    </main>
  );
};

export default Home;
