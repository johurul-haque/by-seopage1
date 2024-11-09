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

export default function AttachmentDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex gap-1.5 items-center">
          <span className="sr-only">Attachments</span>
          <PaperClip className="size-5" />
          <span>25</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Attachment</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="[&>*]:px-5 [&>*]:py-2">
            {['upload', 'preview'].map((value) => (
              <TabsTrigger
                value={value}
                className="data-[state=active]:border-b border-neutral-900 rounded-none capitalize"
              >
                {value}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="upload" className="pt-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();

                console.log(e.currentTarget.file.value);
              }}
            >
              <input
                id="file"
                name="file"
                type="file"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                required
              />

              <button className="bg-neutral-950 text-white flex items-center justify-center gap-4 font-medium px-4 py-2 rounded-md w-full mt-4 hover:opacity-90">
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </button>
            </form>
          </TabsContent>

          <TabsContent value="preview" className="pt-4">
            <p>Preview tab content will be added later.</p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
