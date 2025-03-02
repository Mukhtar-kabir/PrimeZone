import React, { Children } from "react";
import { useEffect, useRef } from "react";

const UploadWidget = ({ children, onUpload = () => {} }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "drhqzdtnz",
        uploadPreset: "ml_default",
        sources: ["local", "url", "camera"],
      },
      function (error, result) {
        if (result.event === "success") {
          console.log("Uploaded Image URL:", result.info.secure_url);
          onUpload(result.info.secure_url);
        }
        console.log(result);
      }
    );
    console.log(cloudinaryRef.current);
  }, [onUpload]);

  return (
    <button
      onClick={() => widgetRef.current.open()}
      style={{
        cursor: "pointer",
        background: "none",
        border: "none",
        display: "flex",
        margin: "auto",
      }}
    >
      {children}
    </button>
  );
};

export default UploadWidget;
