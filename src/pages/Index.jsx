import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EPUBReader from '../components/EPUBReader';
import FileUpload from '../components/FileUpload';

const Index = () => {
  const [epubContent, setEpubContent] = useState(null);

  const handleFileUpload = (content) => {
    setEpubContent(content);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">EPUB Reader</CardTitle>
        </CardHeader>
        <CardContent>
          {!epubContent ? (
            <FileUpload onFileUpload={handleFileUpload} />
          ) : (
            <EPUBReader content={epubContent} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;