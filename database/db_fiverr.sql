-- -------------------------------------------------------------
-- TablePlus 5.4.0(504)
--
-- https://tableplus.com/
--
-- Database: db_fiverr
-- Generation Time: 2023-08-21 10:25:51.6160
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `BinhLuan` (
  `binh_luan_id` int NOT NULL AUTO_INCREMENT,
  `congViec_id` int DEFAULT NULL,
  `nguoi_dung_id` int DEFAULT NULL,
  `ngay_binh_luan` datetime DEFAULT NULL,
  `noi_dung` varchar(100) DEFAULT NULL,
  `sao_binh_luan` int DEFAULT NULL,
  PRIMARY KEY (`binh_luan_id`),
  KEY `congViec_id` (`congViec_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `BinhLuan_ibfk_1` FOREIGN KEY (`congViec_id`) REFERENCES `CongViec` (`congViec_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `BinhLuan_ibfk_2` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `NguoiDung` (`nguoi_dung_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ChiTietLoaiCongViec` (
  `chiTiet_id` int NOT NULL AUTO_INCREMENT,
  `ten_chi_tiet` varchar(100) DEFAULT NULL,
  `hinh_anh` text,
  `loaiCongViec_id` int DEFAULT NULL,
  `nhom_chi_tiet_loai` text,
  PRIMARY KEY (`chiTiet_id`),
  KEY `loaiCongViec_id` (`loaiCongViec_id`),
  CONSTRAINT `ChiTietLoaiCongViec_ibfk_1` FOREIGN KEY (`loaiCongViec_id`) REFERENCES `LoaiCongViec` (`loaiCongViec_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `CongViec` (
  `congViec_id` int NOT NULL AUTO_INCREMENT,
  `ten_cong_viec` varchar(100) DEFAULT NULL,
  `danh_gia` int DEFAULT NULL,
  `gia_tien` int DEFAULT NULL,
  `hinh_anh` text,
  `mo_ta` text,
  `mo_ta_ngan` text,
  `sao_cong_viec` int DEFAULT NULL,
  `chiTiet_id` int DEFAULT NULL,
  `nguoi_dung_id` int DEFAULT NULL,
  PRIMARY KEY (`congViec_id`),
  KEY `chiTiet_id` (`chiTiet_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `CongViec_ibfk_1` FOREIGN KEY (`chiTiet_id`) REFERENCES `ChiTietLoaiCongViec` (`chiTiet_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `CongViec_ibfk_2` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `NguoiDung` (`nguoi_dung_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `LoaiCongViec` (
  `loaiCongViec_id` int NOT NULL AUTO_INCREMENT,
  `ten_loai_cong_viec` varchar(100) DEFAULT NULL,
  `hinh_anh` text,
  PRIMARY KEY (`loaiCongViec_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `NguoiDung` (
  `nguoi_dung_id` int NOT NULL AUTO_INCREMENT,
  `ten_nguoi_dung` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `pass_word` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `birth_day` varchar(100) DEFAULT NULL,
  `gender` varchar(100) DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  `skill` varchar(100) DEFAULT NULL,
  `certification` varchar(100) DEFAULT NULL,
  `hinh_dai_dien` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ThueCongViec` (
  `thue_cong_viec_id` int NOT NULL AUTO_INCREMENT,
  `ngay_thue` datetime DEFAULT NULL,
  `hoan_thanh` tinyint(1) DEFAULT NULL,
  `congViec_id` int DEFAULT NULL,
  `nguoi_dung_id` int DEFAULT NULL,
  PRIMARY KEY (`thue_cong_viec_id`),
  KEY `congViec_id` (`congViec_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `ThueCongViec_ibfk_1` FOREIGN KEY (`congViec_id`) REFERENCES `CongViec` (`congViec_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ThueCongViec_ibfk_2` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `NguoiDung` (`nguoi_dung_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `BinhLuan` (`binh_luan_id`, `congViec_id`, `nguoi_dung_id`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`) VALUES
(1, 1, 1, '2023-08-01 09:00:00', 'Great job!', 5),
(2, 1, 2, '2023-08-02 10:30:00', 'Well done!', 4),
(3, 2, 1, '2023-08-03 11:15:00', 'Excellent work!', 5),
(5, 2, 4, '2023-08-04 14:20:00', 'Good effort.', 4),
(6, 4, 1, '2023-08-05 08:45:00', 'Satisfactory.', 3),
(7, 1, 5, '2023-08-06 12:30:00', 'Impressive!', 5),
(9, 2, 6, '2023-08-08 14:10:00', 'Keep it up!', 4),
(10, 4, 4, '2023-08-09 15:00:00', 'Not bad.', 3),
(11, 5, 3, '2023-08-10 16:30:00', 'Outstanding!', 5),
(12, 1, 7, '2023-08-11 10:45:00', 'Very impressive work!', 5),
(13, 5, 8, '2023-08-12 11:55:00', 'Awesome job!', 5),
(15, 2, 10, '2023-08-14 12:40:00', 'Good job!', 4),
(16, 5, 1, '2023-08-15 14:50:00', 'Brilliant!', 5),
(17, 4, 5, '2023-08-16 15:30:00', 'Could have been better.', 3),
(19, 5, 12, '2023-08-18 11:10:00', 'Fantastic effort!', 5),
(20, 1, 6, '2023-08-19 16:00:00', 'Great work!', 5),
(21, 5, 2, '2023-08-17 08:22:25', 'great', 3),
(22, 4, 2, '2023-08-18 04:07:07', 'very nice', 3),
(24, 4, 2, '2023-08-18 04:07:07', 'very nice', 3),
(27, 4, 3, '2023-08-18 04:58:01', 'string', 3),
(29, 5, 1, '2023-08-20 14:28:44', 'not bad', 2);

INSERT INTO `ChiTietLoaiCongViec` (`chiTiet_id`, `ten_chi_tiet`, `hinh_anh`, `loaiCongViec_id`, `nhom_chi_tiet_loai`) VALUES
(1, 'Logo Design', 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/109611151/original/42d4814c676b9f4320152d541bb6c8be7cd83d39/design-3-professional-logo-for-you-in-24-hours.jpg', 1, 'Logo & Brand Identity,\nLogo Design,\nBrand Style Guides,\nBusiness Cards & Stationery, \nFonts & Typography, \nLogo Maker Tool, '),
(2, 'Brand Style Guides', 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/279535442/original/6c141fa771168792c0cb3239acf1876f9ad0a316/design-3-modern-minimalist-flat-business-logo-design.jpg', 1, 'Logo & Brand Identity,\nLogo Design,\nBrand Style Guides,\nBusiness Cards & Stationery, \nFonts & Typography, \nLogo Maker Tool, '),
(3, 'Business Cards & Stationery', 'https://res.cloudinary.com/upwork-cloud/image/upload/c_fill,h_300,w_400/catalog-ui-assets/taxonomy/category/business-cards-stationery-design.jpg', 1, 'Logo & Brand Identity,\nLogo Design,\nBrand Style Guides,\nBusiness Cards & Stationery, \nFonts & Typography, \nLogo Maker Tool, '),
(4, 'Fonts & Typography', 'https://bs-uploads.toptal.io/blackfish-uploads/components/seo/content/og_image_file/og_image/1140646/typeface-classification-f1707430870c13c8f86e2b71fa0c7f48.png', 1, 'Logo & Brand Identity,\nLogo Design,\nBrand Style Guides,\nBusiness Cards & Stationery, \nFonts & Typography, \nLogo Maker Tool, '),
(5, 'Logo Maker Tool', 'https://cdn.pizap.com/pizapfiles/images/logo_maker_design_app02.jpg', 1, 'Logo & Brand Identity,\nLogo Design,\nBrand Style Guides,\nBusiness Cards & Stationery, \nFonts & Typography, \nLogo Maker Tool, '),
(6, 'Business Websites', 'https://www.rasmussen.edu/images/rasmussenlibraries/admissions/print-design-(1).jpg', 2, 'Business Websites,\nE-Commerce Development,\nLanding Pages,\nBlogs,\nPortfolio,'),
(7, 'E-Commerce Development', 'https://www.magetop.com/blog/wp-content/uploads/2022/06/E-Commerce-Development-Bloom-IT.jpg', 2, 'Business Websites,\nE-Commerce Development,\nLanding Pages,\nBlogs,\nPortfolio,'),
(8, 'Landing Pages', 'https://assets-global.website-files.com/5b5729421aca332c60585f78/63f5fa23da820b87c87958be_61ba503872080311dde1ea56_long-form-landing-page-examples.png', 2, 'Business Websites,\nE-Commerce Development,\nLanding Pages,\nBlogs,\nPortfolio,'),
(9, 'Software Development', 'https://blog.planview.com/wp-content/uploads/2020/01/Top-6-Software-Development-Methodologies.jpg', 2, 'Web Applications,\nDesktop Applications,\nAPIs & Integrations,\nScripting,\nBrowser Extensions'),
(10, 'Search Engine Optimization (SEO)', 'https://www.oberlo.com/media/1603954182-seo-article-header.png?fit=max&fm=jpg&w=1824', 3, 'Search Engine Optimization (SEO), \nSearch Engine Marketing (SEM), \nLocal SEO, \nE-Commerce SEO, \nVideo SEO, '),
(11, 'Search Engine Marketing (SEM)', 'https://cdn.shopify.com/s/files/1/0070/7032/files/search_engine_marketing.png?format=jpg&quality=90&v=1650662771', 3, 'Search Engine Optimization (SEO), \nSearch Engine Marketing (SEM), \nLocal SEO, \nE-Commerce SEO, \nVideo SEO, '),
(12, 'Local SEO', 'Local SEO', 3, 'Search Engine Optimization (SEO), \nSearch Engine Marketing (SEM), \nLocal SEO, \nE-Commerce SEO, \nVideo SEO, '),
(13, 'E-Commerce SEO', 'E-Commerce SEO', 3, 'Search Engine Optimization (SEO), \nSearch Engine Marketing (SEM), \nLocal SEO, \nE-Commerce SEO, \nVideo SEO, '),
(14, 'Social Media Marketing', 'Social Media Marketing', 3, 'Social Media Marketing, \nPaid Social Media, \nInfluencer Marketing, \nCommunity Management, '),
(15, 'Video Editing', 'Video Editing', 4, 'Video Editing, \nVisual Effects, \nVideo Art,  \nIntro & Outro Videos, \nVideo Templates Editing, \nSubtitles & Captions, '),
(16, 'Video Art', 'Video Art', 4, 'Video Editing, \nVisual Effects, \nVideo Art,  \nIntro & Outro Videos, \nVideo Templates Editing, \nSubtitles & Captions, '),
(17, 'Intro & Outro Videos', 'Intro & Outro Videos', 4, 'Video Editing, \nVisual Effects, \nVideo Art,  \nIntro & Outro Videos, \nVideo Templates Editing, \nSubtitles & Captions, '),
(18, 'Subtitles & Captions', 'Subtitles & Captions', 4, 'Video Editing, \nVisual Effects, \nVideo Art,  \nIntro & Outro Videos, \nVideo Templates Editing, \nSubtitles & Captions, '),
(19, 'Articles & Blog Posts', 'Articles & Blog Posts', 5, 'Articles & Blog Posts, \nContent StrategyNEW, \nBook & eBook Writing, \nWebsite Content, \nScriptwriting, \nCreative Writing, \nPodcast Writing, \nSpeechwriting, \nResearch & Summaries, \nCustom Writing Prompts, '),
(20, 'Content Strategy', 'Content Strategy', 5, 'Articles & Blog Posts, \nContent Strategy, \nBook & eBook Writing, \nWebsite Content, \nScriptwriting, \nCreative Writing, \nPodcast Writing, \nSpeechwriting, \nResearch & Summaries, \nCustom Writing Prompts, '),
(21, 'Book & eBook Writing', 'Book & eBook Writing', 5, 'Articles & Blog Posts, \nContent Strategy, \nBook & eBook Writing, \nWebsite Content, \nScriptwriting, \nCreative Writing, \nPodcast Writing, \nSpeechwriting, \nResearch & Summaries, \nCustom Writing Prompts, '),
(22, 'Website Content', 'Website Content', 5, 'Articles & Blog Posts, \nContent Strategy, \nBook & eBook Writing, \nWebsite Content, \nScriptwriting, \nCreative Writing, \nPodcast Writing, \nSpeechwriting, \nResearch & Summaries, \nCustom Writing Prompts, '),
(23, 'Scriptwriting', 'Scriptwriting', 5, 'Articles & Blog Posts, \nContent Strategy, \nBook & eBook Writing, \nWebsite Content, \nScriptwriting, \nCreative Writing, \nPodcast Writing, \nSpeechwriting, \nResearch & Summaries, \nCustom Writing Prompts, '),
(24, 'Podcast Writing', 'Podcast Writing', 5, 'Articles & Blog Posts, \nContent Strategy, \nBook & eBook Writing, \nWebsite Content, \nScriptwriting, \nCreative Writing, \nPodcast Writing, \nSpeechwriting, \nResearch & Summaries, \nCustom Writing Prompts, '),
(25, 'Producers & Composers', 'Producers & Composers', 6, 'Producers & Composers, \nSingers & Vocalists, \nSession Musicians, \nSongwriters, \nBeat Making, \nJingles & Intros, '),
(26, 'Songwriters', 'Songwriters', 6, 'Producers & Composers, \nSingers & Vocalists, \nSession Musicians, \nSongwriters, \nBeat Making, \nJingles & Intros, '),
(27, 'Voice Over & Narration', 'Voice Over & Narration', 6, 'Producers & Composers, \nSingers & Vocalists, \nSession Musicians, \nSongwriters, \nBeat Making, \nJingles & Intros, '),
(28, 'Session Musicians', 'Session Musicians', 6, 'Producers & Composers, \nSingers & Vocalists, \nSession Musicians, \nSongwriters, \nBeat Making, \nJingles & Intros, '),
(29, 'Beat Making', 'Beat Making', 6, 'Producers & Composers, \nSingers & Vocalists, \nSession Musicians, \nSongwriters, \nBeat Making, \nJingles & Intros, '),
(30, 'Business Registration', 'Business Registration', 7, 'Business Registration, \nBusiness Plans, \nPitch Decks, \nStartup Consulting, '),
(31, 'Business Plans', 'Business Plans', 7, 'Business Registration, \nBusiness Plans, \nPitch Decks, \nStartup Consulting, '),
(32, 'Pitch Decks', 'Pitch Decks', 7, 'Business Registration, \nBusiness Plans, \nPitch Decks, \nStartup Consulting, '),
(33, 'Startup Consulting', 'Startup Consulting', 7, 'Business Registration, \nBusiness Plans, \nPitch Decks, \nStartup Consulting, '),
(34, 'Data Entry', 'Data Entry', 8, 'Data'),
(35, 'Data Typing', 'Data Typing', 8, 'Data'),
(36, 'Product Photographers', 'Product Photographers', 9, 'Photography'),
(37, 'Food Photographers', 'Food Photographers', 9, 'Photography'),
(38, 'Lifestyle & Fashion Photographers', 'Lifestyle & Fashion Photographers', 9, 'Photography'),
(39, 'AI Applications', 'AI Applications', 10, 'AI Services'),
(40, 'Illustration', NULL, 1, 'Illustration, AI ArtistsNEW, Children\'s Book Illustration, Portraits & Caricatures, Cartoons & Comics, Pattern Design, Tattoo Design, Storyboards, NFT Art'),
(41, 'Portraits & Caricatures', NULL, 1, 'Illustration, AI ArtistsNEW, Children\'s Book Illustration, Portraits & Caricatures, Cartoons & Comics, Pattern Design, Tattoo Design, Storyboards, NFT Art'),
(42, 'Online seller', NULL, NULL, NULL),
(43, 'security', NULL, NULL, NULL);

INSERT INTO `CongViec` (`congViec_id`, `ten_cong_viec`, `danh_gia`, `gia_tien`, `hinh_anh`, `mo_ta`, `mo_ta_ngan`, `sao_cong_viec`, `chiTiet_id`, `nguoi_dung_id`) VALUES
(1, 'Create modern minimalist flat logo design ', 3, 100, 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto.jpg', 'I will create modern minimalist flat logo design for your business', 'I will create modern minimalist flat logo design for your business', 3, 1, 1),
(2, 'design vintage retro minimalist business logo', 3, 100, 'https://fiverr-res.cloudinary.com/images/.jpg', 'Hello, \n\nI will design vintage retro minimalist business logo in 24hrs', 'I will design vintage retro minimalist business logo in 24hrs', 3, 1, 1),
(4, 'create a modern minimalist and luxury logo design', 3, 100, 'https://fiverr-res.cloudinary.com/images/design.jpg', 'I will create a modern minimalist and luxury logo design', 'I will create a modern minimalist and luxury logo design', 3, 1, 2),
(5, 'Portraits & Caricatures', 3, 200, 'Portraits & Caricatures', 'I will create modern brand identity and business logo design', 'I will create modern brand identity and business logo design', 3, 2, 3),
(6, 'create a logo, brand identity and guidelines', 3, 100, 'Cartoons & Comics', 'I will create a logo, brand identity and guidelines', 'Cartoons & Comics', 3, 2, 8),
(7, 'design modern brand identity and brand style guide', 3, 100, 'Business Cards & Stationery', 'I will design modern brand identity and brand style guide', 'I will design modern brand identity and brand style guide', 3, 2, 6),
(8, 'Business Cards & Stationery', 3, 100, 'Business Cards & Stationery', 'I will design logo business card letterhead folder all stationery', 'I will design logo business card letterhead folder all stationery', 3, 3, 5),
(9, 'Business Cards & Stationery', 3, 100, 'https://fiverr-res.cloudinary.com/images/.jpg', 'I will design amazing and creative business card', 'I will design amazing and creative business card', 3, 3, 1),
(10, 'Business website development', 3, 100, 'Business Websites', 'I will build your professional wix website with unlimited revisions', 'I will build your professional wix website with unlimited revisions', 3, 6, 1),
(11, 'Business website development', 3, 100, 'E-Commerce Development', 'I will design your website xxxhighendxxx', 'I will design your website xxxhighendxxx', 3, 6, 1),
(12, 'Business website development', 3, 100, 'Landing Pages', 'I will convert figma to wordpress with elementor pro', 'I will convert figma to wordpress with elementor pro', 3, 6, 1),
(13, 'Business website development', 3, 100, 'Portfolio', 'I will build database driven website in asp net mvc', 'I will build database driven website in asp net mvc', 3, 6, 1),
(14, 'Web Applications', 3, 100, 'Web Applications', 'I will develop professional CRM of any type for your needs', 'develop professional CRM', 3, 9, 4),
(15, 'Web Applications', 3, 100, 'http://localhost:8080/public/img/1692184531371webApp.jpeg', 'software development services', 'software development services', 3, 9, 11),
(16, 'Desktop Applications', 3, 100, 'APIs & Integrations', 'develop complete software or do customization', 'develop complete software or do customization', 3, 9, 10),
(17, 'Desktop Applications', 3, 100, 'Scripting', 'develop windows, linux and mac desktop applications', 'develop windows, linux and mac desktop applications', 3, 9, 2),
(18, 'Fonts & Typography', 3, 100, 'Industrial & Product Design', 'I will make a custom font for you to use it in your projects', 'I will make a custom font for you to use it in your projects', 3, 4, 8),
(19, 'Fonts & Typography', 3, 100, 'Character Modeling', 'I will design font custom font design typography ttf otf font files', 'I will design font custom font design typography ttf otf font files', 3, 4, 6),
(20, 'Fonts Design ', 3, 100, 'Game Art', 'I will create modify and design amazing fonts', 'I will create modify and design amazing fonts', 3, 4, 5),
(22, 'Intro & Outro Videos', 3, 100, 'Logo Animation', 'I will create custom logo animation youtube intro and outro', 'I will create custom logo animation youtube intro and outro', 3, 17, 8),
(23, 'Intro & Outro Videos', 3, 100, 'Character Animation', 'I will create your cinematic intro', 'I will create your cinematic intro', 3, 17, 9),
(24, 'Intro & Outro Videos', 3, 100, 'I will do youtube intro and outro, logo animation, or trailer', 'I will do youtube intro and outro, logo animation, or trailer', 'I will do youtube intro and outro, logo animation, or trailer', 3, 17, 12),
(25, 'Intro & Outro Videos', 3, 100, 'Animation for Kids', 'I will do youtube intro outro video trailer promo or animated logo', 'I will do youtube intro outro video trailer promo or animated logo', 3, 17, 6);

INSERT INTO `LoaiCongViec` (`loaiCongViec_id`, `ten_loai_cong_viec`, `hinh_anh`) VALUES
(1, 'Graphics & Design', 'http://localhost:8080/public/img/1692177282088Logo and Design.jpeg'),
(2, 'Programming & Tech', 'https://cdn-developer-wp.arc.dev/wp-content/uploads/2022/03/best-programming-languages-1128x635.jpg'),
(3, 'Digital Marketing', 'https://digitalcatalyst.in/blog/wp-content/uploads/2022/03/major-components-of-digital-marketing.png'),
(4, 'Video & Animation', 'https://www.motocms.com/blog/wp-content/uploads/2018/11/video-animation-main.jpg'),
(5, 'Writing & Translation', 'https://tagslanguagesolutions.com/wp-content/uploads/2019/05/3-1.png'),
(6, 'Music & Audio', 'https://play-lh.googleusercontent.com/RF9eZ6QIf8nW5iQLKgYd05yNqM1kTMfIxJZZhQHrsJu_uaeRKDrpaEBOy-NDUpC2xw'),
(7, 'Business', 'https://online.hbs.edu/Style%20Library/api/resize.aspx?imgpath=/PublishingImages/overhead-view-of-business-strategy-meeting.jpg&w=1200&h=630'),
(8, 'Data', 'https://www.simplilearn.com/ice9/free_resources_article_thumb/Data_Visualization_Tools.jpg'),
(9, 'Photography', 'https://www.adorama.com/alc/wp-content/uploads/2021/04/photography-camera-learning-feature.jpg'),
(10, 'AI Services', 'https://s7280.pcdn.co/wp-content/uploads/2018/04/4-Reasons-to-Care-About-Your-Mainframe-700x400.png');

INSERT INTO `NguoiDung` (`nguoi_dung_id`, `ten_nguoi_dung`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `skill`, `certification`, `hinh_dai_dien`) VALUES
(1, 'John Doe', 'john.doe@example.com', 'secretpassword', '123-456-7890', '1990-05-15', 'Male', 'Software Engineer', 'Java, Python, SQL', 'Java SE 8 Certification', NULL),
(2, 'Jane Smith', 'jane.smith@example.com', 'mysecretpass', '987-654-3210', '1988-12-03', 'Female', 'Data Analyst', 'SQL, Excel, Tableau', 'Data Analyst Certification', NULL),
(3, 'Bob Johnson', 'bob.johnson@example.com', 'password123', '555-555-5555', '1995-09-20', 'Male', 'Web Developer', 'HTML, CSS, JavaScript', 'Web Developer Certification', NULL),
(4, 'Alice Johnson', 'alice.johnson@example.com', 'pass1234', '111-222-3333', '1992-07-12', 'Female', 'Database Administrator', 'SQL, Oracle, MongoDB', 'DBA Certification', NULL),
(5, 'Michael Lee', 'michael.lee@example.com', 'mypassword', '444-555-6666', '1985-03-25', 'Male', 'Network Engineer', 'Cisco, Juniper, MPLS', 'CCNA Certification', NULL),
(6, 'Sarah Brown', 'sarah.brown@example.com', 'securepass', '777-888-9999', '1998-11-02', 'Female', 'Graphic Designer', 'Photoshop, Illustrator', 'Graphic Design Certification', NULL),
(7, 'David Miller', 'david.miller@example.com', 'davidpass', '123-789-4560', '1993-09-01', 'Male', 'Project Manager', 'Agile, Scrum, PMP', 'PMP Certification', NULL),
(8, 'Emily Wilson', 'emily.wilson@example.com', 'emilypass', '555-789-1234', '1989-06-30', 'Female', 'UX Designer', 'Wireframing, Prototyping', 'UX Design Certification', NULL),
(9, 'Mark Davis', 'mark.davis@example.com', 'mdp@ssw0rd', '999-888-7777', '1991-04-18', 'Male', 'Marketing Specialist', 'SEO, Google Analytics', 'Digital Marketing Certification', NULL),
(10, 'Julia White', 'julia.white@example.com', 'ju1ia_pwd', '777-222-1111', '1987-12-09', 'Female', 'HR Manager', 'Recruitment, Employee Relations', 'PHR Certification', NULL),
(11, 'Andrew Robinson', 'andrew.robinson@example.com', 'andr0id1', '555-123-4567', '1997-08-22', 'Male', 'Mobile App Developer', 'iOS, Swift, Android', 'Mobile App Development Certification', NULL),
(12, 'Laura Hernandez', 'laura.hernandez@example.com', 'myp@ssw0rd', '333-777-9999', '1994-02-14', 'Female', 'Financial Analyst', 'Financial Modeling, Excel', 'CFA Certification', NULL),
(13, 'Kevin Turner', 'kevin.turner@example.com', 'k3vin_pwd', '444-444-4444', '1986-10-07', 'Male', 'Sales Manager', 'Negotiation, CRM', 'Sales Management Certification', NULL),
(14, 'Linda Adams', 'linda.adams@example.com', 'lind@_pass', '222-666-8888', '1990-11-29', 'Female', 'Accountant', 'Bookkeeping, Taxation', 'CPA Certification', NULL),
(15, 'Chris Evans', 'chris.evans@example.com', 'capt@inAmer1ca', '777-444-2222', '1984-05-13', 'Male', 'Software Architect', 'System Design, UML', 'AWS Certified Solutions Architect', NULL),
(16, 'Stephanie Morris', 'stephanie.morris@example.com', 'st3ph_pwd', '111-777-3333', '1996-03-07', 'Female', 'Content Writer', 'Copywriting, Blogging', 'Content Marketing Certification', NULL),
(17, 'Alex Turner', 'alex.turner@example.com', 'al3x_pwd', '666-555-3333', '1988-09-18', 'Male', 'IT Support Specialist', 'Troubleshooting, Windows, macOS', 'CompTIA A+ Certification', NULL),
(18, 'Phương Nam', 'nam@gmail.com', '12345', '12345667789', '1993-01-01', 'male', 'seller', NULL, 'sell', 'nam'),
(19, 'Phương Nam', 'roan@gmail.com', '12345', '12345667789', '1993-01-01', 'male', 'seller', NULL, 'sell', 'roan');

INSERT INTO `ThueCongViec` (`thue_cong_viec_id`, `ngay_thue`, `hoan_thanh`, `congViec_id`, `nguoi_dung_id`) VALUES
(1, '2023-08-01 00:00:00', 1, 1, 1),
(2, '2023-08-02 00:00:00', 1, 2, 2),
(4, '2023-08-03 00:00:00', 1, 4, 4),
(5, NULL, 1, 5, 5),
(6, '2023-08-05 00:00:00', 1, 6, 6),
(7, '2023-08-06 00:00:00', 1, 7, 7),
(8, '2023-08-07 00:00:00', 0, 8, 8),
(9, '2023-08-08 00:00:00', 1, 9, 9),
(10, '2023-08-09 00:00:00', 0, 10, 10),
(11, '2023-08-10 00:00:00', 0, 11, 11),
(12, '2023-08-11 00:00:00', 1, 12, 12),
(13, '2023-08-12 00:00:00', 1, 13, 13),
(14, '2023-08-13 00:00:00', 0, 14, 14),
(15, '2023-08-14 00:00:00', 1, 15, 15),
(16, '2023-08-17 06:10:32', 0, 1, 3);



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;