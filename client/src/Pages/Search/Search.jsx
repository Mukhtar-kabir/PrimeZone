import React from "react";
import "../Search/Search.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../../Components/ListingItem/ListingItem";
import { manualListings } from "../../data/ManualListings";

function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  const [listings, setListings] = useState([]);

  useEffect(() => {
    filterListings(sidebardata.searchTerm, sidebardata.type);
  }, [sidebardata]);

  const filterListings = (searchTerm, type) => {
    let filtered = manualListings.filter((listing) => {
      return (
        listing.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (type === "all" || listing.type === type)
      );
    });

    filtered.sort((a, b) => {
      if (sidebardata.sort === "regularPrice") {
        return sidebardata.order === "asc"
          ? a.regularPrice - b.regularPrice
          : b.regularPrice - a.regularPrice;
      } else if (sidebardata.sort === "createdAt") {
        return sidebardata.order === "asc"
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });

    setListings(filtered);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    navigate(`/search?${urlParams.toString()}`);

    filterListings(sidebardata.searchTerm, sidebardata.type);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className="search">
      <div className="filters">
        <form onSubmit={handleSubmit}>
          <div className="search-input">
            <label>Search Term:</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              value={sidebardata.searchTerm}
              // onChange={handleChange}
              onChange={(e) => {
                const newSearchTerm = e.target.value;
                setSidebardata((prev) => ({
                  ...prev,
                  searchTerm: newSearchTerm,
                }));
                filterListings(newSearchTerm, sidebardata.type);
                navigate(
                  `/search?searchTerm=${newSearchTerm}&type=${sidebardata.type}`
                );
              }}
            />
          </div>
          <div className="filters-items">
            <label>Type:</label>
            <div className="item">
              <input
                type="checkbox"
                id="all"
                // onChange={handleChange}
                checked={sidebardata.type === "all"}
                onChange={() => {
                  const newType = "all";
                  setSidebardata((prev) => ({ ...prev, type: newType }));
                  filterListings(sidebardata.searchTerm, newType);
                  navigate(
                    `/search?searchTerm=${sidebardata.searchTerm}&type=${newType}`
                  );
                }}
              />
              <span>Rent & Sale</span>
            </div>
            <div className="item">
              <input
                type="checkbox"
                id="rent"
                // onChange={handleChange}
                checked={sidebardata.type === "rent"}
                onChange={() => {
                  const newType = "rent";
                  setSidebardata((prev) => ({ ...prev, type: newType }));
                  filterListings(sidebardata.searchTerm, newType);
                  navigate(
                    `/search?searchTerm=${sidebardata.searchTerm}&type=${newType}`
                  );
                }}
              />
              <span>Rent</span>
            </div>
            <div className="item">
              <input
                type="checkbox"
                id="sale"
                // onChange={handleChange}
                checked={sidebardata.type === "sale"}
                onChange={() => {
                  const newType = "sale";
                  setSidebardata((prev) => ({ ...prev, type: newType }));
                  filterListings(sidebardata.searchTerm, newType);
                  navigate(
                    `/search?searchTerm=${sidebardata.searchTerm}&type=${newType}`
                  );
                }}
              />
              <span>Sale</span>
            </div>
            <div className="item">
              <input
                type="checkbox"
                id="offer"
                // onChange={handleChange}
                checked={sidebardata.type === "offer"}
                onChange={() => {
                  const newType = "offer";
                  setSidebardata((prev) => ({ ...prev, type: newType }));
                  filterListings(sidebardata.searchTerm, newType);
                  navigate(
                    `/search?searchTerm=${sidebardata.searchTerm}&type=${newType}`
                  );
                }}
              />
              <span>Offer</span>
            </div>
          </div>

          <div className="search-input">
            <label>Sort:</label>
            <select
              id="sort_order"
              value={`${sidebardata.sort}_${sidebardata.order}`}
              onChange={(e) => {
                const [sort, order] = e.target.value.split("_");
                setSidebardata((prev) => ({ ...prev, sort, order }));
                filterListings(sidebardata.searchTerm, sidebardata.type);
              }}
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="button">Search</button>
        </form>
      </div>

      <div className="listing">
        <h1>Listing results:</h1>
        <div className="listing-items">
          {listings.length === 0 ? (
            <p>No listing found!</p>
          ) : (
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))
          )}
        </div>
      </div>

      {/* <div className="listing">
        <h1>Listing results:</h1>
        <div className="listing-items">
          {!loading && listings.length === 0 && <p>No listing found!</p>}
          {loading && <p className="loading">Loading...</p>}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <button onClick={onShowMoreClick} className="showMore">
              Show more
            </button>
          )}
        </div>
      </div> */}
    </div>
  );
}

export default Search;
