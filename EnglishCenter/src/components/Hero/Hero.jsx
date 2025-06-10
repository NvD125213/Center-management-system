import { motion } from "framer-motion";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Blob from "../../assets/blob.svg";
import slider1 from "../../assets/Slider/zenlish-banner-web-1.jpg";
import slider2 from "../../assets/Slider/zenlish-banner-web-2.jpg";
import slider3 from "../../assets/Slider/zenlish-banner-web-3.jpg";
import slider4 from "../../assets/Slider/zenlish-banner-web-4.jpg";
import slider5 from "../../assets/Slider/zenlish-chot.jpg";

import a1 from "../../assets/Student/s1.jpg";
import a2 from "../../assets/Student/s2.jpg";
import a3 from "../../assets/Student/a3.jpg";
import a4 from "../../assets/Student/a4.jpg";
import PropTypes from "prop-types";
import Breadcrumb from "../Common/Breadcrumb";

// Sample images - you should replace these with your actual images
const heroImages = [
  {
    src: slider1,
    alt: "English Learning 1",
    title: "Học tiếng Anh hiệu quả",
    description: "Phương pháp học hiện đại, phù hợp với mọi lứa tuổi",
  },
  {
    src: slider2, // Replace with your second image
    alt: "English Learning 2",
    title: "Giáo viên bản xứ",
    description: "Đội ngũ giảng viên chuyên nghiệp, giàu kinh nghiệm",
  },
  {
    src: slider3, // Replace with your third image
    alt: "English Learning 3",
    title: "Môi trường học tập",
    description: "Cơ sở vật chất hiện đại, không gian học tập thoải mái",
  },
  {
    src: slider4, // Replace with your second image
    alt: "English Learning 2",
    title: "Giáo viên bản xứ",
    description: "Đội ngũ giảng viên chuyên nghiệp, giàu kinh nghiệm",
  },
  {
    src: slider5,
    alt: "English Learning 3",
    title: "Môi trường học tập",
    description: "Cơ sở vật chất hiện đại, không gian học tập thoải mái",
  },
];

