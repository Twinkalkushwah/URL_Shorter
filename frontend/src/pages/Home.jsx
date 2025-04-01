import { useEffect, useState } from "react";
import { fetchRecentUrls } from "../utils/api";
import Navbar from "../components/Navbar";
import ShortenUrlForm from "../components/ShortenUrlForm";
import RecentUrls from "../components/RecentUrls";
import '../styles/Home.css';

const Home = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    async function loadUrls() {
      const recents = await fetchRecentUrls();
      setUrls(recents);
    }
    loadUrls();
  }, []);

  const handleUrlShortened = (newUrl) => {
    setUrls([newUrl, ...urls]);
  };

  const handleRemoveUrl = (shortUrl) => {
    setUrls(urls.filter(url => url.shortUrl !== shortUrl)); // Remove URL from the list
  };

  return (
    <div>
      <Navbar />
      <ShortenUrlForm onUrlShortened={handleUrlShortened} />
      <RecentUrls urls={urls} onRemoveUrl={handleRemoveUrl} />
    </div>
  );
};

export default Home;
