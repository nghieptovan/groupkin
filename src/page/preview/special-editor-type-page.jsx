import React, { Component } from 'react';
import { Helmet } from "react-helmet";

class SpecialEditorTypePage extends Component {
  constructor(props) {
    super(props)
  }


  generateCategory = category => {
    category = _.unionBy(category, "_id");
    let stringBuilder = [];
    category.forEach((cat, index) => {
      if (index === 0) {
        let stringBuilder1 = (
          <a
            key={`item-category${cat._id}${index}`}
            className="mr-1"
            href={`/posts?category=${cat._id}&page=1&limit=10`}
          >
            {cat.name}
          </a>
        );
        stringBuilder.push(stringBuilder1);
      }
    });
    return stringBuilder;
  };

  generateTags = tags => {
    tags = _.unionBy(tags, "_id");
    let stringBuilder = [];
    tags.forEach((tag, index) => {
      let stringBuilder1 = (
        <a
          key={`item-tag${tag._id}${index}`}
          // className="mr-1"
          href=""
        >
          {tag.label}
        </a>
      );
      stringBuilder.push(stringBuilder1);
    });
    return stringBuilder;
  };



  render() {
    let {
      postContent: {
        title,
        description,
        content,
        categories,
        contentpenname,
        tags,
        content_background,
        content_image
      }
    } = this.props;
    return (
      <div className="previewpage-saostar" >
        <Helmet>
          <link
            rel="stylesheet"
            href={process.env.PUBLIC_URL + "/assets/css/style.css"}
          />
          <link
            rel="stylesheet"
            href={process.env.PUBLIC_URL + "/assets/css/article_special.css"}
          />
        </Helmet>

        <header className="bg-fff p10-20 display-flex flex-prop-jcsb flex-prop-aic">
          <a href="#">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/logo-saostar.svg"}
              alt=""
              className="w100"
            />
          </a>
          <a href="#">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/logo-special.svg"}
              alt=""
              className="w130"
            />
          </a>
          <div className="w100"></div>
        </header>
        <article className="special-editor-type"

        >

          {/* <h1 className="article-title">{title || "Chưa có tiêu đề"}</h1> */}

          <div className="article-content w-100">
            <div className="">
              {/* <h3 className="sapo">{description}</h3> */}

              <div style={{ backgroundColor: content_background, backgroundImage: `url(${content_image})` }}
              >
                {content ? (
                  <div
                    className="content"
                    dangerouslySetInnerHTML={{ __html: content }}
                    style={{ backgroundColor: "#ececec" }}
                  />
                ) : (
                    <center>
                      <em>Add your custom block in the editor</em>
                    </center>
                  )
                }

              </div>

              <div className="bg-fff p40-0">
                <div className="w1000 ma">
                  <div className="tag pb20 mt20 border-bottom-1-e7e8ea">
                    <span className="keyword">
                      <span className="ssf-tag"></span> Từ khóa:
                </span>
                    {this.generateTags(tags)}
                  </div>

                  {contentpenname && (
                    <div className="mt20 ma article-credit">
                      <span className="item">
                        <span className="label">Bài viết:</span>
                        <span className="value">{contentpenname.label}</span>
                      </span>

                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </article>

        <footer>
          <div className="w1000 ma display-flex flex-prop-jcsb flex-prop-aic f14">
            <a href="home.html">
              <img
                src={process.env.PUBLIC_URL + "/assets/images/logo-saostar.svg"}
                alt=""
                className="logo"
              />
            </a>
            <div className="">
              <span className="vertical-text-top">Kết nối chúng tôi tại </span>
              <a href="">
                <span className="icon ssf-facebook-square"></span>
              </a>
              <a href="">
                <span className="icon ssf-youtube-square"></span>
              </a>
            </div>
          </div>

          <div className="w1000 ma mt20 flex-prop-jcsb display-flex part-2 mt20">
            <div className="column">
              <p>Nguyễn Quang Minh</p>
              <p>Tổng biên tập</p>
            </div>
            <div className="column">
              <p>Vũ Thị Tuyết Vân - Trương Thị Tường Vy</p>
              <p>Phó tổng biên tập</p>
            </div>
            <div className="column">
              <p>Đỗ Thu Trang</p>
              <p>Chịu trách nhiệm nội dung</p>
            </div>
          </div>

          <div className="w1000 ma line-1-5b5b5b mt20"></div>

          <div className="w1000 ma mt20 flex-prop-jcsb display-flex part-3 mt20">
            <div className="column">
              <p>TRỤ SỞ HỒ CHÍ MINH</p>
              <p>179 Lý Chính Thắng, Phường 7, Quận 3, TP.Hồ Chí Minh</p>
            </div>
            <div className="column">
              <p>TRỤ SỞ HÀ NỘI</p>
              <p>Tầng 3, tòa nhà Hanoi Creative City, Số 1 Lương Yên, Hà Nội</p>
            </div>
            <div className="column">
              <p>HỢP TÁC NỘI DUNG</p>
              <p>
                <a href="">info@saostar.vn</a>
              </p>
            </div>
            <div className="column">
              <p>HỢP TÁC QUẢNG CÁO</p>
              <p>
                <a href="">marketing@saostar.vn</a>
              </p>
              <p>
                <a href="">0938 305 588</a>
              </p>
            </div>
          </div>
          <div className="w1000 ma line-1-5b5b5b mt20"></div>
          <div className="w1000 ma mt20 flex-prop-jcsb display-flex flex-prop-aic f14">
            <p className="">
              Giấy phép Tạp chí điện tử Saostar số: 13/GP-BTTTT do Bộ Thông tin
              & Truyền Thông cấp ngày 11/01/2016
            </p>
            <a href="" className="btn-baogia">
              BÁO GIÁ QUẢNG CÁO
            </a>
          </div>
        </footer>
      </div>
    );
  }
}


SpecialEditorTypePage.propTypes = {

};


export default SpecialEditorTypePage;
