import { Task } from './components/task';
import { cn } from './lib/cn';
import { getCategories, getTasks } from './lib/get-data';

export default function App() {
  const data = getCategories();
  const tasks = getTasks();

  return (
    <main className="container">
      <div className="my-4 flex gap-2 max-w-full overflow-x-auto">
        {data.map(({ label, color }) => (
          <section className="bg-gray-100 text-stone-800 max-h-[calc(100svh-4rem)] overflow-y-auto min-w-[28rem]">
            <div className="flex items-center gap-2.5 bg-gray-100 p-3 sticky top-0">
              {color && (
                <div
                  className={cn('size-5 rounded-l-full', {
                    'bg-red-600': color === 'red',
                    'bg-blue-500': color === 'blue',
                    'bg-yellow-500': color === 'yellow',
                  })}
                />
              )}

              <h1 className="text-lg font-semibold">{label}</h1>

              <div className="aspect-square font-semibold bg-gray-200 rounded px-2 py-1.5 ml-auto">
                {tasks.length}
              </div>
            </div>

            <div className="mb-3 space-y-3 px-3">
              {tasks.map((_, i) => (
                <Task key={i} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
