const express = require('express');
const router = express.Router();
const db = require('./pgExport');

router.get('/:hashtag', async (req, res) => {
    let hashtagName = req.params.hashtag;
    console.log(hashtagName)
    try {
        let imgByHashtag = await db.any(
        `SELECT * FROM image_tags
        INNER JOIN images ON images.id = image_tags.img_id
        INNER JOIN tags ON tags.id = image_tags.tag_id
        WHERE tag_name = $1`, hashtagName);
        res.json({
            imgArr: imgByHashtag
        })
    }
    catch(err) {
        res.send("Hashtag does not exist")
    }
})



module.exports = router;