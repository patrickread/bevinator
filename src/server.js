const path = require('path')
      express = require('express')
      formidable = require('formidable'),
      fs = require('fs')


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

        var old_path = file.path,
            file_size = file.size,
            file_ext = file.name.split('.').pop(),
            index = old_path.lastIndexOf('/') + 1,
            file_name = old_path.substr(index),
            new_path = path.join(process.env.PWD, '/uploads/', file_name + '.' + file_ext);
            console.log("new path: " + new_path)

            fs.readFile(old_path, function(err, data) {
              fs.writeFile(new_path, data, function(err) {
                fs.unlink(old_path, function(err) {
                  if (err) {
                      res.status(500);
                      res.json({'success': false});
                  } else {
                      res.status(200);
                      res.redirect("/")
                  }
                });
              });
            });
      })
    })

    return app
  }
}
