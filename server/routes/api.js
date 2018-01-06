const express = require('express');
const router = new express.Router();

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "This message was retrieved from the MixIt API"
  });
});

module.exports = router;