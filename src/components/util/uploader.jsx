import React, { Component } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import Dropzone from 'react-dropzone';
import image2base64 from 'image-to-base64';
// const IMG_SERVER = process.env.REACT_APP_IMG;
const IMG_SERVER = process.env.REACT_APP_CDN;
export default class Uploader extends Component {
  constructor(props) {
    super(props);
    this.tmp_id = props.tmp_id;

    this.state = {
      src: null,
      crop: props.crop,
      files: [],
      errorFile: '',
      editing: props.url ? false : true,
      finish: false,
      finalSrc: null,
      fileName: '',
      no_crop: props.no_crop || false,
      dragagain: props.dragagain || false,
      urlfromProp: props.url,
      resetimage: false
    }

    this.onDrop = (files) => {

      const requireWidth = this.props.type == 'horizontal' ? 660 : 414;
      const requireHeight = this.props.type == 'horizontal' ? 414 : 660;
      const errorWidthText = 'Chiều ngang hình ảnh phải lớn hơn ' + requireWidth + 'px';
      const errorheightText = 'Chiều dài hình ảnh phải lớn hơn ' + requireHeight + 'px';
      const errorText = 'Hình ảnh nhỏ hơn kích thước quy định';
      const scope = this;
      scope.setState({ errorFile: '' });

      if (files.length > 0) {
        const reader = new FileReader();
        let fileDroped = files[0];
        reader.readAsDataURL(fileDroped);
        this.setState({ fileName: fileDroped.name });

        
        reader.addEventListener('load', () => {
          let img = new Image();
          img.crossOrigin = '*';
          img.src = reader.result;

          if(this.state.no_crop){
            let blobURL = URL.createObjectURL(this.b64toBlob(reader.result));
            this.setState({
              editing: false, finish: true,finalSrc: blobURL, resetimage: false
            }, () => {
              this.props.handleImageCrop({ blob: blobURL, type: this.props.type, filename: fileDroped.name });
            })
            
          }else{
            img.onload = function () {

              const height = this.height;
              const width = this.width;
              if (width >= requireWidth && height >= requireHeight) {
                scope.setState({ src: reader.result, errorFile: '' });
                scope.setState({ finish: false });
              } else {
                if (width < requireWidth && height < requireHeight) {
                  scope.setState({ errorFile: errorText });
                } else {
                  if (width < requireWidth) {
                    scope.setState({ errorFile: errorWidthText });
                  } else if (height < requireHeight) {
                    scope.setState({ errorFile: errorheightText });
                  }
                }
              }
            };
            
          }
        });
      } else {
        this.setState({ errorFile: 'Image only' })
      }
    };
  }

  b64toBlob(b64Data, contentType = "", sliceSize = 512) {
    b64Data = _.split(b64Data, ';base64,');
    const byteCharacters = atob(b64Data[1]);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {

      const reader = new FileReader();
      reader.addEventListener('load', () =>
        this.setState({ src: reader.result, finish: true, editing: false })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
   
  };

  choseImageCrop = () => {
    this.props.handleImageCrop({ blob: this.state.croppedImageUrl, type: this.props.type, filename: this.state.fileName });
    this.setState({ finalSrc: this.state.croppedImageUrl, finish: true });
  }

  onImageLoaded = image => {

    let src = this.state.src;

    if (src.includes('betacms.saostar.vn')) {
      let blob = new Blob(src)
      let url = URL.createObjectURL(blob)

      fetch(url).then(res => res.blob()).then(blob => {
        var fr = new FileReader()
        fr.onload = () => {
          var b64 = fr.result
          image.src = b64;
        }
        fr.readAsDataURL(blob)
      })

    }
    this.imageRef = image;
    const width = image.width >= image.height ? (image.height / image.width) * 100 : 100;
    const height = image.height >= image.width ? (image.width / image.height) * 100 : 100;
    const x = width === 100 ? 0 : (100 - width) / 2;
    const y = height === 100 ? 0 : (100 - height) / 2;

    this.setState({
      crop: {
        aspect: this.state.crop.aspect,
        width: image.width,
      }
    }
    );


    this.setState({ finish: false });

    return false; // Return false if you set crop state in here.
  };


  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    let { dragagain } = this.state;
    this.setState({ crop, editing: false });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {

      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        this.props.type + 'file.jpeg'
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {

    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    var originWidth = crop.width * scaleX;
    var originHeight = crop.height * scaleY;
    // maximum width/height
    var maxWidth = 1200, maxHeight = 1200 / (16 / 9);
    var targetWidth = originWidth,
      targetHeight = originHeight;
    if (originWidth > maxWidth || originHeight > maxHeight) {
      if (originWidth / originHeight > maxWidth / maxHeight) {
        targetWidth = maxWidth;
        targetHeight = Math.round(maxWidth * (originHeight / originWidth));
      } else {
        targetHeight = maxHeight;
        targetWidth = Math.round(maxHeight * (originWidth / originHeight));
      }
    }
    // set canvas size
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      targetWidth,
      targetHeight
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        blob => {
          if (!blob) {
            // console.error("Canvas is empty");
            return;
          }
          blob.name = fileName;
          window.URL.revokeObjectURL(this.fileUrl);
          this.fileUrl = window.URL.createObjectURL(blob);
          resolve(this.fileUrl);
        },
        "image/png",
        1
      );
    });
  }

