import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FiUpload } from 'react-icons/fi';
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
      if (file.type !== 'application/epub+zip') {
        setError("Invalid file type. Please upload an EPUB file.");
        setIsLoading(false);
        return;
      }

      try {
        const arrayBuffer = await readFileAsArrayBuffer(file);
        const book = ePub(arrayBuffer);
        await book.ready;
        const metadata = await book.loaded.metadata;
        onFileUpload(book, metadata);
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
    <div className="flex flex-col items-center space-y-4">
      <Input
        type="file"
        accept=".epub"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />
      <Button
        onClick={() => fileInputRef.current.click()}
        className="flex items-center space-x-2"
        disabled={isLoading}
      >
        <FiUpload className="w-4 h-4" />
        <span>{isLoading ? 'Loading...' : 'Upload EPUB File'}</span>
      </Button>
      <p className="text-sm text-gray-500">
        Select an EPUB file to start reading
      </p>
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default FileUpload;