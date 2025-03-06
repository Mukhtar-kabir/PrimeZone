import React, { useState } from "react";
import "../CreateListing/CreateListing.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CreateListing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  console.log(formData);

  // Validate selected images (only images & max size 2MB)
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = [];

    selectedFiles.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        setImageUploadError("Only image files are allowed!");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setImageUploadError("Each file must be 2MB or less!");
        return;
      }
      validFiles.push(file);
    });

    if (validFiles.length > 0) {
      setFiles(validFiles);
      setImageUploadError(null);
    }
  };

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

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image! ");
      setError(false);

      if (+formData.regularPrice < +formData.discountPrice)
        return "Discount price must be lower than regular price";
      setLoading(true);
      setError(false);

      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
        userRef: currentUser._id,
      });
      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="create-listing">
      <h1>Create a Listing</h1>

      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <input
            type="text"
            placeholder="Name"
            maxLength={62}
            minLength={10}
            id="name"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="text"
            placeholder="Description"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />

          <div className="checkboxes">
            <div className="checkbox">
              <input
                type="checkbox"
                id="sale"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                id="rent"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                id="parking"
                onChange={handleChange}
                value={formData.parking}
              />
              <span>Parking Spot</span>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                id="furnished"
                onChange={handleChange}
                value={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                id="offer"
                onChange={handleChange}
                value={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>

          <div className="rooms">
            <div className="room">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>

            <div className="room">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Bath</p>
            </div>

            <div className="room">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="10000000"
                required
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div>
                <p>Regular Price</p>
                <span>(Naira / month)</span>
              </div>
            </div>

            {formData.offer && (
              <div className="room">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="10000000"
                  required
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div>
                  <p>Discount Price</p>
                  <span>(Naira / month)</span>
                </div>
              </div>
            )}
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
              accept="image/png, image/jpeg, image/jpg, image/webp"
              multiple
              onChange={handleFileChange}
              //   onChange={(e) => setFiles([...e.target.files])}
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

          <button className="button">
            {loading ? "Creating..." : "Create"}
          </button>
          {error && <p className="error">{error}</p>}
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
