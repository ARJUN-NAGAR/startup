const sessionAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    next(); // User is logged in via session
  } else {
    res.status(401).json({ message: 'Access denied. Please log in.' });
  }
};

export default sessionAuth;
