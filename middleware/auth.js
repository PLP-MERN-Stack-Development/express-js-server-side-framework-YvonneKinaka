// middleware/auth.js

export const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (apiKey === 'mysecretkey') {
    next(); // ✅ Allow access
  } else {
    res.status(401).json({ message: 'Unauthorized: Invalid or missing API key' });
  }
};
