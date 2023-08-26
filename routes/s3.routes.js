const express = require('express');
const router = express.Router();

const { getObject, uploadSingle, uploadMultiple, deleteSingle, deleteMultiple } = require('../controllers/s3.controller');
 
router.get('/getobject', getObject);
router.post('/upload/single', uploadSingle);
router.post('/upload/multiple', uploadMultiple);
router.delete('/delete/single', deleteSingle);
router.delete('/delete/multiple', deleteMultiple);
 
module.exports = router;