import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ePub from 'epubjs';

const FileUpload = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);
  const [error, setError] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setError(null);
    if (file) {
      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const arrayBuffer = e.target.result;
            console.log("File loaded successfully, creating ePub object...");
            const book = ePub(arrayBuffer);
            console.log("ePub object created, waiting for it to be ready...");
            await book.ready;
            console.log("ePub object is ready, calling onFileUpload...");
            onFileUpload(book);
          } catch (error) {
            console.error("Error processing file:", error);
            setError("Error processing file. Please try again with a different EPUB file.");
          }
        };
        reader.onerror = (e) => {
          console.error("FileReader error:", e);
          setError("Error reading file. Please try again.");
        };
        console.log("Starting to read file...");
        reader.readAsArrayBuffer(file);
      } catch (error) {
        console.error("Error in file handling:", error);
        setError("An unexpected error occurred. Please try again.");
      }
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
      {error && (
        <p className="text-sm text-red-500 mt-2">
          {error}
        </p>
      )}
    </div>
  );
};

export default FileUpload;