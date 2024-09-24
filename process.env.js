const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    secretKey,
    { expiresIn: '1h' }
);
