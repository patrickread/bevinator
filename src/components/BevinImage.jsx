import React from 'react'
import Dropzone from 'react-dropzone'
import classNames from 'classnames'

export default class BevinImage extends React.Component {
  constructor(props) {
    super(props)

    this.onDrop = this.onDrop.bind(this)
    this.onDragEnter = this.onDragEnter.bind(this)
    this.onDragLeave = this.onDragLeave.bind(this)

    this.state = {
      imageUrl: "/public/bevin_pics/mask1.png",
      dropzoneActive: false
    }
  }

  onDrop(files) {
    this.setState({
      dropzoneActive: false,
      progress: true
    })

    let formData = new FormData();
    formData.append('file', files[0]);
    let _this = this

    fetch(`/upload-pic`, {
      credentials: 'same-origin',
      method: 'POST',
      body: formData,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    .then(response => {
      if (response.ok) {
        return response.blob()
      }
    }).then(function(blob) {
      const imageSource = 'data:image/png;base64,' + btoa(blob)
      const objectURL = URL.createObjectURL(blob);
      _this.setState({
        imageUrl: objectURL
      })
    }).catch(e => {

    })
  }

  onDragEnter() {
    this.setState({
      dropzoneActive: true
    })
  }

  onDragLeave() {
    this.setState({
      dropzoneActive: false
    })
  }

  render() {
    const dropzoneClasses = classNames('react-dropzone', {
      boldOutline: this.state.dropzoneActive
    })

    return <Dropzone
        className={dropzoneClasses}
        onDrop={this.onDrop}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}>
        <div className="image-background">
          Add Bevin to any pic! Just click to upload a picture, or drag one into here. Suggested image height: 768px.
        </div>
        <img src={this.state.imageUrl} />
      </Dropzone>;
  }
}