export const FadeUp = (delay) => {
  return {
    initial: {
      opacity: 0,
      y: 60,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        duration: 0.8,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
};

const Hero = ({ title, breadcrumbPaths }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    fade: true,
    pauseOnHover: true,
    cssEase: "linear",
    customPaging: () => (
      <div className="w-2 h-2 rounded-full bg-[#1976d2]/30 mt-4 transition-all duration-300" />
    ),
    appendDots: (dots) => (
      <div className="flex justify-center items-center gap-2 mt-4">{dots}</div>
    ),
  };

  // If title is provided, render the blue background hero
  if (title) {
    return (
      <section className="relative min-h-[40vh] bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container relative z-10 min-h-[40vh] flex items-center justify-center">
          <div className="w-full max-w-4xl mx-auto px-4">
            <motion.div
              variants={FadeUp(0.4)}
              initial="initial"
              animate="animate"
              className="text-center space-y-6">
              <motion.h1
                variants={FadeUp(0.4)}
                initial="initial"
                animate="animate"
                className="text-4xl pb-2 lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-sky-500 leading-tight">
                {title}
              </motion.h1>
              {breadcrumbPaths && (
                <motion.div
                  variants={FadeUp(0.6)}
                  initial="initial"
                  animate="animate"
                  className="flex justify-center">
                  <Breadcrumb paths={breadcrumbPaths} />
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  // If no title provided, render the full homepage hero
  return (
    <section className="bg-light overflow-hidden relative min-h-screen">
      <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-80px)]">
        {/* Brand Info */}
        <div className="flex flex-col justify-center py-14 md:py-0 relative z-20">
          <div className="text-center md:text-left space-y-8 lg:max-w-[500px]">
            <motion.h1
              variants={FadeUp(0.4)}
              initial="initial"
              animate="animate"
              className="text-4xl lg:text-6xl font-bold !leading-tight">
              Chào mừng đến với{" "}
              <span className="text-[#1976d2] relative">
                EZ CENTER
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute -bottom-2 left-0 h-1 bg-[#1976d2]/30"
                />
              </span>
              <br />
              <span className="text-gray-600 text-3xl font-normal">
                Trung tâm tiếng Anh cho mọi lứa tuổi
              </span>
            </motion.h1>

            <motion.p
              variants={FadeUp(0.6)}
              initial="initial"
              animate="animate"
              className="text-gray-500 text-lg max-w-[400px]">
              Khám phá phương pháp học tiếng Anh hiện đại, hiệu quả và phù hợp
              với mọi đối tượng.
            </motion.p>

            <motion.div
              variants={FadeUp(0.8)}
              initial="initial"
              animate="animate"
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="primary-btn flex items-center gap-2 group px-8 py-4 text-lg">
                Bắt đầu ngay
                <IoIosArrowRoundForward className="text-2xl group-hover:translate-x-2 group-hover:-rotate-45 duration-300" />
              </button>
              <button className="flex items-center gap-3 px-6 py-4 rounded-full border-2 border-gray-200 hover:border-[#1976d2]/50 hover:text-[#1976d2] transition-colors duration-300">
                <span className="w-10 h-10 rounded-full bg-[#1976d2]/10 flex items-center justify-center">
                  <FaPlay className="text-[#1976d2]" />
                </span>
                Xem video giới thiệu
              </button>
            </motion.div>

            <motion.div
              variants={FadeUp(1)}
              initial="initial"
              animate="animate"
              className="flex items-center gap-8 pt-4">
              <div className="flex -space-x-4">
                {[a1, a2, a3, a4].map((image, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                    <img
                      src={image}
                      alt={`Student ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-semibold text-gray-700">10000+</span> học
                viên đã tham gia
              </div>
            </motion.div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex justify-center items-center relative">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-[400px] xl:w-[600px]">
            <Slider {...sliderSettings} className="hero-slider">
              {heroImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="outline-none relative">
                  <div className="relative">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-auto drop-shadow-2xl rounded-lg"
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white rounded-b-lg">
                      <h3 className="text-xl font-semibold mb-2">
                        {image.title}
                      </h3>
                      <p className="text-sm text-gray-200">
                        {image.description}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </Slider>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute -top-6 -right-6 w-24 h-24 bg-secondary/10 rounded-full blur-xl"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-xl"
            />
          </motion.div>

          <motion.img
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            src={Blob}
            alt=""
            className="absolute -bottom-32 w-[800px] md:w-[1500px] z-[1] hidden md:block opacity-50"
          />
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = {
  title: PropTypes.string,
  breadcrumbPaths: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
};

export default Hero;

// Add these styles at the end of your file or in your CSS file
const styles = `
  .hero-slider .slick-dots {
    bottom: -40px;
  }
  
  .hero-slider .slick-dots li button:before {
    display: none;
  }
  
  .hero-slider .slick-dots li {
    margin: 0 4px;
    transition: all 0.3s ease;
  }
  
  .hero-slider .slick-dots li.slick-active div {
    background-color: rgb(59 130 246) !important; /* Using blue-500 color */
    transform: scale(1.2);
    opacity: 1;
  }
  
  .hero-slider .slick-dots li div {
    background-color: rgb(191 219 254) !important; /* Using blue-200 color */
    opacity: 0.5;
    transition: all 0.3s ease;
  }
  
  .hero-slider .slick-dots li:hover div {
    opacity: 0.8;
  }
  
  .hero-slider .slick-slide {
    padding: 0 10px;
  }
  
  .hero-slider .slick-list {
    margin: 0 -10px;
    overflow: visible;
  }

  .hero-slider .slick-track {
    display: flex;
    align-items: center;
  }

  .hero-slider .slick-slide > div {
    outline: none;
  }

  .hero-slider .slick-arrow {
    opacity: 0;
    transition: all 0.3s ease;
  }

  .hero-slider:hover .slick-arrow {
    opacity: 1;
  }

  .hero-slider .slick-arrow:hover {
    transform: scale(1.05);
  }

  .hero-slider .slick-arrow div {
    background: rgba(255, 255, 255, 0.9);
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hero-slider .slick-arrow:hover div {
    background: white;
    transform: scale(1.05);
  }

  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }

  .animate-blob {
    animation: blob 7s infinite;
  }

  .animation-delay-2000 {
    animation-delay: 2s;
  }

  .animation-delay-4000 {
    animation-delay: 4s;
  }
`;

// Add style tag to your component
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
