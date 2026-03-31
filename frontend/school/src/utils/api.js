// This tells React to look for the secret variable in Vercel
const API_URL = process.env.REACT_APP_API_URL;

if (!API_URL) {
  console.warn("WARNING: REACT_APP_API_URL is not defined! Check Vercel Settings.");
}

export default API_URL;