import React from "react";
import "../CreateListing/CreateListing.css";

const CreateListing = () => {
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
            <input type="file" id="images" accept="image/*" multiple />
            <button>Upload</button>
          </div>

          <button className="button">Create listing</button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
