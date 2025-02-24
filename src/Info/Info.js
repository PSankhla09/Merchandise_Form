import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./Info.css";
import Img1 from "./Purple Halloween Final.png";
import Img2 from "./Black Halloween Final.png";
import Img3 from "./sangam 3.jpg";

const Info = () => {
  const [cookies, setCookie] = useCookies([
    "cookieConsent",
    "userEmail",
    "userBITSID",
  ]);
  const [cookieConsentConfirmed, setCookieConsentConfirmed] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [ID, setID] = useState("");
  const [selectedHostel, setSelectedHostel] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(
    !cookies.cookieConsent
  );
  const [showOverlay, setShowOverlay] = useState(!cookies.cookieConsent);
  const [isCookieLoading, setIsCookieLoading] = useState(true);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [IDError, setIDError] = useState("");

  const nameRef = useRef();
  const emailRef = useRef();
  const numberRef = useRef();
  const idRef = useRef();

  const hostels = [
    "Gandhi Bhawan",
    "Krishna Bhawan",
    "CVR Bhawan",
    "SR Bhawan",
    "Bhagirath Bhawan",
    "VK Bhawan",
    "RP Bhawan",
    "Ashok Bhawan",
    "Shankar Bhawan",
    "Ram Bhawan",
    "Budh Bhawan",
    "Vyas Bhawan",
    "Meera Bhawan",
  ];
  const sizes = ["S", "M", "L", "XL", "XXL"]; // Available sizes
  const images = [Img1, Img2, Img3];

  const handleHostelSelect = (hostel) => {
    console.log("Selected hostel:", hostel);
    setSelectedHostel(hostel);
  };

  const validateName = (name) => {
    console.log("Validating name:", name);

    if (name.length > 50) {
      return false;
    }

    return /^[A-Za-z]+(?:\s[A-Za-z]+)+$/.test(name);
  };

  const validateEmail = (email) => {
    console.log("Validating email:", email);
    return /^[a-zA-Z0-9._%+-]+@pilani\.bits-pilani\.ac\.in$/.test(email);
  };

  const validatePhone = (number) => {
    console.log("Validating phone number:", number);
    return /^\d{10}$/.test(number);
  };

  const validateBITSID = (ID) => {
    console.log("Validating BITS ID:", ID);
    const pattern =
      /^20(1[8-9]|2[0-4])(AB|AD|AA|A3|A4|A1|A2|A5|A7|B1|B2|B3|B5|B4)PS(0\d{3}|1[01]\d{2}|1200)P$/;
    return pattern.test(ID);
  };

  const handleChange = (setter, errorSetter) => (e) => {
    const { name, value } = e.target;

    let error = "";
    if (value.trim()) {
      switch (name) {
        case "name":
          error = validateName(value)
            ? ""
            : "Please enter your full name in not more than 50 characters.";
          errorSetter(error);
          break;
        case "email":
          error = validateEmail(value)
            ? ""
            : "Enter a valid BITS Pilani email (e.g., abc@pilani.bits-pilani.ac.in).";
          errorSetter(error);
          break;
        case "number":
          error = validatePhone(value)
            ? ""
            : "Enter a valid 10-digit phone number.";
          errorSetter(error);
          break;
        case "ID":
          error = validateBITSID(value)
            ? ""
            : "Enter a valid BITS ID (e.g., 20XXYYPSZZZZP).";
          errorSetter(error);
          break;
        default:
          errorSetter("");
      }
    }

    setter(value);
  };

  useEffect(() => {
    console.log("Checking cookies:", cookies);
    if (cookies.userEmail && cookies.userBITSID) {
      console.log("Redirecting to /already-submitted");
      navigate("/already-submitted");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (
      !name ||
      !email ||
      !number ||
      !ID ||
      !selectedHostel ||
      !selectedSize ||
      !agreeTerms ||
      !selectedImage
    ) {
      setErrorMessage("All fields are required.");
      return;
    }

    setLoading(true);
    if (cookies.userEmail && cookies.userBITSID) {
      console.log("Cookies found before submission, redirecting");
      navigate("/already-submitted");
      return;
    }
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            number,
            ID,
            selectedHostel,
            selectedSize,
            selectedImage,
          }),
        }
      );

      if (response.ok) {
        setSuccessMessage("Form submitted successfully!");
        // Reset form
        setName("");
        setEmail("");
        setNumber("");
        setID("");
        setSelectedHostel("");

        setSelectedSize("");
        setSelectedImage("");
        setCookie("userEmail", email, {
          path: "/",
          maxAge: 30 * 24 * 60 * 60,
          secure: true,
          sameSite: "strict",
        });
        setCookie("userBITSID", ID, {
          path: "/",
          maxAge: 30 * 24 * 60 * 60,
          secure: true,
          sameSite: "strict",
        });
        navigate("/success");
      } else {
        setErrorMessage("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }

    setLoading(false);
  };
  useEffect(() => {
    if (cookies.cookieConsent !== undefined) {
      setIsCookieLoading(false);
      setCookieConsentConfirmed(cookies.cookieConsent === "true");
    }
    if (cookies.userEmail && cookies.userBITSID) {
      setEmail(cookies.userEmail);
      setID(cookies.userBITSID);
    }
  }, [cookies.cookieConsent, cookies.userEmail, cookies.userBITSID]);

  const isSubmitDisabled =
    isCookieLoading ||
    !cookieConsentConfirmed ||
    nameError ||
    emailError ||
    numberError ||
    IDError;

  const handleAcceptCookies = () => {
    console.log("Accepting cookies");
    setCookie("cookieConsent", "true", {
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
      secure: true,
      sameSite: "strict",
    });
    setShowCookieBanner(false);
    setShowOverlay(false);
    setCookieConsentConfirmed(true);
    document.body.classList.remove("no-scroll");

    console.log("Cookie consent set to:", cookies.cookieConsent);
  };

  const handleDeclineCookies = () => {
    console.log("Declining cookies");
    setCookie("cookieConsent", "false", {
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
      secure: true,
      sameSite: "strict",
    });
    setShowCookieBanner(false);
    setShowOverlay(false);
    setCookieConsentConfirmed(false);
    document.body.classList.remove("no-scroll");
  };

  useEffect(() => {
    console.log("Initial cookie consent check:", cookies.cookieConsent);

    console.log("Cookie consent state:", cookies.cookieConsent);
    console.log("Cookie loading state:", isCookieLoading);

    if (isCookieLoading) {
      console.log("Cookie consent is still loading, skipping further checks.");
      return;
    }

    if (cookies.cookieConsent === true) {
      console.log("Cookie consent is available:", cookies.cookieConsent);
      setShowCookieBanner(false);
      setCookieConsentConfirmed(true);
      setShowOverlay(false);
    } else {
      console.log(
        "Cookie consent is undefined/false. Showing cookie banner and overlay."
      );
      setShowCookieBanner(true);
      setCookieConsentConfirmed(false);
      setShowOverlay(true);
    }
  }, [cookies.cookieConsent, isCookieLoading]);

  useEffect(() => {
    console.log("Body no-scroll class management:", cookies.cookieConsent);

    if (cookies.cookieConsent === "true" || cookies.cookieConsent === "false") {
      document.body.classList.remove("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [cookies.cookieConsent]);

  return (
    <div>
      {showOverlay && <div className="overlay"></div>}

      <div className="page-content">
        {showCookieBanner && (
          <div className="cookie-banner">
            <p>
              We use cookies to ensure you get the best experience.
              <button onClick={handleAcceptCookies} className="accept-btn">
                Accept
              </button>
              <button onClick={handleDeclineCookies} className="decline-btn">
                Decline
              </button>
            </p>
          </div>
        )}

        <div className="inform">
          <h1>DVM Merchandise Order Form</h1>
          <h6>Get Ready for the Ultimate Merchandise Collection!</h6>
          <p>
            Tired of signing up for exclusive merchandise that never arrives?
            This time, <span> DVM</span> is back with a{" "}
            <span>redesigned and upgraded</span> Merchandise—better, bolder, and
            comfier than ever!{" "}
          </p>
          <h6>Why You NEED This Hoodie:</h6>
          <ul>
            <li>
              <span>Premium Quality Fabric</span>
              <p> - Ultra-soft and cozy, perfect for the chilly season.</p>
            </li>
            <li>
              <span>Fresh & Unique Design</span>
              <p> - A brand-new spooky look that makes you stand out!</p>
            </li>
            <li>
              <span>Fast & Guaranteed Delivery</span>{" "}
              <p>- No more waiting forever; get yours before winter fades!</p>
            </li>
          </ul>
          <br />
          <span>💳Payment Mode: SWD only</span>
          <p>
            <span>Limited Stock Alert!</span> Don't ...miss out—grab yours now
            before they vanish into the night!🌙💀
          </p>
          <br />

          <br />
          <p className="hh">* Indicates required fields</p>
        </div>

        <form className="inform" onSubmit={handleSubmit}>
          <h4>Name:</h4>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange(setName, setNameError)}
            ref={nameRef}
            placeholder="Enter your Full Name"
            required
          />
          <div className="error-message">
            {nameError && <p className="error">{nameError}</p>}
          </div>

          <h4>Email ID:</h4>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange(setEmail, setEmailError)}
            ref={emailRef}
            placeholder="Enter your BITS Email ID"
            required
          />
          <div className="error-message">
            {emailError && <p className="error">{emailError}</p>}
          </div>
          <h4>Phone Number:</h4>
          <input
            type="number"
            name="number"
            value={number}
            onChange={handleChange(setNumber, setNumberError)}
            ref={numberRef}
            placeholder="Enter your Phone Number"
            required
          />
          <div className="error-message">
            {numberError && <p className="error">{numberError}</p>}
          </div>
          <h4>BITS ID:</h4>
          <input
            type="text"
            name="ID"
            value={ID}
            onChange={handleChange(setID, setIDError)}
            ref={idRef}
            placeholder="Enter your BITS ID"
            required
          />
          <div className="error-message">
            {IDError && <p className="error">{IDError}</p>}
          </div>

          <h4>Select Hostel:</h4>

          <select
            className="dropdown-select"
            value={selectedHostel}
            onChange={(e) => handleHostelSelect(e.target.value)}
            required
          >
            <option value="">Select Hostel</option>
            {hostels.map((hostel) => (
              <option key={hostel} value={hostel}>
                {hostel}
              </option>
            ))}
          </select>

          <h4>Select Merch:</h4>
          <div className="img-options">
            {images.map((image, index) => (
              <label key={index}>
                <input
                  type="radio"
                  className="radio-image"
                  name="image"
                  value={image}
                  checked={selectedImage === image}
                  onChange={() => setSelectedImage(image)}
                  required
                />
                <img src={image} alt={`Merch ${index + 1}`} />
              </label>
            ))}
          </div>

          <h4>Select Size:</h4>
          <div className="size-options">
            {sizes.map((size) => (
              <label key={size}>
                <input
                  type="radio"
                  name="size"
                  value={size}
                  checked={selectedSize === size}
                  onChange={() => setSelectedSize(size)}
                  required
                />
                {size}
              </label>
            ))}
          </div>

          <div className="terms">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
              required
            />
            <label htmlFor="terms">I agree to the terms and conditions</label>
          </div>
          <div className="error-message">
            {!cookieConsentConfirmed && (
              <p className="error">
                You must accept cookies to submit the form.
              </p>
            )}
          </div>
          <div className="error-message">
            {errorMessage && <p className="error">{errorMessage}</p>}
          </div>
          <div className="success-message">
            {successMessage && <p className="success">{successMessage}</p>}
          </div>

          <div className="button-group">
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className="submit-btn"
            >
              {loading ? "Submitting..." : "SUBMIT"}
            </button>
            <button
              type="button"
              className="submit-btn"
              onClick={() => {
                setName("");
                setEmail("");
                setNumber("");
                setID("");
                setSelectedHostel("");
                setSelectedSize("");
                setSelectedImage("");
                setAgreeTerms(false);
                setErrorMessage("");
                setSuccessMessage("");
                setNameError("");
                setEmailError("");
                setNumberError("");
                setIDError("");
              }}
            >
              RESET
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Info;
