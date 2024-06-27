import React from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import "../../style/asset-selector.css";

interface AssetSelectorProps {
  onFilesSelected: (files: File[]) => void;
}

const Dropzone: React.FC<AssetSelectorProps> = ({ onFilesSelected }) => {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop: (acceptedFiles) => {
      onFilesSelected(acceptedFiles);
    },
  });

  const files = acceptedFiles.map((file: FileWithPath) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      <div className="text-center">
        <span>📁</span>
        <p>Drag 'or' drop images, or click to select files</p>
      </div>

      <aside>
        <ul>{files}</ul>
      </aside>
    </div>
  );
};

export default Dropzone;
