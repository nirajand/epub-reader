import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EPUBReader from '../components/EPUBReader';
import FileUpload from '../components/FileUpload';

const Index = () => {
  const [epubContent, setEpubContent] = useState(null);

  const handleFileUpload = (content) => {
    setEpubContent(content);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">EPUB Reader</h1>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        {!epubContent ? (
          <FileUpload onFileUpload={handleFileUpload} />
        ) : (
          <EPUBReader content={epubContent} />
        )}
      </div>
    </div>
  );
};

export default Index;