import { useState } from 'react';
import { toast } from 'sonner';
import { FileIcon, Upload } from '../icons';
import { bucket } from '../lib/bucket';
import { FileObject } from '../types/file-object';

export default function Preview({ data }: { data: FileObject[] }) {
  if (data.length === 0) {
    return (
      <div className="text-gray-500 py-4 text-center">
        No files uploaded yet.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {data.map((file) => {
        const [isLoading, setIsLoading] = useState(false);

        return (
          <div
            key={file.id}
            className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg"
          >
            <FileIcon className="h-5 w-5 text-gray-500" />

            <div>
              <p className="text-sm">{file.name}</p>
              <p className="text-xs text-gray-500 uppercase">
                {getFileExtension(file.name)}
              </p>
            </div>

            <button
              aria-disabled={isLoading}
              onClick={async () => {
                toast.promise(
                  async () => {
                    setIsLoading(true);
                    await handleDownload(file.name);
                    setIsLoading(false);
                  },
                  {
                    loading: 'Preparing to download',
                    error: 'Something went wrong!',
                  }
                );
              }}
              className="border rounded px-2 py-2 hover:bg-gray-200 ml-auto aria-disabled:opacity-80 aria-disabled:bg-gray-200"
            >
              <span className="sr-only">Download</span>
              <Upload className="size-3.5 rotate-180" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

function getFileExtension(filename: string) {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
}

async function handleDownload(filePath: string) {
  const { data } = await bucket.download(filePath);

  if (!data) throw Error();

  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(data);
  link.click();

  link.download = filePath;
  document.body.appendChild(link);

  link.click();

  window.URL.revokeObjectURL(link.href);
  document.body.removeChild(link);
}
