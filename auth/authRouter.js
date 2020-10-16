const express = require('express');
const router = express.Router();


router.get('/register', (req, res, next) => {
    const { authCode } = req.query;

    res.send(`code = ${authCode}`);
})

module.exports = router;