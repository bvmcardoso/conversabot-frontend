/** @format */
import React, { useEffect } from 'react';
import DOMPurify from 'dompurify';
import Prism from 'prismjs';

// Import prism styles:
import 'prismjs/themes/prism.css';

const HtmlContent = ({ htmlString }) => {
  const sanitizedHtml = DOMPurify.sanitize(htmlString);

  const replaceNewLinesWithBreaks = (text) => {
    return text.replace(/(?:\r\n|\r|\n)/g, '<br>');
  };

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const formatCodeBlock = (codeBlock) => {
    return `<pre><code>${codeBlock}</code></pre>`;
  };

  const replaceCodeBlock = (text) => {
    return text.replace(/```(.*?)```/gs, (match, p1) =>
      formatCodeBlock(p1.trim())
    );
  };

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: replaceNewLinesWithBreaks(replaceCodeBlock(sanitizedHtml)),
      }}
    />
  );
};

export default HtmlContent;
