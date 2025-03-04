import React, { useState } from "react";
import "../CreateListing/CreateListing.css";
import axios from "axios";

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });

  //   const handleImageSubmit = () => {
  //     if (files.length > 0 && files.length < 7) {
  //       const promises = [];

  //       for (let i = 0; i < files.length; i++) {
  //         promises.push(storeImage(files[i]));
  //       }

  //       Promise.all(promises).then((urls) => {
  //         setFormData({
  //           ...formData,
  //           imageUrls: formData.imageUrls.concat(urls),
  //         });
  //       });
  //     }
  //   };

  //   const storeImage = async (file) => {
  //     return new Promise((resolve, reject) => {});
  //   };

  // Upload multiple images to Cloudinary
  const handleImageSubmit = async () => {
    if (files.length === 0) {
      setImageUploadError("Please select at least one image.");
      return;
    }
    if (files.length + formData.imageUrls.length > 6) {
      setImageUploadError("You can only upload up to 6 images.");
      return;
    }

    setUploading(true);
    setImageUploadError(null);
    const promises = [];

    for (let i = 0; i < files.length; i++) {
      promises.push(uploadToCloudinary(files[i]));
    }

    try {
      const urls = await Promise.all(promises);
      setFormData((prev) => ({
        ...prev,
        imageUrls: [...prev.imageUrls, ...urls],
      }));
      setUploading(false);
    } catch (error) {
      setImageUploadError("Image upload failed. Please try again.");
      setUploading(false);
    }
  };

  const uploadToCloudinary = async (file) => {
    return new Promise(async (resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/drhqzdtnz/image/upload",
          formData
        );
        resolve(response.data.secure_url);
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleDeleteImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  return (
    <main className="create-listing">
      <h1>Create a Listing</h1>

      <form>
        <div className="inputs">
          <input
            type="text"
            placeholder="Name"
            maxLength={62}
            minLength={10}
            id="name"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            id="description"
            required
          />
          <input type="text" placeholder="Address" id="address" required />

          <div className="checkboxes">
            <div className="checkbox">
              <input type="checkbox" id="sale" />
              <span>Sell</span>
            </div>
            <div className="checkbox">
              <input type="checkbox" id="rent" />
              <span>Rent</span>
            </div>
            <div className="checkbox">
              <input type="checkbox" id="parking" />
              <span>Parking Spot</span>
            </div>
            <div className="checkbox">
              <input type="checkbox" id="funished" />
              <span>Funished</span>
            </div>
            <div className="checkbox">
              <input type="checkbox" id="offer" />
              <span>Offer</span>
            </div>
          </div>

          <div className="rooms">
            <div className="room">
              <input type="number" id="bedrooms" min="1" max="10" required />
              <p>Beds</p>
            </div>

            <div className="room">
              <input type="number" id="bathrooms" min="1" max="10" required />
              <p>Bath</p>
            </div>

            <div className="room">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max="10"
                required
              />
              <div>
                <p>Regular Price</p>
                <span>(Naira / month)</span>
              </div>
            </div>

            <div className="room">
              <input
                type="number"
                id="discountPrice"
                min="1"
                max="10"
                required
              />
              <div>
                <p>Regular Price</p>
                <span>(Naira / month)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="inputs">
          <p>
            <span className="span">Images:</span>The first image will be the
            cover (max 6)
          </p>

          <div className="image-input">
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={(e) => setFiles([...e.target.files])}
            />
            <button
              onClick={handleImageSubmit}
              type="button"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>

          {imageUploadError && <p className="error">{imageUploadError}</p>}

          {/* Preview uploaded images */}
          <div className="image-previews">
            {formData.imageUrls.map((url, index) => (
              <div key={url} className="image-preview">
                <img
                  key={index}
                  src={url}
                  alt={`Uploaded ${index}`}
                  className="uploaded-image"
                />
                <button type="button" onClick={() => handleDeleteImage(index)}>
                  Delete
                </button>
              </div>
            ))}
          </div>

          <button className="button">Create listing</button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
