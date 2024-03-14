const express = require('express');
const {formidable} = require('formidable');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
})

router.get('/test1', function(req, res, next) {
  res.render('test1')
})

router.post('/test1', function(req, res, next) {
  const form = formidable({
    uploadDir: __dirname + '/../public/images',
    keepExtensions: true
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err)
      return
    } 
    console.log(fields)
    //console.log(files)
    // res.json({ fields, files })

    let fileImage = '/images/' + files.file[0].newFilename
    res.send(fileImage)
  })
})





module.exports = router
