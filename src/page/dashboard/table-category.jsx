import React, { Component } from "react";
import RecordRow from "./record-row";

export default class TableCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view_van_hoa_giai_tri: 0,
      view_doi_song_xa_hoi: 0,
      view_dan_ong: 0,
      view_phu_nu: 0
    };
  }

  formatNumber(num) {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return num_parts.join(",");
  }

  render() {
    const { report } = this.props;

    const rows = [
      {
        slug: "/dien-anh/",
        ban: "Văn hoá giải trí",
        muc: "Điện ảnh",
        chi_tieu: 1250000
      },
      {
        slug: "/giai-tri/",
        ban: "Văn hoá giải trí",
        muc: "Giải trí",
        chi_tieu: 1400000
      },
      {
        slug: "/am-nhac/",
        ban: "Văn hoá giải trí",
        muc: "Âm nhạc",
        chi_tieu: 800000
      },
      {
        slug: "tong",
        ban: "van-hoa-giai-tri",
        muc: "Tổng",
        chi_tieu: 3450000
      },
      {
        slug: "/xa-hoi/",
        ban: "Đời sống xã hội",
        muc: "Xã hội",
        chi_tieu: 400000
      },
      {
        slug: "/doi-song/",
        ban: "Đời sống xã hội",
        muc: "Đời sống",
        chi_tieu: 350000
      },
      {
        slug: "/sinh-vien-tv/",
        ban: "Đời sống xã hội",
        muc: "Sinh viên TV",
        chi_tieu: 200000
      },
      {
        slug: "/the-gioi/",
        ban: "Đời sống xã hội",
        muc: "Thế giới",
        chi_tieu: 150000
      },
      {
        slug: "tong",
        ban: "doi-song-xa-hoi",
        muc: "Tổng",
        chi_tieu: 1000000
      },
      {
        slug: "/the-thao/",
        ban: "Đàn ông",
        muc: "Thể thao",
        chi_tieu: 300000
      },
      {
        slug: "/cong-nghe/",
        ban: "Đàn ông",
        muc: "Công nghệ - Xe",
        chi_tieu: 100000
      },
      {
        slug: "tong",
        ban: "dan-ong",
        muc: "Tổng",
        chi_tieu: 400000
      },
      {
        slug: "/thoi-trang/",
        ban: "Phụ nữ",
        muc: "Thời trang",
        chi_tieu: 550000
      },
      {
        slug: "/dep-360/",
        ban: "Phụ nữ",
        muc: "Đẹp 360",
        chi_tieu: 80000
      },
      {
        slug: "/gia-dinh-sao/",
        ban: "Phụ nữ",
        muc: "Gia đình sao",
        chi_tieu: 80000
      },
      {
        slug: "tong",
        ban: "phu-nu",
        muc: "Tổng",
        chi_tieu: 700000
      },
      {
        slug: "/",
        ban: "",
        muc: "Trang chủ",
        chi_tieu: 400000
      }
    ];

    const slugVanHoaGiaiTri = ["/dien-anh/", "/giai-tri/", "/am-nhac/"];
    const slugDoiSongXaHoi = [
      "/xa-hoi/",
      "/doi-song/",
      "/sinh-vien-tv/",
      "/the-gioi/"
    ];
    const slugDanOng = ["/the-thao/", "/cong-nghe/"];
    const slugPhuNu = ["/thoi-trang/", "/dep-360/", "/gia-dinh-sao/"];

    let view_van_hoa_giai_tri = 0;
    let view_doi_song_xa_hoi = 0;
    let view_dan_ong = 0;
    let view_phu_nu = 0;

    if (report) {
      const reportRows = report.data.rows;
      reportRows.forEach(item => {
        const slug = item.dimensions[0];
        const view = parseInt(item.metrics[0].values[0], 10);

        if (slugDoiSongXaHoi.includes(slug)) {
          view_doi_song_xa_hoi = view_doi_song_xa_hoi + view;
        } else if (slugVanHoaGiaiTri.includes(slug)) {
          view_van_hoa_giai_tri = view_van_hoa_giai_tri + view;
        } else if (slugDanOng.includes(slug)) {
          view_dan_ong = view_dan_ong + view;
        } else if (slugPhuNu.includes(slug)) {
          view_phu_nu = view_phu_nu + view;
        }
      });
    }

    return (
      <>
        {report && (
          <table className="m-0 table table-valign-middle">
            <thead>
              <tr>
                <th>Ban</th>
                <th>Mục</th>
                <th>Chỉ tiêu</th>
                <th>Đạt chỉ tiêu</th>
                <th style={{ width: "150px" }}>View bài viết</th>
              </tr>
            </thead>
            <tbody>
              {report ? (
                rows.map((row, idx) => {
                  let view = 0;
                  if (row.slug === "tong") {
                    switch (row.ban) {
                      case "van-hoa-giai-tri":
                        view = view_van_hoa_giai_tri;
                        break;
                      case "doi-song-xa-hoi":
                        view = view_doi_song_xa_hoi;
                        break;
                      case "dan-ong":
                        view = view_dan_ong;
                        break;
                      case "phu-nu":
                        view = view_phu_nu;
                        break;
                    }
                  } else {
                    const item = report.data.rows.filter(
                      item => item.dimensions[0] === row.slug
                    )[0];
                    view = item.metrics[0].values[0];
                  }
                  const dat_chi_tieu = (view / row.chi_tieu) * 100;

                  return (
                    <tr
                      key={row.slug + idx}
                      style={row.slug === "tong" ? { fontWeight: "bold" } : {}}
                      className={
                        row.slug === "tong" ? "bg-gradient-primary" : ""
                      }
                    >
                      <td>{row.slug !== "tong" ? row.ban : ""}</td>
                      <td>{row.muc}</td>
                      <td>{this.formatNumber(row.chi_tieu)}</td>
                      <td
                        className={
                          row.slug === "tong"
                            ? "text-light"
                            : dat_chi_tieu > 100
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        {parseFloat(dat_chi_tieu).toFixed(2) + "%"}
                      </td>
                      <td>{this.formatNumber(view)}</td>
                    </tr>
                  );
                })
              ) : (
                <tr className="odd">
                  <td valign="top" colSpan="8" className="dataTables_empty">
                    Chưa có thông tin
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </>
    );
  }
}