  openFinder = () => {
    CKFinder.modal({
      chooseFiles: true,
      chooseFilesOnDblClick: true,
      selectMultiple: false,
      width: 800,
      height: 600,
      connectorInfo: "type=Images&responseType=json&currentFolder=/&id=" + this.tmp_id + "&editorType=normal",
      onInit: (finder) => {
        finder.on('files:choose', (evt) => {
          const file = evt.data.files.first();
          
          let url = file.getUrl();

          if (this.state.no_crop) {
         
            this.setState({
              editing: false, finish: true,finalSrc: url, resetimage: false
            }, () => {
              this.props.noneedcrop({
                'url': url,
                'type': this.props.type
              });
            })

            
          } else {
            image2base64(url) // you can also to use url
              .then(
                (response) => {
                  this.setState({ 
                    src: 'data:image/jpeg;base64,' + response, fileName: file.attributes.name.toLowerCase(),
                    editing: true, finish: false, resetimage: true
                   }, () => {
                  });

                  // this.setState({editing: true, finish: false, src: null, resetimage: true})
                }
              )
              .catch(
                (error) => {
                  console.log(error); //Exepection error....
                }
              )
          }


        });

        // finder.on( 'file:choose:resizedImage', function( evt ) {
        //   var output = document.getElementById( elementId );
        //   output.value = evt.data.resizedUrl;
        // } );
      }
    });
  }

  startDownload(urlImg) {
    let imageURL = urlImg;

    let downloadedImg = new Image;
    downloadedImg.crossOrigin = "Anonymous";
    downloadedImg.addEventListener("load", this.imageReceived, false);
    downloadedImg.src = imageURL;
    return downloadedImg;
  }
  imageReceived() {
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");

    canvas.width = downloadedImg.width;
    canvas.height = downloadedImg.height;

    context.drawImage(downloadedImg, 0, 0);
    imageBox.appendChild(canvas);

    try {
      localStorage.setItem("saved-image-example", canvas.toDataURL("image/png"));
    }
    catch (err) {
      console.log("Error: " + err);
    }
  }
  imageagain = () => {
    this.setState({editing: true, finish: false, src: null, resetimage: true},() =>{
      this.props.handleImageCrop({ blob: "", type: this.props.type, filename: "" });
    })
  }

  render() {
    const { crop, croppedImageUrl, src } = this.state;
    let minWidth = this.props.type == 'horizontal' ? 660 : 414;
    minWidth = this.props.type == 'profile' ? 200 : minWidth;
    const circular = this.props.circular || false;

    let srcImg = '';
    if (this.props.url && !(this.props.url.includes("http://") || this.props.url.includes("https://"))) {
      srcImg = IMG_SERVER + 'uploads/' + this.props.url;
    } else {
      srcImg = this.props.url;
    }

    return (
      <div className={
        (this.props.type !== 'content_image' ? "container-fluid mt-3 " : "w-100 ") +
        (!this.state.editing ? 'dropzone-editing ' : ' ') +
        (this.props.styleImageBackGround !== '' ? 'mr-2' : '')
      }>

        {
          <div className={"dropzone-" + this.props.type}>
            <Dropzone onDrop={this.onDrop} accept='image/*' >
              {({ getRootProps, getInputProps }) => (
                <section className={this.props.type !== 'content_image' ? "container" : ""} onClick={this.openFinder}>
                  <div {...getRootProps({ className: this.props.type !== 'content_image' ? 'dropzone' : '' })}>
                    {/* get from ckfinder */}
                    {/* <input {...getInputProps()} accept="images/png, images/jpeg, images/jpg" /> */}
                    {this.state.editing &&
                      (this.props.type === 'content_image'
                        ?
                        <button className={"btn bg-purple btn-block "}>Chọn ảnh nền</button>
                        :
                        <>
                          <p>Kéo thả ảnh vào đây, hoặc nhấn vào để chọn ảnh.</p>
                          <p>Chỉ chọn ảnh định dạng PNG, JPEG, JPG.</p>
                        </>
                      )
                    }
                    {(this.state.errorFile && this.state.errorFile.length > 0) && <p>{this.state.errorFile}</p>}
                    {!this.state.editing &&
                      (this.props.type === 'content_image'
                        ?
                        <button className="btn bg-purple btn-block">Chọn ảnh nền</button>

                        : <p>Chọn ảnh khác <i className="fas fa-images"></i></p>
                      )
                    }
                  </div>    
                </section>
              )}
             
            </Dropzone>
            {(this.state.finish && this.state.dragagain) && <i className="fas fa-times drag-again" onClick={this.imageagain}></i>}
          </div>
        }

        {(this.state.finish) && <img className="final-image" src={this.state.finalSrc} alt="" />}

        {!this.state.finish &&
          <div className="" style={{ position: 'relative' }}>
            {(this.props.url && !src && !this.state.resetimage) && <img className={`${this.props.circular ? 'cms-avatar' : ''}`} src={srcImg} />}
            {(src && !this.state.no_crop) && (
              <ReactCrop
                src={src}
                crop={crop}
                ruleOfThirds
                // minWidth={minWidth}
                // minHeight={minWidth * crop.aspect}
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
                imageStyle={{ maxHeight: '1000px' }}
                circularCrop={circular}
                renderSelectionAddon={() => <div style={{
                  position: 'absolute', zIndex: '100',
                  left: 0, fontSize: '30px', color: '#fff ',
                  width: "100%", display: "flex", justifyContent: "space-between"

                }}>
                  <i className="fas fa-check" style={{ backgroundColor: "rgba(0,0,0,0.7)", padding: "10px 10px", 
                  cursor: 'pointer', color: '#28a745' }} onClick={this.choseImageCrop}></i>
                  <i className="fas fa-times" style={{ backgroundColor: "rgba(0,0,0,0.7)", padding: "10px 10px", cursor: 'pointer', color: '#bd2130', width: '35px', textAlign: 'center' }} onClick={this.imageagain} ></i>
                </div>}
              />
            )}
          </div>
        }
      </div>
    )
  }
};
