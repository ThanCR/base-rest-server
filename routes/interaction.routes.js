const {Router} = require('express')
const {interactionGetAll, interactionGet, interactionPost} = require('../controllers/interaction')


const router = Router();


router.get('/', interactionGetAll)
// 83d25f7d6ad
// 00921e658a8
// 1f18c709eb2
router.get('/:id', interactionGet)
router.post('/', interactionPost)

module.exports = router

