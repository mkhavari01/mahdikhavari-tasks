import type { Node } from 'src/types/type';
import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

interface NodesState {
  nodes: Node[];
}

const initialState: NodesState = {
  nodes: [
    {
      name: 'Home',
      nodes: [{ name: '1.txt' }, { name: '2', nodes: [] }],
    },
    { name: 'ReadMe.txt' },
  ],
};

const removeNodeRecursively = (nodes: Node[], path: string[]): Node[] => {
  if (path.length === 1) {
    return nodes.filter((node) => node.name !== path[0]);
  }

  return nodes.map((node) => {
    if (node.name === path[0] && node.nodes) {
      return {
        ...node,
        nodes: removeNodeRecursively(node.nodes, path.slice(1)),
      };
    }
    return node;
  });
};

const addNodeInPath = (nodes: Node[], path: string[], newNode: Node, isFolder: boolean): Node[] => {
  if (path.length === 0) {
    return [newNode, ...nodes]; // Add newNode at the beginning of the array
  }

  return nodes.map((node) => {
    if (node.name === path[0]) {
      if (path.length === 1 && node.nodes) {
        return { ...node, nodes: [newNode, ...(node.nodes || [])] }; // Add newNode at the start
      }
      // Continue traversing deeper
      return {
        ...node,
        nodes: addNodeInPath(node.nodes || [], path.slice(1), newNode, isFolder),
      };
    }
    return node;
  });
};

const renameNodeInPath = (nodes: Node[], path: string[], newName: string): Node[] =>
  nodes.map((node) => {
    if (node.name === path[0]) {
      if (path.length === 1) {
        return { ...node, name: newName };
      }
      if (node.nodes) {
        return { ...node, nodes: renameNodeInPath(node.nodes, path.slice(1), newName) };
      }
    }
    return node;
  });

const nodesSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    removeNode: (state, action: PayloadAction<string[]>) => {
      const path = action.payload;
      state.nodes = removeNodeRecursively(state.nodes, path);
    },
    addFile: (state, action: PayloadAction<{ path: string[]; fileName: string }>) => {
      const { path, fileName } = action.payload;
      const newFile = { name: fileName }; // Files don't have nodes
      state.nodes = addNodeInPath(state.nodes, path, newFile, false);
    },
    addFolder: (state, action: PayloadAction<{ path: string[]; folderName: string }>) => {
      const { path, folderName } = action.payload;
      const newFolder = { name: folderName, nodes: [] }; // Folders have an empty node array
      state.nodes = addNodeInPath(state.nodes, path, newFolder, true);
    },
    renameNode: (state, action: PayloadAction<{ path: string[]; newName: string }>) => {
      const { path, newName } = action.payload;
      state.nodes = renameNodeInPath(state.nodes, path, newName);
    },
  },
});

export const { removeNode, addFile, addFolder, renameNode } = nodesSlice.actions;
export default nodesSlice.reducer;
