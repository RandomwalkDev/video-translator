import { useState } from "react";
import { Upload, Trash2 } from "lucide-react";

const FileUpload = ({ onFileUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null); // To store the uploaded file
  const [previewUrl, setPreviewUrl] = useState(null); // To store preview URL

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  // Handle file input change
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  // Trigger file input on click of the drop area
  const handleClick = () => {
    document.getElementById("file-input").click();
  };

  // Handle file upload
  const handleFileUpload = (file) => {
    setFile(file);
    setPreviewUrl(URL.createObjectURL(file)); // Create preview URL
    onFileUpload(file); // Pass the file to the parent component
  };

  // Remove the file and reset preview
  const handleRemove = (e) => {
    e.stopPropagation();
    setFile(null);
    setPreviewUrl(null);
    onFileUpload(null);
  };

  return (
    <div
      className={`flex flex-col md:flex-row items-center justify-center w-full h-64 border-2 border-dashed rounded-xl transition-colors ${
        dragActive ? "border-purple-600 bg-purple-50" : "border-gray-300"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={handleClick} // Trigger file input when click occurs
    >
      <div className="flex flex-col items-center justify-center md:w-2/3 p-4">
        <Upload className="w-12 h-12 text-gray-400 mb-4" />
        <p className="mb-2 text-sm text-gray-500">
          <span className="font-semibold">Click to upload</span> or drag and
          drop
        </p>
        {/* <p className="text-xs text-gray-500">MP4, WebM or OGG (MAX. 800x400px)</p> */}
        <input
          type="file"
          id="file-input"
          className="hidden"
          onChange={handleChange}
          accept=".mp4,.webm,.ogg"
        />
      </div>

      {/* Preview Section */}
      {file && (
        <div className="flex flex-col items-center justify-center md:w-1/3 p-4 border-l-2 border-gray-300">
          <div className="relative w-full">
            <div className="w-8 h-8 p-2 bg-white rounded-full absolute flex justify-center items-center right-1 top-1 cursor-pointer z-20">
              <Trash2
                onClick={handleRemove}
                className="text-red-500 text-lg font-bold"
              />
            </div>
            {previewUrl && (
              <video
                className="w-full h-auto rounded-md"
                src={previewUrl}
                controls
                width="300"
              />
            )}
            {!previewUrl && (
              <p className="text-sm text-gray-500">{file.name}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
