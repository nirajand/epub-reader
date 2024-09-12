import React, { useState, useEffect, useRef } from 'react';
import { ReactReader } from 'react-reader';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const EPUBReader = ({ content, metadata }) => {
  const [location, setLocation] = useState(null);
  const [totalLocations, setTotalLocations] = useState(null);
  const [toc, setToc] = useState([]);
  const [fontSize, setFontSize] = useState(100);
  const renditionRef = useRef(null);

  useEffect(() => {
    const loadToc = async () => {
      const navigation = await content.navigation;
      setToc(navigation.toc);
    };
    loadToc();
  }, [content]);

  const locationChanged = (epubcifi) => {
    setLocation(epubcifi);
  };

  const getRendition = (rendition) => {
    renditionRef.current = rendition;
    rendition.themes.fontSize(`${fontSize}%`);
  };

  const changeFontSize = (newSize) => {
    setFontSize(newSize);
    if (renditionRef.current) {
      renditionRef.current.themes.fontSize(`${newSize}%`);
    }
  };

  const handleChapterSelect = (value) => {
    const chapter = toc.find((item, index) => index.toString() === value);
    if (chapter && renditionRef.current) {
      renditionRef.current.display(chapter.href);
    }
  };

  const nextPage = () => {
    if (renditionRef.current) {
      renditionRef.current.next();
    }
  };

  const prevPage = () => {
    if (renditionRef.current) {
      renditionRef.current.prev();
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex justify-between items-center">
        <Button onClick={prevPage}>
          <FiChevronLeft className="mr-2" /> Previous
        </Button>
        <Select onValueChange={handleChapterSelect}>
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
        <Button onClick={nextPage}>
          Next <FiChevronRight className="ml-2" />
        </Button>
      </div>
      <div className="flex space-x-4 items-center">
        <span>Font Size:</span>
        <Slider
          min={50}
          max={200}
          step={10}
          value={[fontSize]}
          onValueChange={(value) => changeFontSize(value[0])}
          className="w-[200px]"
        />
      </div>
      <div style={{ height: 'calc(100vh - 200px)', position: 'relative' }}>
        <ReactReader
          url={content.url}
          location={location}
          locationChanged={locationChanged}
          getRendition={getRendition}
          tocChanged={toc => setToc(toc)}
          epubOptions={{
            flow: 'scrolled',
            manager: 'continuous'
          }}
        />
      </div>
    </div>
  );
};

export default EPUBReader;