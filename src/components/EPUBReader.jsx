import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

const EPUBReader = ({ content }) => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [chapterContent, setChapterContent] = useState('');
  const [toc, setToc] = useState([]);

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
        const chapter = await content.spine.get(toc[currentChapter].href);
        const doc = await chapter.load();
        let text = '';
        if (doc && doc.body) {
          text = doc.body.innerHTML;
        } else if (doc && doc.documentElement) {
          text = doc.documentElement.outerHTML;
        } else {
          text = 'Unable to load chapter content';
        }
        setChapterContent(text);
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

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between mb-4">
        <Button onClick={prevChapter} disabled={currentChapter === 0}>
          Previous Chapter
        </Button>
        <Button onClick={nextChapter} disabled={currentChapter === toc.length - 1}>
          Next Chapter
        </Button>
      </div>
      <div
        className="prose max-w-none flex-grow overflow-y-auto"
        dangerouslySetInnerHTML={{ __html: chapterContent }}
      />
    </div>
  );
};

export default EPUBReader;