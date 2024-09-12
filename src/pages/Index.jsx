import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EPUBReader from '../components/EPUBReader';
import FileUpload from '../components/FileUpload';
import { FiBook, FiX } from 'react-icons/fi';

const Index = () => {
  const [epubContent, setEpubContent] = useState(null);
  const [metadata, setMetadata] = useState(null);

  const handleFileUpload = (content, bookMetadata) => {
    setEpubContent(content);
    setMetadata(bookMetadata);
  };

  const handleReset = () => {
    setEpubContent(null);
    setMetadata(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-3xl font-bold">
            <FiBook className="inline-block mr-2" />
            EPUB Reader
          </CardTitle>
          {epubContent && (
            <Button variant="outline" onClick={handleReset}>
              <FiX className="mr-2" /> Close Book
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {!epubContent ? (
            <FileUpload onFileUpload={handleFileUpload} />
          ) : (
            <>
              {metadata && (
                <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  <p><strong>Title:</strong> {metadata.title}</p>
                  <p><strong>Author:</strong> {metadata.creator}</p>
                </div>
              )}
              <EPUBReader content={epubContent} metadata={metadata} />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;