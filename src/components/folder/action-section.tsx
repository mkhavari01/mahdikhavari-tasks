import { toast } from 'sonner';

import { findNodePath, nameExistsInTree } from 'src/utils/func';

import { useAppSelector, useAppDispatch } from 'src/redux/hooks';
import { clearSelection } from 'src/redux/slices/selected-item-slice';
import { addFile, addFolder, removeNode, renameNode } from 'src/redux/slices/node-slice';

import { Button } from 'src/components/button';

export const ActionSection = () => {
  const dispatch = useAppDispatch();
  const selectedItemName = useAppSelector((state) => state.selectedItemSlice.selectedItemName);
  const nodes = useAppSelector((state) => state.nodesSlice.nodes);

  const handleRemoveClick = () => {
    if (selectedItemName) {
      const path = findNodePath(nodes, selectedItemName);
      if (path) {
        dispatch(removeNode(path));
        dispatch(clearSelection());
      }
    } else {
      toast.warning('select the item you wanna remove');
    }
  };

  const handleAddNodeClick = (type: 'file' | 'folder') => {
    const name = prompt(`Enter ${type} name:`);
    if (!name) return;

    // duplicate check
    if (nameExistsInTree(nodes, name)) {
      toast.warning(`A file or folder with this name already exists`);
      return;
    }

    if (selectedItemName) {
      const path = findNodePath(nodes, selectedItemName);
      if (path) {
        const { isFolder } = path.reduce(
          (acc, name2) => {
            if (!acc.isFolder) return acc;
            const currentNode = acc.currentNodes.find((node) => node.name === name2);
            if (currentNode && currentNode.nodes) {
              return { currentNodes: currentNode.nodes, isFolder: true };
            }
            return { currentNodes: [], isFolder: false };
          },
          { currentNodes: nodes, isFolder: true }
        );

        // If a folder is selected, add inside; if a file, add as sibling
        const addPath = isFolder ? path : path.slice(0, -1);
        addPath.reduce(
          (acc, name3) => acc?.find((node) => node.name === name3)?.nodes || [],
          nodes
        );

        if (type === 'file') {
          dispatch(addFile({ path: addPath, fileName: name }));
        } else {
          dispatch(addFolder({ path: addPath, folderName: name }));
        }
        return;
      }
    }

    // No item selected, add to root
    if (type === 'file') {
      dispatch(addFile({ path: [], fileName: name }));
    } else {
      dispatch(addFolder({ path: [], folderName: name }));
    }
  };

  const handleRenameClick = () => {
    if (!selectedItemName) {
      toast.warning('Select the item you want to rename');
      return;
    }

    const newName = prompt('Enter new name:');
    if (!newName || newName === selectedItemName) return;

    // Check for duplicates in the entire tree
    if (nameExistsInTree(nodes, newName)) {
      toast.warning('A file or folder with this name already exists');
      return;
    }

    const path = findNodePath(nodes, selectedItemName);
    if (!path) {
      toast.warning('Unable to find the selected item in the tree');
      return;
    }

    dispatch(renameNode({ path, newName }));
    dispatch(clearSelection());
  };

  return (
    <div className="flex items-center justify-between px-5 sm:justify-start sm:gap-x-4 flex-wrap gap-y-3">
      <Button onClick={() => handleAddNodeClick('folder')}>Add folder</Button>
      <Button onClick={() => handleAddNodeClick('file')}>Add File</Button>
      <Button onClick={handleRemoveClick}>Remove</Button>
      <Button onClick={handleRenameClick}>Rename</Button>
    </div>
  );
};
