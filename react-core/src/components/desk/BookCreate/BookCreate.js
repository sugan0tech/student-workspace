import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addBook } from "./BookCreateSlice";
import { addBookDisplay } from "./BookDisplaySlice";
import "./BookCreate.css";
// used to convert image from file object form to Base64 form so we can use in image tag
import getBase64 from "../../../base64";

const BookCreate = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const dispatch = useDispatch();

  const [links, setLinks] = useState([]);
  const [images, setImages] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [ifPdf, setIfPdf] = useState(false);
  const [size, setSize] = useState(2000);
  const [normalImages, setNormalImages] = useState([]);

  const [uploadError, setUploadError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let id = Date.now().toString();
    let date = new Date().toISOString().split("T")[0];
    let fileSize = size / 1000000;
    dispatch(
      addBook({
        id: id,
        date: date,
        title: title,
        links: links,
        images: images,
        pdfs: pdfs,
        size: size,
      })
    );
    dispatch(
      addBookDisplay({
        id: id,
        date: date,
        title: title,
        size: fileSize,
      })
    );
    setTitle("");
    setLinks([]);
    setImages([]);
    setPdfs([]);
    setNormalImages([]);
    setIfPdf(false);
    setSize(2000);
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    const fileList = e.target.files;
    setSize(size + fileList[0].size);
    setImages([...images, fileList[0]]);
    getBase64(fileList[0], (result, name) => {
      if (result) {
        if (result.split(":")[1]) {
          setUploadError(null);
          const data = {
            id: Date.now().toString(),
            name: name,
            image: result,
          };
          setNormalImages([...normalImages, data]);
        } else {
          setUploadError("Can't Upload try another file");
        }
      }
    });
    e.target.value = null;
  };
  const handleLinkUpload = (e) => {
    e.preventDefault();
    if (!link) {
      return;
    }
    setLinks([...links, link]);
    setLink("");
  };
  const handlePdfUpload = (e) => {
    e.preventDefault();
    const fileList = e.target.files;

    setSize(size + fileList[0].size);

    setPdfs([...pdfs, fileList[0]]);

    if (pdfs) {
      setIfPdf(true);
    }
    e.target.value = null;
  };

  return (
    <div>
      <form>
        <label htmlFor="title">Title</label>
        <input
          className="form-group"
          name="title"
          type="text"
          placeholder="Enter The Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="imageDisplay">
          {normalImages.map((image) => (
            <img className="image" src={image.image}></img>
          ))}
        </div>
        <label htmlFor="imageInput">Choose Images</label>
        <input
          className="form-group"
          type="file"
          name="imageInput"
          multiple
          onChange={handleImageUpload}
          accept="image/*"
        />
        <p>{uploadError}</p>
        <div className={ifPdf ? "pdfDisplay" : "pdfDisplay hidden"}>
          {pdfs.map((pdf) => (
            <Document className="pdf" file={pdf}>
              <Page size="C10" pageNumber={1} />
            </Document>
          ))}
        </div>

        <label htmlFor="pdfInput">Choose Pdf files</label>
        <input
          className="form-group"
          type="file"
          name="pdfInput"
          onChange={handlePdfUpload}
          accept="application/pdf"
        />
        <div className="linkDisplay">
          {links.map((link, id) => (
            <div style={{ display: "block" }}>
              <span>{id + 1} </span>
              <a href={link} target="_blank">
                {link}
              </a>
            </div>
          ))}
        </div>
        <label htmlFor="linkInput">Enter topic related links</label>
        <input
          type="text"
          className="form-group"
          name="linkInput"
          placeholder="Enter the Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button onClick={handleLinkUpload}>+</button>
        <Button type="submit" onClick={handleSubmit}>
          Create
        </Button>
      </form>
    </div>
  );
};

export default BookCreate;
