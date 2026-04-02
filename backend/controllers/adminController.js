const jwt = require('jsonwebtoken');

exports.loginAdmin = (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign(
      { email, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    return res.json({
      success: true,
      token,
      admin: { email },
    });
  }

  return res
    .status(401)
    .json({ success: false, message: 'Credenciales inválidas' });
};

exports.verifyAdmin = (req, res) => {
  res.json({ success: true, admin: req.admin });
};
