const {Router} = require('express')
const {getAllInteractions, getInteraction, postInteraction, getRecentInteractions} = require('../controllers/interaction')


const router = Router();


router.get('/', getAllInteractions)
router.get('/recent/:amount', getRecentInteractions)
// 83d25f7d6ad
// 00921e658a8
// 1f18c709eb2
router.get('/:id', getInteraction)
router.post('/', postInteraction)

module.exports = router

