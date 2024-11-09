import { Calendar, Clipboard, CommentIcon, Layers } from '../icons';
import AttachmentDialog from './attachment';

export function Task() {
  return (
    <article className="p-3 rounded bg-white">
      <header className="mb-3 flex justify-between">
        {[
          {
            img: '/person_1.jpg',
            name: 'Client Name',
          },
          {
            img: '/person_5.jpg',
            name: 'Sadik Istiak',
          },
        ].map(({ img, name }) => (
          <figure className="flex items-center gap-2">
            <img
              src={img}
              className="size-6 rounded-full object-cover"
              width={200}
              height={200}
            />

            <figcaption className="font-medium">{name}</figcaption>
          </figure>
        ))}
      </header>

      <div className="flex justify-between items-center gap-8">
        <div className="min-w-0 flex gap-2 items-center">
          <Layers className="shrink-0 size-5" />
          <p className="truncate">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe
            sapiente minus consequatur dolor inventore, quos quia modi quas
            doloribus aspernatur itaque fugiat, quo incidunt unde maiores sint
            debitis deserunt asperiores.
          </p>
        </div>

        <div className="bg-gray-200 px-2 py-1 font-medium flex gap-1 items-center rounded-sm text-sm">
          <Clipboard className="size-4 shrink-0" />
          1/2
        </div>
      </div>

      <footer className="mt-5 flex justify-between items-center gap-3 text-sm">
        <div className="flex gap-1.5 items-center">
          {[...new Array(15)].map((_, i) => {
            if (i > 1) return;

            return (
              <img
                key={i}
                src="/person_8.jpg"
                className="rounded-full object-cover size-6"
                width={150}
                height={150}
              />
            );
          })}

          <div className="font-medium text-[.6rem] bg-gray-200 rounded-full size-6 grid place-items-center">
            12+
          </div>
        </div>

        <div className="flex gap-3 justify-end ml-auto">
          <button className="flex gap-1.5 items-center">
            <span className="sr-only">Comments</span>
            <CommentIcon className="size-5" />
            <span>15</span>
          </button>

          <AttachmentDialog />
        </div>

        <dl>
          <dt className="sr-only">Date Created</dt>
          <dd className="flex gap-1.5">
            <Calendar className="size-5" />
            <time dateTime="2022-12-30T00:00:00.000Z">30-12-2022</time>
          </dd>
        </dl>
      </footer>
    </article>
  );
}
