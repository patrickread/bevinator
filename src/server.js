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

            const maskMax = 2
            const maskIndex = Math.floor(Math.random() * maskMax) + 1
            bevinPicPath = path.join(process.env.PWD, '/public/bevin_pics/', 'mask' + maskIndex + '.png')
            bevinImage = images(bevinPicPath)

            incomingImage = images(oldPath)
            const ratio = bevinImage.height() / incomingImage.height()
            const newWidth = incomingImage.width() * ratio
            const combinedPic = incomingImage
                         .resize(newWidth, bevinImage.height(), null)
                         .draw(bevinImage, 0, 0)
                         .encode("png")
            res.status(200);
            res.contentType('image/png');
            res.set('Image-Width', newWidth)
            res.end(combinedPic, 'binary')
      })
    })

    return app
  }
}
