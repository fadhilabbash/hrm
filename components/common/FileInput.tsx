import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Eye } from "lucide-react";

interface FileInputProps {
  label: string;
  name: string;
  error?: any;

  initialFileUrl?: string;
}

const FileInput: React.FC<FileInputProps> = ({
  label,
  name,
  error,
  initialFileUrl,
}) => {
  const [fileUrl, setFileUrl] = useState<string | null>(initialFileUrl || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      setFileUrl(URL.createObjectURL(selectedFile));
    } else {
      setFileUrl(initialFileUrl || null);
    }
  };

  useEffect(() => {
    if (initialFileUrl) {
      setFileUrl(initialFileUrl);
    }
  }, [initialFileUrl]);

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <div className="flex items-center gap-2">
        <Input id={name} name={name} type="file" onChange={handleFileChange} />
        {fileUrl && (
          <Link
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-zinc-900 p-2 text-white"
          >
            <Eye className="h-5 w-5" />
          </Link>
        )}
      </div>
      {error && <div className="mt-1 text-[12px] text-red-600">{error}</div>}
    </div>
  );
};
export default FileInput;
