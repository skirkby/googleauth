const express = require('express');
const router = express.Router();


router.get('/register', (req, res, next) => {
    const { code } = req.query;

    res.send(`code = ${code}`);
})

module.exports = router;