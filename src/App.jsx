import React, { useRef } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import  pdfFonts from 'pdfmake/build/vfs_fonts.js';
import htmlToPdfmake from 'html-to-pdfmake';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const MyPage = () => {
  const pageRef = useRef();

  const handleGeneratePdf = () => {
    // Get the HTML content as a string
    const htmlContent = pageRef.current.innerHTML;

    // Convert HTML to PDFMake format
    const pdfMakeContent = htmlToPdfmake(htmlContent, {
      defaultStyles: {
        h1: { fontSize: 22, bold: true },
        h2: { fontSize: 18, bold: true },
        p: { fontSize: 12 },
      },
    });

    // Define the document content and styles
    const documentDefinition = {
      content: pdfMakeContent,
      defaultStyle: {
        fontSize: 12,
      },
    };

    // Generate the PDF
    pdfMake.createPdf(documentDefinition).download('webpage-content.pdf');
  };

  return (
    <div>
      <div ref={pageRef}>
        {/* Your entire webpage content */}
        <h1 style={{ textAlign: 'center', color: '#333' }}>Welcome to My Page</h1>
        <p style={{ textAlign: 'justify', margin: '0 20px' }}>
          This content will be exported to a PDF file with the same CSS alignment and styling.
        </p>
        <div style={{  padding: '15px', borderRadius: '10px' }}>
          <h2 style={{ textAlign: 'center' }}>Styled Section</h2>
          <p style={{ textAlign: 'left' }}>This section has custom styling applied.</p>
        </div>
        <ul >
          <li style={{ textAlign: 'left' }}>Item 1</li>
          <li style={{ textAlign: 'center' }}>Item 2</li>
          <li style={{ textAlign: 'left' }}>Item 3</li>
        </ul>
      </div>
      <button onClick={handleGeneratePdf}>Download Page as PDF</button>
    </div>
  );
};

export default MyPage;
