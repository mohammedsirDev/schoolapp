// 1. Define the variable from the secret Vercel environment
const API_URL = process.env.REACT_APP_API_URL;

// 2. Export it as BOTH default and named to prevent import errors
export { API_URL };
export default API_URL;