const router = require('express').Router() 
const {
    register, 
    login, 
    getUser
} = require('../controller/Auth')

router.post('/register', register) 
router.post('/login', login)
router.get('/get-user/:id', getUser)

module.exports = router 