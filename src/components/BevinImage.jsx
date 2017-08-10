import React from 'react'
import Dropzone from 'react-dropzone'
import classNames from 'classnames'
import ReactGA from 'react-ga';

export default class BevinImage extends React.Component {
  constructor(props) {
    super(props)

    this.onDrop = this.onDrop.bind(this)
    this.onDragEnter = this.onDragEnter.bind(this)
    this.onDragLeave = this.onDragLeave.bind(this)

    this.state = {
      imageWidth: "100%",
      imageUrl: "/public/bevin_pics/mask1.png",
      dropzoneActive: false,
      imageDownloaded: false
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
      _this.setState({
        imageWidth: parseInt(response.headers.get("Image-Width"))
      })
      if (response.ok) {
        return response.blob()
      }
    }).then(function(blob) {
      const imageSource = 'data:image/png;base64,' + btoa(blob)
      const objectURL = URL.createObjectURL(blob);
      _this.setState({
        imageUrl: objectURL,
        imageDownloaded: true
      })

      ReactGA.set({ page: "generated-selfie" });
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
    const { imageUrl, imageWidth, imageDownloaded } = this.state
    const dropzoneClasses = classNames('react-dropzone', {
      boldOutline: this.state.dropzoneActive
    })

    let imageStyle = {
      width: imageWidth+"px",
      marginLeft: (-1*imageWidth/2)+"px",
      left: "50%"
    }

    if (isNaN(imageWidth)) {
      imageStyle = {
        width: imageWidth,
        marginLeft: "0px",
        left: "0%"
      }
    }

    return <Dropzone
        className={dropzoneClasses}
        onDrop={this.onDrop}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}>
        <div className="image-background" style={(imageDownloaded) ? {display: "none"} : {}}>
          Add Bevin to any pic! Just click to upload a picture, or drag one into here. Suggested image height: 768px.
        </div>
        <img src={imageUrl} style={imageStyle} />
      </Dropzone>;
  }
}
