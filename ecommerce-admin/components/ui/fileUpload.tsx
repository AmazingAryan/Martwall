import { CldUploadWidget } from "next-cloudinary";
import { Trash, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MountedCheck } from "@/lib/mounted-check";

interface FileUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: () => void;
  value: string;  // Changed to a single string
}

const FileUpload: React.FC<FileUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <MountedCheck>
      <div>
        {value && (
          <div className="relative w-[200px] h-[200px] overflow-hidden mb-4">
            <div className="absolute z-10 top-2 right-2">
              <Button
                type="button"
                onClick={onRemove}
                variant="destructive"
                size="icon"
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-col items-center justify-center h-full">
              <File className="w-16 h-16" />
              <span>3D File</span>
            </div>
          </div>
        )}
        <CldUploadWidget
          onUpload={onUpload}
          uploadPreset="abcglb" // Change this to your actual upload preset for GLB files
        >
          {({ open }) => {
            const onClick = () => {
              open();
            };
            return (
              <Button
                type="button"
                disabled={disabled}
                variant="secondary"
                onClick={onClick}
              >
                Upload a GLB fle
              </Button>
            );
          }}
        </CldUploadWidget>
      </div>
    </MountedCheck>
  );
};

export default FileUpload;
