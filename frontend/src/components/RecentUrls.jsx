import React from "react";
import swal from "sweetalert";
import "../styles/RecentUrls.css";
import { BASE_URL } from "../utils/api";
const RecentUrls = ({ urls }) => {
  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      swal("Copied to clipboard!", "", "success"); // Show swal when copied
    }).catch(() => {
      swal("Failed to copy", "", "error"); // If something goes wrong
    });
  };

  return (
    <div className="recent-urls">
      <h2>Recent URLs</h2>
      {urls.length === 0 ? <p>No recent URLs</p> : null}
      {urls.map((url, index) => {
        // Dynamically create the full URL
        const fullShortUrl = `${BASE_URL}/${url.shortUrl}`;

        return (
          <div key={index} className="url-item">
            <p>{url.originalUrl}</p>
            <a href={fullShortUrl} target="_blank" rel="noopener noreferrer">
              {fullShortUrl}
            </a>
            <button onClick={() => handleCopy(fullShortUrl)}>
              Copy
            </button>
           
          </div>
        );
      })}
    </div>
  );
};

export default RecentUrls;
