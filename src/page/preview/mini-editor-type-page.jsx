import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import ImageLoader from "../../components/image-loader/ImageLoader"

class MiniEditorTypePage extends Component {
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
        img_hor,
        tags,
        content_background,
        content_image
      },
      postContent
    } = this.props;

    console.log(this.props.postContent);

    return (
      <div className="previewpage-saostar">
        <Helmet>
          <link
            rel="stylesheet"
            href={process.env.PUBLIC_URL + "/assets/css/style.css"}
          />
          <link
            rel="stylesheet"
            href={process.env.PUBLIC_URL + "/assets/css/article_mini.css"}
          />
        </Helmet>
        <div className="bg-overlay" id="bg-overlay"></div>

        <div className="header-top w1000 ma display-flex flex-prop-jcsb p20-0 m-dis-none">
          <div className="trending">
            <span className="icon ssf-rss color-ed1c24 f18 dis-inline-block"></span>
            <a href="#" className="tag-tab">
              Sơn Tùng
            </a>
            <a href="#" className="tag-tab">
              Showbiz
            </a>
            <a href="#" className="tag-tab">
              U23
            </a>
          </div>
          <div>
            <span className="icon ssf-search f18"></span>
          </div>
        </div>

        <div id="form-search-area">
          <div className="w1000 ma display-flex flex-prop-jcsb flex-prop-aic m-dis-none">
            <a href="#">
              <img
                src={process.env.PUBLIC_URL + "/assets/images/logo-saostar.svg"}
                alt=""
                className="w100"
              />
            </a>

            <span className="icon ssf-cancel f18"></span>
          </div>
        </div>

        <header className="pos-sticky t0 z100 m-dis-none">
          <div className="w1000 ma header-bar h40" id="header-bar">
            <a href="#" className="logo">
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/assets/images/logo-saostar-white.svg"
                }
                alt=""
              />
            </a>
            <a href="#" className="">
              Giải trí
            </a>
            <a href="#" className="">
              Âm nhạc
            </a>
            <a href="#" className="">
              Phim ảnh
            </a>
            <a href="#" className="">
              Thời trang
            </a>
            <a href="#" className="">
              Xã hội
            </a>
            <a href="#" className="">
              Đời sống
            </a>
            <a href="#" className="active">
              Thể thao
            </a>
            <a href="#" className="">
              ESports
            </a>
            <a href="#" className="">
              Công nghệ
            </a>
            <span className="icon ssf-list f24 color-fff"></span>
          </div>
          <div
            className="w1000 ma list-categories fadeIn"
            id="header-list-categories"
          >
            <div className="display-flex flex-prop-jcsb p0-40">
              <div className="w-13">
                <a href="#" className="big-cate underline-ss">
                  Giải trí
                </a>
                <a href="#">TV Show</a>
                <a href="#">Hậu trường</a>
                <a href="#">Phỏng vấn sao</a>
              </div>
              <div className="w-13">
                <a href="#" className="big-cate underline-ss">
                  Âm nhạc
                </a>
                <a href="#">Việt Nam</a>
                <a href="#">Châu Á</a>
                <a href="#">Mỹ</a>
              </div>
              <div className="w-13">
                <a href="#" className="big-cate underline-ss">
                  Phim ảnh
                </a>
                <a href="#">Phim truyền hình</a>
                <a href="#">Phim điện ảnh</a>
                <a href="#">Xine Plus</a>
              </div>
              <div className="w-13">
                <a href="#" className="big-cate underline-ss">
                  Xã hội
                </a>
                <a href="#">Pháp luật</a>
                <a href="#">Thời cuộc</a>
                <a href="#">Màu cuộc sống</a>
              </div>
              <div className="w-13">
                <a href="#" className="big-cate underline-ss">
                  Đời sống
                </a>
                <a href="#">Hẹn yêu</a>
                <a href="#">Phong cách</a>
                <a href="#">Ẩm thực</a>
                <a href="#">Du lịch</a>
              </div>
            </div>
            <div className="display-flex flex-prop-jcsb p0-40 mt30">
              <div className="w-13">
                <a href="#" className="big-cate underline-ss underline-yellow">
                  THE SPECIAL
                </a>
              </div>
              <div className="w-13">
                <a href="#" className="big-cate underline-ss underline-yellow">
                  HOT FACE
                </a>
              </div>
              <div className="w-13">
                <a href="#" className="big-cate underline-ss underline-yellow">
                  FOCUS NEWS
                </a>
              </div>
              <div className="w-13">
                <a href="#" className="big-cate underline-ss underline-yellow">
                  SINH NHẬT SAO
                </a>
              </div>
              <div className="w-13"></div>
            </div>
            <div className="line"></div>
            <div className="display-flex flex-prop-jcsb p0-40">
              <img
                src="assets/images/logo-saostar-white.svg"
                alt=""
                className="w100"
              />
              <div>
                <a href="#" className="icon fb">
                  <span className="ssf-facebook-square"></span>
                </a>
                <a href="#" className="icon">
                  <span className="ssf-youtube-square"></span>
                </a>
              </div>
            </div>
          </div>
        </header>

        <article className="mini-editor-type mt40 w1000 ma m-w-90">

          <div className="article-content mt20" style={{ backgroundColor: content_background, backgroundImage: `url(${content_image})` }}>
            <div className="">
              <img className="w-100" sizes="100vw" srcSet={postContent.cover_m + ' 480w,' + postContent.cover_pc} src={postContent.cover_pc} alt="" />

              <h1 className="w660 ma article-title text-center">{title || "Chưa có tiêu đề"}</h1>

              {
                postContent.series &&
                <div className="text-center">
                  <a className="d-inline-block ma mb-4 bg-red text-white ff-bold fz12 text-uppercase py-1 px-2 bg-hover-black text-hover-white" style={{ fontSize: "12px", fontWeight: "500" }}>{postContent.series.label}</a>
                </div>
              }

              <div className="w660 ma breadcrumb-article text-center">
                {this.generateCategory(categories)}
              </div>
              <div className="">
                <h3 className="w660 ma sapo mt20">{description}</h3>

                {content ? (
                  <div
                    className="content mt20"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                ) : (
                    <center>
                      <em>Add your custom block in the editor</em>
                    </center>
                  )
                }

                {/* {contentpenname && (
                  <div className="w660 ma mt20">
                    <span className="author">
                      <span className="ssf-user"></span> {contentpenname.label}
                    </span>
                  </div>
                )} */}

              </div>
            </div>

          </div>
          <div className="w660 ma tag pb20 mt20 border-bottom-1-e7e8ea">
            <span className="keyword">
              <span className="ssf-tag"></span> Từ khóa:
                </span>
            {this.generateTags(tags)}
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


MiniEditorTypePage.propTypes = {

};


export default MiniEditorTypePage;
