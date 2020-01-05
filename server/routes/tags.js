const express = require('express');
const router = express.Router();
const db = require('./pgExport');

router.get('/:hashtag', async (req, res) => {
    let hashtagName = req.params.hashtag;
    console.log(hashtagName)
    try {
        let imgByHashtag = await db.any(
        `SELECT img_src FROM images 
        INNER JOIN image_tags ON images.img_src = 
        WHERE tag_name = $1`, hashtagName);
        res.send(imgByHashtag)
    }
    catch(err) {
        res.send(err)
    }
})



module.exports = router;