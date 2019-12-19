const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userTransactions = require('../Database/query/userTransactions');

router.post('/register',async (req,res) => {
    const response = await userTransactions.Register(req.body);
    if (response.recordset[0].Status != 0) {
        res.json(response);
    } else {
        res.json({ status: 500, message: "Not working transaction Register!" });
    }
})

router.post('/login', async (req,res) => {
    const response = await userTransactions.Login(req.body);
    if(response.recordset[0].Status != 0){
        const payload = { userName:response.userName};
        const token = jwt.sign(payload,req.app.get('api_key'), { expiresIn: 720 })
        res.json({
            status:true,
            token
        });
    } else {
        res.json({
            status:500,
            message:"Username or password wrong"
        })
    }
})
module.exports = router;