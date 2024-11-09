import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import { PaperClip, Upload } from '../icons';
import { bucket } from '../lib/bucket';
import { FileObject } from '../types/file-object';
import Preview from './preview';

export default function AttachmentDialog() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [fileList, setFileList] = useState<FileObject[]>([]);

  const [refetchKey, setRefetchKey] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await bucket.list();

      if (data) setFileList(data);
    })();
  }, [refetchKey]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex gap-1.5 items-center">
          <span className="sr-only">Attachments</span>
          <PaperClip className="size-5" />
          <span>{fileList.length || 25}</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white overflow-y-auto max-h-[94svh]">
        <DialogHeader>
          <DialogTitle>Attachment</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="[&>*]:px-5 [&>*]:py-2">
            {['upload', 'preview'].map((value) => (
              <TabsTrigger
                key={value}
                value={value}
                className="data-[state=active]:border-b border-neutral-900 rounded-none capitalize"
              >
                {value}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="upload" className="pt-2">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setIsLoading(true);

                if (!file) return setIsLoading(false);

                await toast
                  .promise(
                    async () => {
                      const { error } = await bucket.upload(file.name, file);
                      if (error) throw error;
                    },
                    {
                      loading: 'Uploading file...',
                      success: () => {
                        setRefetchKey((prev) => prev + 1);
                        return 'Success. Preview the file from the preview tab.';
                      },
                      error: (error) => {
                        return (
                          error.message ||
                          'Something went wrong! Try again later.'
                        );
                      },
                      finally: () => {
                        setIsLoading(false);
                      },
                    }
                  )
                  .unwrap();
              }}
            >
              <input
                id="file"
                type="file"
                onChange={(e) => {
                  if (e.currentTarget.files) {
                    setFile(e.currentTarget.files[0]);
                  }
                }}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                required
              />

              <button
                disabled={isLoading}
                className="bg-neutral-950 text-white flex items-center justify-center gap-4 font-medium px-4 py-2 rounded-md w-full mt-4 hover:opacity-90 disabled:opacity-80"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </button>
            </form>
          </TabsContent>

          <TabsContent value="preview" className="pt-4">
            <Preview data={fileList} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
