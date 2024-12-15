import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface ImageUploaderProps {
  register?: UseFormRegisterReturn;
  placeholder?: string;
  size?: string;
  key?: any;
  name?: string;
  error?: any;
  initialImage?: string;
}

const ImageInput: React.FC<ImageUploaderProps> = ({
  placeholder = "images/placeholder.png",
  size = "6",
  key,
  name,
  error,
  initialImage = "",
}) => {
  const [preview, setPreview] = useState<string>(initialImage || placeholder);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const filePreview = URL.createObjectURL(file);
      setPreview(filePreview);
    }
  };

  const handleClear = () => {
    setPreview(placeholder);
    const fileInput = document.getElementById(
      "image-input",
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleEdit = () => {
    const fileInput = document.getElementById(
      "image-input",
    ) as HTMLInputElement;
    fileInput?.click();
  };

  return (
    <div className="mb-2 flex flex-col items-start">
      <div
        className="group relative flex"
        style={{ width: `${size}rem`, height: `${size}rem` }}
      >
        <div
          className="group relative flex h-full w-full cursor-pointer items-center justify-center rounded-lg border-[2px] bg-cover bg-center"
          style={{ backgroundImage: `url('${preview}')` }}
        >
          <div className="absolute bottom-0 left-0 right-0 flex w-full items-center justify-between p-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <button
              type="button"
              onClick={handleEdit}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-200 transition duration-200 hover:bg-gray-300"
            >
              <Pencil size={16} />
            </button>

            {preview !== placeholder && (
              <button
                type="button"
                onClick={handleClear}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-200 transition duration-200 hover:bg-gray-300"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
      <input
        id="image-input"
        type="file"
       
        className="hidden"
        key={key}
        name={name}
        onChange={handleFileChange}
      />
      <div className="text-[12px] text-destructive">{error}</div>
    </div>
  );
};

export default ImageInput;