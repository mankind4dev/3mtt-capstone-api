import jwt from "jsonwebtoken"

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ error: "Access Denied." });
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ error: "Invalid token." });
      req.user = user;
      next();
    });
  };

  