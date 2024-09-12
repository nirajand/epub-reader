import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ePub from 'epubjs';

const FileUpload = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setError(null);
    setIsLoading(true);

    if (file) {
      try {
        const arrayBuffer = await readFileAsArrayBuffer(file);
        console.log("File loaded successfully, creating ePub object...");
        const book = ePub(arrayBuffer);
        console.log("ePub object created, waiting for it to be ready...");
        await book.ready;
        console.log("ePub object is ready, calling onFileUpload...");
        onFileUpload(book);
      } catch (error) {
        console.error("Error processing file:", error);
        setError("Error processing file. Please try again with a different EPUB file.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      setError("No file selected. Please choose an EPUB file.");
    }
  };

  const readFileAsArrayBuffer = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
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
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Upload EPUB File'}
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