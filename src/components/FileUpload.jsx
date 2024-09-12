import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ePub from 'epubjs';

const FileUpload = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target.result;
        const book = ePub(arrayBuffer);
        await book.ready;
        onFileUpload(book);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Input
        type="file"
        accept=".epub"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />
      <Button
        onClick={() => fileInputRef.current.click()}
        className="mb-4"
      >
        Upload EPUB File
      </Button>
      <p className="text-sm text-gray-500">
        Select an EPUB file to start reading
      </p>
    </div>
  );
};

export default FileUpload;