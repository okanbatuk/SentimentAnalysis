const express = require('express');
const router = express.Router();
const commentTrans = require('../Database/query/comment')

router.post('/comment', async (req,res) => {
    const comment = await commentTrans.comments(req.body);
    if(comment.recordset[0].Status != 0) {
        res.json(comment);
    } else {
        res.json({ status: 500, message: "Yorum yapılamadı!!!" });
    }
})