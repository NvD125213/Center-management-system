import React from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import gv1 from "../../assets/Teacher/gv1.jpg";
import gv2 from "../../assets/Teacher/gv2.jpg";
import gv3 from "../../assets/Teacher/gv3.jpg";
import gv4 from "../../assets/Teacher/gv4.jpg";
import gv5 from "../../assets/Teacher/gv5.jpg";
import gv6 from "../../assets/Teacher/gv6.png";
import gv7 from "../../assets/Teacher/gv7.jpg";

// Sample teacher data - replace with your actual data
const teachers = [
  {
    name: "Nguyễn Xuân Hoa",
    role: "Giáo viên TOEIC",
    experience: "5 năm kinh nghiệm",
    image: gv1,
    description:
      "Chuyên gia luyện thi TOEIC với phương pháp giảng dạy hiện đại, giúp học viên đạt điểm cao trong thời gian ngắn.",
  },
  {
    name: "Trần Minh Anh",
    role: "Giáo viên Speaking",
    experience: "8 năm kinh nghiệm",
    image: gv2,
    description:
      "Tốt nghiệp Đại học Oxford, chuyên sâu về phát âm và giao tiếp tiếng Anh.",
  },
  {
    name: "Lê Thị Hương",
    role: "Giáo viên Writing",
    experience: "6 năm kinh nghiệm",
    image: gv3,
    description:
      "Chuyên gia về Academic Writing, giúp học viên phát triển kỹ năng viết học thuật.",
  },
  {
    name: "Phạm Văn Minh",
    role: "Giáo viên Listening",
    experience: "7 năm kinh nghiệm",
    image: gv4,
    description:
      "Phương pháp giảng dạy độc đáo, giúp học viên cải thiện kỹ năng nghe hiệu quả.",
  },
  {
    name: "Hoàng Thị Lan",
    role: "Giáo viên Reading",
    experience: "4 năm kinh nghiệm",
    image: gv5,
    description:
      "Chuyên gia về Reading Comprehension, giúp học viên nắm vững kỹ năng đọc hiểu.",
  },
  {
    name: "Nguyễn Văn Tuấn",
    role: "Giáo viên Grammar",
    experience: "9 năm kinh nghiệm",
    image: gv6,
    description:
      "Phương pháp giảng dạy ngữ pháp dễ hiểu, giúp học viên nắm vững kiến thức cơ bản.",
  },
  {
    name: "Trần Thị Mai",
    role: "Giáo viên TOEIC Speaking & Writing",
    experience: "6 năm kinh nghiệm",
    image: gv7,
    description:
      "Chuyên gia về TOEIC Speaking & Writing, giúp học viên phát triển toàn diện kỹ năng giao tiếp.",
  },
];

const styles = `
  .teacher-slider .slick-dots {
    bottom: -40px;
  }
  
  .teacher-slider .slick-dots li button:before {
    display: none;
  }
  
  .teacher-slider .slick-dots li {
    margin: 0 4px;
    transition: all 0.3s ease;
  }
  
  .teacher-slider .slick-dots li.slick-active div {
    background-color: rgb(105, 167, 156) !important;
    transform: scale(1.2);
    opacity: 1;
  }
  
  .teacher-slider .slick-dots li div {
    background-color: rgb(105, 167, 156) !important;
    opacity: 0.3;
    transition: all 0.3s ease;
  }
  
  .teacher-slider .slick-dots li:hover div {
    opacity: 0.8;
  }

  .teacher-slider .slick-prev,
  .teacher-slider .slick-next {
    width: 40px;
    height: 40px;
    background: white;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    z-index: 1;
  }

  .teacher-slider .slick-prev {
    left: -20px;
  }

  .teacher-slider .slick-next {
    right: -20px;
  }

  .teacher-slider .slick-prev:before,
  .teacher-slider .slick-next:before {
    color: rgb(105, 167, 156);
    font-size: 20px;
  }

  .teacher-slider .slick-prev:hover,
  .teacher-slider .slick-next:hover {
    background: rgb(105, 167, 156);
  }

  .teacher-slider .slick-prev:hover:before,
  .teacher-slider .slick-next:hover:before {
    color: white;
  }

  .teacher-slider .slick-slide > div {
    height: 100%;
  }

  .teacher-slider .slick-track {
    display: flex;
    align-items: stretch;
  }

  .teacher-slider .slick-list {
    margin: 0 -12px;
  }

  .teacher-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    min-height: 500px;
    background: white;
    border-radius: 1rem;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .teacher-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  .teacher-card-image {
    height: 300px;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
  }

  .teacher-card-image img {
    width: 100%;
    height: 100%;

    object-position: center;
    transform: scale(1);
    transition: transform 0.3s ease;
  }

  .teacher-card:hover .teacher-card-image img {
    transform: scale(1);
  }

  .teacher-card-image::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, 
      rgba(0,0,0,0) 0%,
      rgba(0,0,0,0.2) 50%,
      rgba(0,0,0,0.6) 100%
    );
    z-index: 1;
  }

  .teacher-card-image-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1.5rem;
    z-index: 2;
    background: linear-gradient(to top, 
      rgba(0,0,0,0.8) 0%,
      rgba(0,0,0,0.4) 60%,
      rgba(0,0,0,0) 100%
    );
  }

  .teacher-card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 180px;
  }

  .teacher-card-description {
    height: 4.5em;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    line-height: 1.5;
  }
`;

const Teacher = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    pauseOnHover: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    customPaging: () => (
      <div className="w-2 h-2 rounded-full bg-[rgb(105,167,156)]/30 mt-4 transition-all duration-300" />
    ),
    appendDots: (dots) => (
      <div className="flex justify-center items-center gap-2 mt-4">{dots}</div>
    ),
  };

  React.useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <section className="bg-[#f7f7f7] py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12">
          <h2 className="text-4xl font-bold  mb-4">Đội ngũ giảng viên</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Đội ngũ giảng viên chuyên nghiệp, giàu kinh nghiệm với phương pháp
            giảng dạy hiện đại
          </p>
        </motion.div>

        <div className="px-4 md:px-8">
          <Slider {...sliderSettings} className="teacher-slider">
            {teachers.map((teacher, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="px-3 h-full">
                <div className="teacher-card">
                  <div className="teacher-card-image">
                    <img
                      src={teacher.image}
                      alt={teacher.name}
                      loading="lazy"
                    />
                    <div className="teacher-card-image-content">
                      <h3 className="text-xl font-semibold text-white line-clamp-1 mb-1">
                        {teacher.name}
                      </h3>
                      <p className="text-sm text-gray-200 line-clamp-1">
                        {teacher.role}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 teacher-card-content">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-[rgb(105,167,156)]/10 text-[#1976d2] rounded-full text-sm whitespace-nowrap">
                        {teacher.experience}
                      </span>
                    </div>
                    <p className="text-gray-600 teacher-card-description">
                      {teacher.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Teacher;
