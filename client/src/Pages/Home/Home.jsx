import React, { useEffect, useState, useRef } from "react";
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
import { MdUnfoldMore } from "react-icons/md";
import { useSelector } from "react-redux";

const Home = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [showCategoriesHome, setShowCategoriesHome] = useState(false);

  const toggleCategories = () => {
    setShowCategories((prev) => !prev);
  };

  const toggleCategoriesHome = () => {
    setShowCategoriesHome((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowCategoriesHome(false); // Hide categories when scrolling
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [counts, setCounts] = useState({
    propertiesSold: 0,
    partnerDevelopers: 0,
    propertiesAvailable: 0,
  });

  const achievementRef = useRef(null);
  const animationTriggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !animationTriggered.current) {
          animationTriggered.current = true;
          animateCounts();
        }
      },
      { threshold: 0.5 }
    );

    if (achievementRef.current) {
      observer.observe(achievementRef.current);
    }

    return () => {
      if (achievementRef.current) {
        observer.unobserve(achievementRef.current);
      }
    };
  }, []);

  const animateCounts = () => {
    let start = 0;
    const duration = 4000; // 2 seconds
    const increment = 50; // Speed of count
    const totalFrames = duration / increment;

    const targetValues = {
      propertiesSold: 100,
      partnerDevelopers: 26,
      propertiesAvailable: 36,
    };

    let frame = 0;

    const interval = setInterval(() => {
      frame++;
      setCounts({
        propertiesSold: Math.min(
          Math.floor((frame / totalFrames) * targetValues.propertiesSold),
          targetValues.propertiesSold
        ),
        partnerDevelopers: Math.min(
          Math.floor((frame / totalFrames) * targetValues.partnerDevelopers),
          targetValues.partnerDevelopers
        ),
        propertiesAvailable: Math.min(
          Math.floor((frame / totalFrames) * targetValues.propertiesAvailable),
          targetValues.propertiesAvailable
        ),
      });

      if (frame >= totalFrames) clearInterval(interval);
    }, increment);
  };

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
    // {
    //   _id: "manual-5",
    //   name: "Luxury",
    //   address: "Ibadan, Nigeria",
    //   description: "A luxurious villa with a stunning view.",
    //   regularPrice: "600,000,000",
    //   discountPrice: 48000000,
    //   offer: false,
    //   type: "rent",
    //   bedrooms: 6,
    //   bathrooms: 4,
    //   userRef: "12349",
    //   imageUrls: ["/Images/5.jpeg"],
    // },

    // {
    //   _id: "manual-6",
    //   name: "Luxury",
    //   address: "Ibadan, Nigeria",
    //   description: "A luxurious villa with a stunning view.",
    //   regularPrice: "600,000,000",
    //   discountPrice: 48000000,
    //   offer: false,
    //   type: "rent",
    //   bedrooms: 4,
    //   bathrooms: 4,
    //   userRef: "12350",
    //   imageUrls: ["/Images/6.jpeg"],
    // },
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
          <h1>
            Kano`s No.1 Platform for Flexible Payment Plots ~ Trusted by
            Hundreds.
          </h1>
          <p>We don`t just sell plots—we build communities.</p>

          <div className="categories-hero">
            <div className="view">
              <button onClick={toggleCategoriesHome}>View Properties</button>
            </div>
            {showCategoriesHome && (
              <ul className="category-list">
                <li>Land/plots</li>
                <li>Luxury homes</li>
                <li>Distress properties</li>
              </ul>
            )}
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
              <h2>Hot Deals</h2>
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

      <div className="achievements" ref={achievementRef}>
        <div className="achievement-container">
          <div className="achievement">
            <IoIosHome className="icon home" />
            <p>{counts.propertiesSold}+ Properties Sold</p>
          </div>

          <div className="achievement">
            <FaHandshake className="icon hand" />
            <p>{counts.partnerDevelopers} Partner Developers</p>
          </div>

          <div className="achievement">
            <FaRegBuilding className="icon build" />
            <p>{counts.propertiesAvailable} Properties Available</p>
          </div>
        </div>
      </div>

      <div className="whatsapp-community">
        <div className="container">
          <h2>Join Our WhatsApp Community</h2>
          <p>
            {" "}
            Stay updated with the latest news, offers, and discussions. Connect
            with like-minded individuals in our community.
          </p>
          <a
            href="https://chat.whatsapp.com/HgZ501WFsHWLIse0szho7C"
            target="_blank"
            rel="noopener noreferrer"
            className="join-btn"
          >
            <FaWhatsapp className="whatsapp-icon" />
            Join Now
          </a>
        </div>

      {/* <div className="inquiry">
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
            <textarea
              name="message"
              placeholder="Message"
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <button type="submit">Send via WhatsApp</button>
          </form>
        </div>
      </div> */}

      {/* <div className="locate">
        <iframe
          width="100%"
          height="400"
          src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=No%20344%20BUk%20Road%20opposite%20kano%20polytechnic%20central%20admin.+(PrimeZone%20Estates%20LTD)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        >
          <a href="https://www.gps.ie/collections/drones/">gps drone</a>
        </iframe>
      </div> */}

      <footer>
        <div className="footer-container">
          <div className="left">
            {/* <img src="/Images/logo.jpeg" alt="" /> */}
            <h3>
              PrimeZone <br />
              Estates LTD.
            </h3>
            <p>
              PrimeZone Estates LTD is a trusted real estate company committed
              to providing premium properties in prime locations. We offer
              flexible payment options and 24/7 customer support, ensuring a
              seamless experience for our clients.
            </p>
          </div>

          <div className="right">
            <div className="links">
              <Link to="" className="link">
                <img src="/Images/twitter.png" alt="" />
              </Link>

              <Link
                to="https://www.instagram.com/muhseen_estate_expert?igsh=eHphMGs5ZjRvczdq&utm_source=qr"
                className="link"
              >
                <img src="/Images/instagram.png" alt="" />
              </Link>

              <Link
                to="https://www.facebook.com/share/165HC6dhtA/?mibextid=LQQJ4d"
                className="link"
              >
                <img src="/Images/facebook.png" alt="" />
              </Link>

              <Link
                to="https://api.whatsapp.com/send/?phone=%2B2347063447840&text&type=phone_number&app_absent=0"
                className="link"
              >
                <img src="/Images/whatsapp.png" alt="" />
              </Link>
            </div>

            <Link to="" className="terms">
              <h4>Terms & Privacy Policy</h4>
            </Link>
          </div>
        </div>

        <div className="contact-container">
          <div className="">
            <h4>Address:</h4>
            <p>No 344 BUk Road opposite kano polytechnic central admin.</p>
          </div>

          <div className="">
            <h4>Contact:</h4>
            <p>07063447840</p>
            <p>09064404380</p>
          </div>
        </div>
      </footer>

      <div className="categories" onClick={toggleCategories}>
        {/* <MdCategory /> */}
        <div className="view">
          <p>View Properties</p>
          <MdUnfoldMore />
        </div>
        {showCategories && (
          <ul className="category-list">
            <li>Land/plots</li>
            <li>Luxury homes</li>
            <li>Distress properties</li>
          </ul>
        )}
      </div>
    </section>
  );
};

export default Home;
