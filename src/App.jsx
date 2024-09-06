import React, { useRef } from 'react';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "./vfs_fonts.js";
import htmlToPdfmake from 'html-to-pdfmake';

pdfMake.vfs = pdfFonts;

const MyPage = () => {
  const pageRef = useRef();

  const handleGeneratePdf = () => {
    // Get the HTML content as a string
    const htmlContent = pageRef.current.innerHTML;

    // Convert HTML content to a format compatible with PDFMake
    const pdfMakeContent = htmlToPdfmake(htmlContent);

    // Define the document structure and styles
    const documentDefinition = {
      content: pdfMakeContent,
      defaultStyle: {
        fontSize: 12,
      },
    };

    // Create and download the PDF
    pdfMake.createPdf(documentDefinition).download('webpage-content.pdf');
  };

  return (
    <div>
      <div ref={pageRef}>
        {/* Your entire webpage content */}
        <h1>Welcome to My Page</h1>
        <p>This content will be exported to a PDF file in HTML and CSS format.</p>
        <div style={{  padding: '15px', borderRadius: '10px' }}>
          <h2>Styled Section</h2>
          <p>This section has custom styling applied.</p>
        </div>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
      <button onClick={handleGeneratePdf}>Download Page as PDF</button>
    </div>
  );
};

export default MyPage;
