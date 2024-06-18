/** @format */

import React from 'react';
import DOMPurify from 'dompurify';

const HtmlContent = ({ htmlString }) => {
  const sanitizedHtml = DOMPurify.sanitize(htmlString);

  const replaceNewLinesWithBreaks = (text) => {
    return text.replace(/(?:\r\n|\r|\n)/g, '<br>');
  };

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: replaceNewLinesWithBreaks(sanitizedHtml),
      }}
    />
  );
};

export default HtmlContent;
