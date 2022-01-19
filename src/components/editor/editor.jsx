import React, { Component } from "react";
import PropTypes from "prop-types";
import CKEditor from "@ckeditor/ckeditor5-react";
import BalloonBlockEditor from "@ckeditor/ckeditor5-editor-balloon/src/ballooneditor";
import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import CKFinder from "@ckeditor/ckeditor5-ckfinder/src/ckfinder";
import CKFinderUploadAdapter from "@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";
import Link from "@ckeditor/ckeditor5-link/src/link";
import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice";
import FontSize from "@ckeditor/ckeditor5-font/src/fontsize";
// import FontColor from "@ckeditor/ckeditor5-font/src/fontcolor";
import FontColor from "../../plugins/ckeditor5/ckeditor5-font-color/src/fontcolor";

// import FontFamily from "@ckeditor/ckeditor5-font/src/fontfamily";
import FontBackgroundColor from "@ckeditor/ckeditor5-font/src/fontbackgroundcolor";
import RemoveFormat from "@ckeditor/ckeditor5-remove-format/src/removeformat";
import WordCount from "@ckeditor/ckeditor5-word-count/src/wordcount";
import Autosave from "@ckeditor/ckeditor5-autosave/src/autosave";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import BlockToolbar from "@ckeditor/ckeditor5-ui/src/toolbar/block/blocktoolbar";
import MediaEmbed from "../../plugins/ckeditor5/ckeditor5-media-embed/src/mediaembed";
import MediaEmbedToolbar from "../../plugins/ckeditor5/ckeditor5-media-embed/src/mediaembedtoolbar";
import EmbedCaption from "../../plugins/ckeditor5/ckeditor5-media-embed/src/embedcaption";
import { removeWpTags } from "../../utils/common";
import CustomUploadAdapterPlugin from "../../libs/CustomUploadAdapterPlugin";
import { ChromePicker } from 'react-color'
import { CompactPicker } from 'react-color'
class Editor extends Component {
  constructor(props) {
    super(props);
    const post = props.post;
    const editorTypeSelected = props.editorTypeSelected;

    let content = removeWpTags(post.content);
    this.myRef = React.createRef();
    this.tmp_id = post.tmp_id || post.id;
    this.title = post.title || "";
    this.countWordsE = 0;
    let that = this;
    this.state = {
      content: content != "" ? content : ` `,
      runUpdate: false,
      editor: null,
      editorConfiguration: {
        plugins: [
          Autoformat,
          Bold,
          Italic,
          BlockQuote,
          CKFinder,
          CKFinderUploadAdapter,
          Heading,
          Image,
          ImageCaption,
          ImageStyle,
          ImageToolbar,
          ImageUpload,
          Link,
          MediaEmbed,
          PasteFromOffice,
          ...(editorTypeSelected.type !== 'normal' ?
            [
              ImageResize,
              FontSize,
              FontColor,
              // FontFamily,
              FontBackgroundColor
            ]
            : []
          ),
          MediaEmbedToolbar,
          RemoveFormat,
          Autosave,
          WordCount,
          Alignment,
          Underline,
          Essentials,
          Paragraph,
          BlockToolbar,
          EmbedCaption
          // SimpleUploadAdapter
        ],
        toolbar: ["bold", "underline", "italic", "link", "removeFormat"],
        blockToolbar: [
          "heading",
          "|",
          // "fontFamily",
          "fontSize",
          "fontColor",
          "fontBackgroundColor",
          "alignment",
          "CKFinder",
          "|",
          "imageUpload",
          "mediaEmbed",
          "blockQuote",
          "|",
          "undo",
          "redo"
        ],
        image: {
          toolbar: [
            "imageTextAlternative",
            "|",
            "imageStyle:full",
            ...(editorTypeSelected.type !== 'normal'
              ? ["|", "imageStyle:side", "|", "imageStyle:alignRight", "|", "imageStyle:alignLeft"]
              : []
            ),
          ],
          styles: [
            "full",
            ...(editorTypeSelected.type !== 'normal'
              ? ["side", "alignRight", "alignLeft"]
              : []
            ),
          ],
          resizeUnit: "px"
        },
        heading: {
          options: [
            { model: 'paragraph', title: 'Bình thường', class: 'ck-heading_paragraph' },
            { model: 'heading3', view: 'h3', title: 'Title', class: 'ck-heading_heading3' }
          ]
        },
        simpleUpload: {
          // The URL the images are uploaded to.
          uploadUrl: `${process.env.REACT_APP_API}/media`,

          // Headers sent along with the XMLHttpRequest to the upload server.
          headers: {}
        },
        ckfinder: {
          // Upload the images to the server using the CKFinder QuickUpload command.
          uploadUrl: process.env.REACT_APP_UPLOAD_URL + "/ck/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json&currentFolder=&id=" + this.tmp_id + "&editorType=" + editorTypeSelected.type,
          options: {

            connectorInfo: 'id=' + this.tmp_id + '&editorType=' + editorTypeSelected.type
          }

        },
        extraPlugins: [CustomUploadAdapterPlugin],
        licenseKey: "UDPD4C6QLM748M7X3MV4AYKSFN4M4",
        postId: post.id,
        placeholder: "Nhập nội dung bài viết",
        wordCount: {
            displayWords: true,
            displayCharacters: true,
            onUpdate (stats) {
              that.countWordsE = stats.words
            }
        }
      },
      stylePicker: false,
      styleColorBackGround: post.content_background || '#fff',
      pickerVisible: false,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {

    if (nextProps.editorTypeSelected !== this.props.editorTypeSelected) {

      // EDITOR TYPE = SPECIAL, MINI => use fontsize, fontcolor, fontfamily, fontbackgroundcolor
      // EDITOR TYPE = NORMAL => not use
      const nextType = nextProps.editorTypeSelected.type;
      const type = this.props.editorTypeSelected.type;
      const node = this.myRef.current;

      if (type === 'normal' && nextType !== 'normal') {
        this.setState({
          editorConfiguration: {
            ...this.state.editorConfiguration,
            plugins: [
              ...this.state.editorConfiguration.plugins,
              FontSize,
              FontColor,
              // FontFamily,
              ImageResize,
              FontBackgroundColor
            ],
            ckfinder: {
              uploadUrl: process.env.REACT_APP_UPLOAD_URL + "/ck/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json&currentFolder=&id=" + this.tmp_id + "&editorType=" + nextType,
              options: {
                connectorInfo: 'id=' + this.tmp_id + '&editorType=' + nextType
              }
            },
            image: {
              toolbar: [
                ...this.state.editorConfiguration.image.toolbar,
                "|", "imageStyle:side", "|", 'imageStyle:alignRight', "|", 'imageStyle:alignLeft'
              ],
              styles: [
                ...this.state.editorConfiguration.image.styles,
                "side", 'alignRight', 'alignLeft'
              ],
              resizeUnit: "px"
            },
          }
        }, () => {
          this.state.editor.destroy().then(() => {
            BalloonBlockEditor.create(node, this.state.editorConfiguration).then(editor => {
              this.setState({ editor: editor });
            });
          });
        });
      } else if (type !== 'normal' && nextType === 'normal') {
        const removedPlugins = [
          FontSize,
          FontColor,
          // FontFamily,
          ImageResize,
          FontBackgroundColor
        ];
        const newImageConfig = {
          toolbar: [
            "imageTextAlternative",
            "|",
            "imageStyle:full"
          ],
          styles: [
            "full"
          ],
          resizeUnit: "px",
        }
        const newConfigPlugins = this.state.editorConfiguration.plugins.filter(p => !removedPlugins.includes(p));
        this.setState({
          editorConfiguration: {
            ...this.state.editorConfiguration,
            plugins: newConfigPlugins,
            ckfinder: {
              uploadUrl: process.env.REACT_APP_UPLOAD_URL + "/ck/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json&currentFolder=&id=" + this.tmp_id + "&editorType=" + nextType,
              options: {
                connectorInfo: 'id=' + this.tmp_id + '&editorType=' + nextType
              }
            },
            image: newImageConfig
          }
        }, () => {
          this.state.editor.destroy().then(() => {
            BalloonBlockEditor.create(node, this.state.editorConfiguration).then(editor => {
              this.setState({ editor: editor });
            });
          });
        });
      } else if (type !== 'normal' && nextType !== 'normal') {
        this.setState({
          editorConfiguration: {
            ...this.state.editorConfiguration,
            ckfinder: {
              uploadUrl: process.env.REACT_APP_UPLOAD_URL + "/ck/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json&currentFolder=&id=" + this.tmp_id + "&editorType=" + nextType,
              options: {
                connectorInfo: 'id=' + this.tmp_id + '&editorType=' + nextType
              }
            },
          }
        }, () => {
          this.state.editor.destroy().then(() => {
            BalloonBlockEditor.create(node, this.state.editorConfiguration).then(editor => {
              this.setState({ editor: editor });
            });
          });
        });

      }

    }

  }

  updateData = (updateData) => {
    let regEx = '';
    let strTxt = updateData.match(/<\s*p[^>]*?><\s*a[^>]*?\.mp4.>(.*?)<\s*\/\s*a><\s*\/\s*p>/g);
    if (strTxt && strTxt.length > 0) {
      this.setState({
        runUpdate: true
      }, () => {
        let pattern = strTxt[0].match(/(http(s)?:\/\/|(w){3}).*?\.(?:mp4)/g);
        let dataReplace = `<figure class="media ck-widget">
            <div class="ck-media__wrapper" data-oembed-url="${pattern[0]}">
            <div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">
            <video style="position:absolute; height: 100%; width: 100%" controls="">
            <source src="${pattern[0]}" type="video/mp4">
            Your browser does not support HTML5 video.
            </video>
            </div>
            </div>
          
            </figure>`
        let newData = updateData.replace(/<\s*p[^>]*?><\s*a[^>]*?\.mp4.>(.*?)<\s*\/\s*a><\s*\/\s*p>/g, dataReplace);
        this.state.editor.setData(newData);

      })

    }
  }

  render() {
    const { content } = this.state;
    const type = this.props.editorTypeSelected.type;
    const bgE = this.props.styleColorBackGround;
    const styleImageBackGround = this.props.styleImageBackGround;

    return (
      <>
        {content != "" && (
          <div style={type == 'special' || type == 'mini' ? {
            backgroundColor: bgE,
            backgroundImage: `url('${styleImageBackGround}')`
          } : {}}>

            <div ref={this.myRef}>
              <CKEditor
                editor={BalloonBlockEditor}
                config={this.state.editorConfiguration}
                data={this.state.content}
                onInit={editor => {
                  // You can store the "editor" and use when it is needed.
                  // console.log("Editor is ready to use!", editor);
                  this.setState({ editor: editor })
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  // process video mp4
                  let strTxt = data.match(/<\s*p[^>]*?><\s*a[^>]*?\.mp4.>(.*?)<\s*\/\s*a><\s*\/\s*p>/g);

                  if (!this.state.updateData && strTxt && strTxt.length > 0) {
                    this.updateData(data);
                  }
                  else {
                    this.setState({ runUpdate: false })
                  }
                  this.props.onChange && this.props.onChange(data);
                }}
                onBlur={(event, editor) => {
                  // console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  // console.log("Focus.", editor);
                }}
              />
              
            </div>
            {type == 'normal' && 
            <blockquote>
            <p>Số từ trong bài viết: {this.countWordsE}.</p>
          </blockquote>
}
          </div>
        )}
      </>

    );
  }
}

Editor.propTypes = {};

export default Editor;
