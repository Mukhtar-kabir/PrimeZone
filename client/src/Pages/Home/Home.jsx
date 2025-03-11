import React, { useEffect, useState } from "react";
import "../Home/Home.css";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../../Components/ListingItem/ListingItem";
import { IoIosHome } from "react-icons/io";
import { FaHandshake } from "react-icons/fa";
import { FaRegBuilding } from "react-icons/fa";
import { FaAward } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { IoCallSharp } from "react-icons/io5";

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <section>
      <div className="hero">
        <div className="banner">
          <h1>Find your Dream home with Flexible Payment Plans</h1>
          <p>Luxury, Comfort, and Convenience - All in One</p>
          <Link to={"/search"}>
            <button>Explore Properties</button>
          </Link>
        </div>
      </div>

      <div className="achievements">
        <div className="achievement-container">
          <div className="achievement">
            <IoIosHome className="icon home" />
            <p>100+ Properties Sold</p>
          </div>

          <div className="achievement">
            <FaHandshake className="icon hand" />
            <p>26 Partner Developers</p>
          </div>

          <div className="achievement">
            <FaRegBuilding className="icon build" />
            <p>36 Properties Available</p>
          </div>
        </div>
      </div>

      <div className="swiper">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          className="swiper-container"
        >
          {["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg"].map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={`/Images/${image}`}
                alt="banner"
                className="swiper-image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="properties">
        <div className="properties-content max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
          {offerListings && offerListings.length > 0 && (
            <div className="items">
              <div className="item">
                <h2>Recent offers</h2>
                <Link to={"/search?offer=true"}>Show more offers</Link>
              </div>
              <div className="offer">
                {offerListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
          {rentListings && rentListings.length > 0 && (
            <div className="items">
              <div className="item">
                <h2 className="text-2xl font-semibold text-slate-600">
                  Recent places for rent
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"/search?type=rent"}
                >
                  Show more places for rent
                </Link>
              </div>
              <div className="rent flex flex-wrap gap-4">
                {rentListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
          {saleListings && saleListings.length > 0 && (
            <div className="items">
              <div className="item">
                <h2 className="text-2xl font-semibold text-slate-600">
                  Recent places for sale
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"/search?type=sale"}
                >
                  Show more places for sale
                </Link>
              </div>
              <div className="sale flex flex-wrap gap-4">
                {saleListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="why-choose-us">
        <div className="why-choose-us_container">
          <h2>Why Choose Us</h2>
          <div className="contents">
            <div className="content">
              <FaAward className="icon" />
              <p>Trusted Real Estate Experts</p>
              <span>
                Our team of seasoned real estate professionals ensures reliable
                guidance and expert advice for all your property needs.
              </span>
            </div>

            <div className="content">
              <FaSackDollar className="icon" />
              <p>Flexible Payment Options</p>
              <span>
                We offer a variety of payment plans tailored to suit your budget
                and financial preferences.
              </span>
            </div>

            <div className="content">
              <FaLocationDot className="icon" />
              <p>Prime Locations</p>
              <span>
                Our properties are strategically situated in sought-after areas,
                offering convenience and high investment value.
              </span>
            </div>

            <div className="content">
              <IoCallSharp className="icon" />
              <p>24/7 Customer Support</p>
              <span>
                Our dedicated support team is available around the clock to
                assist you with any inquiries or concerns.
              </span>
            </div>
          </div>
        </div>
      </div>

      <footer></footer>
    </section>
  );
};

export default Home;
