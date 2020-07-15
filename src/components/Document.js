import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
// import "../Sample.less";
import samplePDF from "../test.pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function Documentation() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <div>
      <h1>Lab Manual</h1>
      <p className="text-center">Instructions of spectrum lab</p>
      <div className="row">
        <div className="col-md-12 Example__container">
          <div className="panel panel-primary">
            <div className="panel-heading">Document</div>
            <div className="panel-body">
              <div className="Example__container__document">
                <Document
                  file={samplePDF}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page pageNumber={pageNumber || 1} />
                </Document>
              </div>
              <div className="btn-toolbar">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  disabled={pageNumber <= 1}
                  onClick={previousPage}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  disabled={pageNumber >= numPages}
                  onClick={nextPage}
                >
                  Next
                </button>
              </div>
            </div>
            <div>
              <p>
                Page {pageNumber || 1} of {numPages || 1}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
