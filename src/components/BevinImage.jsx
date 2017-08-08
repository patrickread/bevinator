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
      imageUrl: "",
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
        return Promise.resolve(response)
      }
    }).then(response => response.json()).then(json => {

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
        <img src={this.state.imageUrl} />
      </Dropzone>;

    // return <form action="/upload-pic" encType="multipart/form-data" method="post">
    //       <input type="file" name="file" multiple="multiple" /><br />
    //       <input type="submit" value="Upload" />
    //     </form>
  }
}
