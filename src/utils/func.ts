import type { Node, TemperatureUnit } from 'src/types/type';

export const findNodePath = (
  nodes: Node[],
  targetName: string,
  path: string[] = []
): string[] | null => {
  let foundPath: string[] | null = null;

  nodes.some((node) => {
    const currentPath = [...path, node.name];
    if (node.name === targetName) {
      foundPath = currentPath;
      return true;
    }
    if (node.nodes) {
      foundPath = findNodePath(node.nodes, targetName, currentPath);
      return foundPath !== null;
    }
    return false;
  });

  return foundPath;
};

export const nameExistsInTree = (nodes: Node[], name: string): boolean =>
  nodes.some((node) => {
    if (node.name === name) return true;
    if (node.nodes) {
      return nameExistsInTree(node.nodes, name); // Recursive check in subdirectories
    }
    return false;
  });

export const formatTemperature = (temp: number, unit: TemperatureUnit) =>
  (unit === 'F' ? (temp * 9) / 5 + 32 : temp).toFixed(1);
