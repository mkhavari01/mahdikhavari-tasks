'use client';

import { useAppSelector } from 'src/redux/hooks';

import { ActionSection } from 'src/components/action-section';
import { FilesystemItem } from 'src/components/filesystem-item';

export default function Page() {
  const nodes = useAppSelector((state) => state.nodesSlice.nodes);

  return (
    <section className="pt-5 px-3">
      <ActionSection />
      <ul className="mt-10">
        {nodes.map((node) => (
          <FilesystemItem node={node} key={node.name} />
        ))}
      </ul>
    </section>
  );
}
