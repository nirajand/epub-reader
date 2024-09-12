import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FiChevronLeft, FiChevronRight, FiList } from 'react-icons/fi';

const EPUBReader = ({ content, metadata }) => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [chapterContent, setChapterContent] = useState('');
  const [toc, setToc] = useState([]);
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.5);
  const contentRef = useRef(null);

  useEffect(() => {
    const loadToc = async () => {
      const navigation = await content.navigation;
      setToc(navigation.toc);
    };
    loadToc();
  }, [content]);

  useEffect(() => {
    const loadChapter = async () => {
      if (toc[currentChapter]) {
        try {
          const chapter = await content.spine.get(toc[currentChapter].href);
          const doc = await chapter.load();
          let text = '';
          if (doc.body) {
            text = doc.body.innerHTML;
          } else if (doc.documentElement) {
            text = doc.documentElement.outerHTML;
          } else if (typeof doc === 'string') {
            text = doc;
          } else {
            console.warn('Unable to extract content from chapter');
            text = 'Content not available';
          }
          setChapterContent(text);
        } catch (error) {
          console.error('Error loading chapter:', error);
          setChapterContent('Error loading chapter content. Please try another chapter.');
        }
      }
    };
    loadChapter();
  }, [content, currentChapter, toc]);

  const nextChapter = () => {
    if (currentChapter < toc.length - 1) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  const prevChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  const handleFontSizeChange = (value) => {
    setFontSize(value[0]);
  };

  const handleLineHeightChange = (value) => {
    setLineHeight(value[0]);
  };

  const handleChapterSelect = (value) => {
    setCurrentChapter(parseInt(value));
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex justify-between items-center">
        <Button onClick={prevChapter} disabled={currentChapter === 0}>
          <FiChevronLeft className="mr-2" /> Previous
        </Button>
        <Select value={currentChapter.toString()} onValueChange={handleChapterSelect}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select chapter" />
          </SelectTrigger>
          <SelectContent>
            {toc.map((chapter, index) => (
              <SelectItem key={index} value={index.toString()}>
                {chapter.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={nextChapter} disabled={currentChapter === toc.length - 1}>
          Next <FiChevronRight className="ml-2" />
        </Button>
      </div>
      <div className="flex space-x-4 items-center">
        <span>Font Size:</span>
        <Slider
          min={12}
          max={24}
          step={1}
          value={[fontSize]}
          onValueChange={handleFontSizeChange}
          className="w-[200px]"
        />
        <span>Line Height:</span>
        <Slider
          min={1}
          max={2}
          step={0.1}
          value={[lineHeight]}
          onValueChange={handleLineHeightChange}
          className="w-[200px]"
        />
      </div>
      <ScrollArea className="flex-grow">
        <div
          ref={contentRef}
          className="prose max-w-none p-4"
          style={{ fontSize: `${fontSize}px`, lineHeight: lineHeight }}
          dangerouslySetInnerHTML={{ __html: chapterContent }}
        />
      </ScrollArea>
    </div>
  );
};

export default EPUBReader;