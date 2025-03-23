import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
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
import { FaTwitter } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { useSelector } from "react-redux";

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/inquiry/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    alert(data.message);

    if (response.ok) {
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    }
  };

  // Hardcoded Listings
  const manualListings = [
    {
      _id: "manual-1",
      name: "Modern Apartment",
      address: "Lagos, Nigeria",
      description: "A beautiful apartment in a prime location.",
      regularPrice: 2000000,
      discountPrice: 1800000,
      offer: true,
      type: "rent",
      bedrooms: 3,
      bathrooms: 2,
      userRef: "12345",
      imageUrls: ["/Images/1.jpeg"],
    },
    {
      _id: "manual-2",
      name: "Luxury Villa",
      address: "Abuja, Nigeria",
      description: "A luxurious villa with a stunning view.",
      regularPrice: 50000000,
      discountPrice: 48000000,
      offer: false,
      type: "sale",
      bedrooms: 5,
      bathrooms: 4,
      userRef: "12346",
      imageUrls: ["/Images/2.jpeg"],
    },

    {
      _id: "manual-3",
      name: "New Villa",
      address: "Abuja, Maitama, Nigeria",
      description: "A luxurious villa with a stunning view.",
      regularPrice: "800,000,000",
      discountPrice: 48000000,
      offer: false,
      type: "rent",
      bedrooms: 7,
      bathrooms: 4,
      userRef: "12347",
      imageUrls: ["/Images/3.jpeg"],
    },

    {
      _id: "manual-4",
      name: "Luxury",
      address: "Ibadan, Nigeria",
      description: "A luxurious villa with a stunning view.",
      regularPrice: "600,000,000",
      discountPrice: 48000000,
      offer: false,
      type: "rent",
      bedrooms: 6,
      bathrooms: 4,
      userRef: "12348",
      imageUrls: ["/Images/4.jpeg"],
    },
    {
      _id: "manual-5",
      name: "Luxury",
      address: "Ibadan, Nigeria",
      description: "A luxurious villa with a stunning view.",
      regularPrice: "600,000,000",
      discountPrice: 48000000,
      offer: false,
      type: "rent",
      bedrooms: 6,
      bathrooms: 4,
      userRef: "12349",
      imageUrls: ["/Images/5.jpeg"],
    },

    {
      _id: "manual-6",
      name: "Luxury",
      address: "Ibadan, Nigeria",
      description: "A luxurious villa with a stunning view.",
      regularPrice: "600,000,000",
      discountPrice: 48000000,
      offer: false,
      type: "rent",
      bedrooms: 4,
      bathrooms: 4,
      userRef: "12350",
      imageUrls: ["/Images/6.jpeg"],
    },
  ];

  // useEffect(() => {
  //   const fetchOfferListings = async () => {
  //     try {
  //       const res = await fetch("/api/listing/get?offer=true&limit=4");
  //       const data = await res.json();
  //       // setOfferListings([...manualListings, ...data]);
  //       setOfferListings(data);
  //       fetchRentListings();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   const fetchRentListings = async () => {
  //     try {
  //       const res = await fetch("/api/listing/get?type=rent&limit=4");
  //       const data = await res.json();
  //       setRentListings(data);
  //       fetchSaleListings();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const fetchSaleListings = async () => {
  //     try {
  //       const res = await fetch("/api/listing/get?type=sale&limit=4");
  //       const data = await res.json();
  //       setSaleListings(data);
  //     } catch (error) {
  //       log(error);
  //     }
  //   };
  //   // fetchOfferListings();
  //   fetchOfferListings();
  //   fetchRentListings();
  //   fetchSaleListings();
  // }, []);

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
        <div className="properties-content">
          <div className="defaults">
            <div className="manual-listings">
              <h2>Featured Properties</h2>
              <div className="listings-grid">
                {manualListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          </div>
          {/* {offerListings && offerListings.length > 0 && (
            <div className="items">
              <div className="item">
                <h2>Recent offers</h2>
                <Link className="link" to={"/search?offer=true"}>
                  Show more offers
                </Link>
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
                <Link className="link" to={"/search?type=rent"}>
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
                <Link className="link" to={"/search?type=sale"}>
                  Show more places for sale
                </Link>
              </div>
              <div className="sale flex flex-wrap gap-4">
                {saleListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )} */}
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

      <div className="inquiry">
        <div className="inquiry-form">
          <h2>Make an Inquiry?</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!currentUser) {
                alert("You need to sign in to send an inquiry.");
                navigate("/sign-in");
                return;
              }
              const phoneNumber = "2347063447840";
              const message = `Assalamu alaikum, my name is ${formData.name}. I am reaching out through your website regarding real estate listings.

              Here are my contact details:  
              📞 Phone: ${formData.phone}  
              📧 Email: ${formData.email}  

              Message: ${formData.message}  

              Looking forward to your response. Thank you!`;
              const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                message
              )}`;
              window.open(whatsappLink, "_blank");
            }}
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="number"
              name="phone"
              placeholder="Phone Number"
              required
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            {/* <textarea
              name="message"
              placeholder="Message"
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea> */}
            <button type="submit">Send via WhatsApp</button>
          </form>
        </div>
      </div>

      <footer>
        <div className="footer-container">
          <div className="left">
            <img src="/Images/logo.jpeg" alt="" />
            <p>
              PrimeZone Estates LTD is a trusted real estate company committed
              to providing premium properties in prime locations. We offer
              flexible payment options and 24/7 customer support, ensuring a
              seamless experience for our clients.
            </p>
            <h4>Address:</h4>
            <p>456 Skyline Avenue, Metroville, FAKE456</p>
          </div>

          <div className="right">
            <div className="links">
              <Link to="" className="link">
                <FaTwitter />
              </Link>

              <Link to="" className="link">
                <FaInstagramSquare />
              </Link>

              <Link
                to="https://api.whatsapp.com/send/?phone=%2B2347063447840&text&type=phone_number&app_absent=0"
                className="link"
              >
                <FaWhatsappSquare />
              </Link>
            </div>

            <Link to="" className="terms">
              <h4>Terms & Privacy Policy</h4>
            </Link>
          </div>
        </div>
      </footer>

      <Link
        to={
          "https://api.whatsapp.com/send/?phone=%2B2347063447840&text&type=phone_number&app_absent=0"
        }
      >
        <img
          className="whatsapp-icon"
          src="/Images/whatsapp.png"
          alt="Whatsapp Icon"
        />
      </Link>
    </section>
  );
};

export default Home;
