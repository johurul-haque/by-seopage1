import { cn } from '../lib/cn';
import { getTasks } from '../lib/get-data';
import { Task } from './task';

type PropsType = {
  title: string;
  color?: string;
};

export function Board({ title, color }: PropsType) {
  const tasks = getTasks();

  return (
    <section className="p-3">
      <div className="flex gap-2.5">
        {color && (
          <div
            className={cn('aspect-square rounded-l-full', {
              'bg-red-600': color === 'red',
              'bg-blue-500': color === 'blue',
              'bg-yellow-500': color === 'yellow',
            })}
          />
        )}

        <h1>{title}</h1>

        <div className="aspect-square font-semibold bg-gray-200 rounded p-2 ml-auto">
          {tasks.length}
        </div>
      </div>

      <div className="my-3 space-y-3">
        {tasks.map((_, i) => (
          <Task key={i} />
        ))}
      </div>
    </section>
  );
}
