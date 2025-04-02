export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const shortenUrl = async (originalUrl) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${BASE_URL}/api/url/shorten`, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ originalUrl }),
    });
    const data = await response.json();
    return data.isOk ? { originalUrl, shortUrl: data.newUrl } : null;
  } catch (error) {
    console.error("Error shortening URL", error);
  }
};

export const fetchRecentUrls = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${BASE_URL}/api/url/recents`, { 
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data.isOk ? data.recent : [];
  } catch (error) {
    console.error("Error fetching URLs", error);
  }
};
