import axios from "axios";
import { Bold, FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button, FormLabel } from "react-bootstrap";

function ProductImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  isEditMode
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    console.log(event.target.files);
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }
  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage(){
    setImageFile(null);
    if(inputRef.current){
      inputRef.current.value="";
    }
  }

  async function uploadedImage(){
    const data=new FormData();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    data.append("file",imageFile);
    const response = await axios.post(
      "https://localhost:7152/api/Image/upload",
      data,
      {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      }
    );
    console.log(response);
    if(response) setUploadedImageUrl(response.data)
      console.log( uploadedImageUrl);
  }

  useEffect(()=>{
    if(imageFile!==null) uploadedImage()
  },[imageFile])


  return (
    <div className="container">
      <div className="mb-3" hidden={isEditMode}>
        <label htmlFor="image-upload" className="form-label fs-5 fw-semibold">
          Upload Image
        </label>
        <div onDragOver={handleDragOver} onDrop={handleDrop}>
          <input
            id="image-upload"
            type="file"
            className="form-control d-none"
            ref={inputRef}
            onChange={handleImageFileChange}
          />
          {!imageFile ? (
            <label
              htmlFor="image-upload"
              className="d-flex flex-column align-items-center justify-content-center border p-4  h-32 rounded cursor-pointer"
              style={{
                marginTop: "10px",
                borderColor: "#ccc",
                borderWidth: "2px",
              }}
            >
              <UploadCloudIcon className="w-10 h-10 text-muted mb-2" />
              <span className="fw-medium">
                Drag & Drop or Click to Upload Image
              </span>
            </label>
          ) : (
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <FileIcon
                  className="w-8 text-dark me-2"
                  style={{ width: "2rem", height: "2rem" }}
                />
              </div>
              <p className="fs-6 fw-medium mb-0">{imageFile.name}</p>
              <Button
                variant="link"
                size="sm"
                className="text-muted p-0"
                onClick={handleRemoveImage}
              >
                <XIcon className="w-4 h-4" />
                <span className="visually-hidden">Remove File</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductImageUpload;
