/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import type { Node } from 'src/types/type';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRightIcon } from '@heroicons/react/16/solid';
import { FolderIcon, DocumentIcon } from '@heroicons/react/24/solid';

import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { selectItem } from 'src/redux/slices/selected-item-slice';

export function FilesystemItem({ node }: { node: Node }) {
  const dispatch = useAppDispatch();
  const selectedItemName = useAppSelector((state) => state.selectedItemSlice.selectedItemName);
  const [isOpen, setIsOpen] = useState(false);

  const isSelected = selectedItemName === node.name;

  const handleClick = () => {
    dispatch(selectItem(node.name));
    setIsOpen(!isOpen);
  };

  return (
    <li key={node.name}>
      <p
        onClick={handleClick}
        style={{
          lineBreak: 'anywhere',
        }}
        className={`flex flex-wrap items-center gap-1.5 py-1 cursor-pointer ${
          isSelected ? 'bg-blue-100' : ''
        }`}
      >
        {node.nodes && node.nodes.length > 0 && (
          <button type="button" className="p-1 -m-1">
            <motion.span
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="flex"
            >
              <ChevronRightIcon className="size-4 text-gray-500" />
            </motion.span>
          </button>
        )}

        {node.nodes ? (
          <FolderIcon
            className={`size-6 text-sky-500 ${node.nodes.length === 0 ? 'ml-[22px]' : ''}`}
          />
        ) : (
          <DocumentIcon className="ml-[22px] size-6 text-gray-900" />
        )}
        {node.name}
      </p>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="pl-6 overflow-hidden flex flex-col justify-end"
          >
            {node.nodes?.map((el) => <FilesystemItem node={el} key={el.name} />)}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}
