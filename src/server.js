const path = require('path')
      express = require('express')
      formidable = require('formidable'),
      fs = require('fs'),
      images = require('images')


module.exports = {
  app: function () {
    const app = express()
    const indexPath = path.join(__dirname, '/../index.html')
    const publicPath = express.static(path.join(__dirname, '../public'))

    app.use('/public', publicPath)
    app.get('/', function (req, res) {
      res.sendFile(indexPath)
    })

    app.post('/upload-pic', function (req, res) {
      var form = new formidable.IncomingForm();
      form.parse(req, function(err, fields, files) {
        let file = files.file

        let oldPath = file.path,
            fileExt = file.name.split('.').pop(),
            index = oldPath.lastIndexOf('/') + 1,
            fileName = oldPath.substr(index),
            newPath = path.join(process.env.PWD, '/uploads/', fileName + '.' + fileExt);
            bevinPicPath = path.join(process.env.PWD, '/public/bevin_pics/', 'mask1.png')

            bevinImage = images(bevinPicPath)
            incomingImage = images(oldPath)
            const heightDiff = incomingImage.height() - bevinImage.height()
            const combinedPic = incomingImage.draw(bevinImage, 0, heightDiff)
                         .encode("png")
            res.status(200);
            res.contentType('image/png');
            res.end(combinedPic, 'binary')
      })
    })

    return app
  }
}
