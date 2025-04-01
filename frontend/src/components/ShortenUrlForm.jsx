import { useState } from "react";
import { shortenUrl } from "../utils/api";
import "../styles/ShortenUrlForm.css";

const ShortenUrlForm = ({ onUrlShortened }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return alert("Enter a valid URL");

    setLoading(true); // Set loading to true when request starts

    try {
      const response = await shortenUrl(url); // Make API call to backend to shorten the URL
      if (response && response.shortUrl) {
        // Pass the shortened URL back to the parent component
        onUrlShortened({ originalUrl: url, shortUrl: response.shortUrl });
        setUrl(""); // Clear input field
      } else {
        alert("Unable to generate short URL");
      }
    } catch (error) {
      alert("Error shortening the URL");
    } finally {
      setLoading(false); // Set loading to false once the request finishes
    }
  };

  return (
    <div className="shorten-form">
      <h1>URL Shortener</h1>
      <input
        type="url"
        placeholder="Enter link here"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
            {loading && <div className="loader"></div>}

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Shortening..." : "Shorten URL"} {/* Change button text */}
      </button>
      
      {/* Loader (You can customize the loader style here) */}
    </div>
  );
};

export default ShortenUrlForm;
