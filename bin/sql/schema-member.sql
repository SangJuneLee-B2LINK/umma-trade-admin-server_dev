-- SET foreign_key_checks = 0;

-- 회원타입 테이블 (루프백 사용으로 현재 사용안함)
--DROP TABLE IF EXISTS `user_type`;
--CREATE TABLE `member_type` (
--  id tinyint(3) UNSIGNED NOT NULL COMMENT '회원타입번호',
--  name varchar(50) NOT NULL COMMENT '회원타입명',
--  comments varchar(512) NULL COLLATE utf8mb4_unicode_ci COMMENT '설명',
--  status char(1) NULL DEFAULT 'Y' COMMENT '상태값',
--  status_updated timestamp NULL COMMENT '상태값변경일시',
--  created timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
--  updated timestamp NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
--  deleted timestamp NULL COMMENT '삭제일시',
--  PRIMARY KEY (id),
--  INDEX `idx_ut_status` (status)
--) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='회원타입정보';
---- 회원타입등록
--INSERT INTO member_type
--(id, name, comments)
--VALUES
--(10, 'buyer', '바이어'),
--(11, 'sub-buyer', '서브바이어'),
--(20, 'seller', '셀러'),
--(21, 'sub-seller', '서브셀러'),
--(100, 'super-manager', '슈퍼관리자'),
--(110, 'manager', '일반관리자'),
--(120, 'sub-manager', '서브관리자'),
--(200, 'developer', '개발자');

--관리자회원회사정보
DROP TABLE IF EXISTS `admin_company`;
CREATE TABLE `admin_company` (
  id varchar(20) NOT NULL COMMENT '관리자회사 아이디',
  biz_type varchar(50) DEFAULT NULL COMMENT '회사사업형태',
  scale varchar(50) NOT NULL COMMENT '회사규모(직원수)',
  name varchar(255) NOT NULL COMMENT '회사명',
  logo varchar(512) NULL COMMENT '회사로고',
  ceo_first_name varchar(100) NULL COMMENT '대표자명 이름',
  ceo_last_name varchar(100) NULL COMMENT '대표자명 성',
  biz_number varchar(50) NOT NULL COMMENT '사업자등록번호',
  duns_number varchar(10) NULL COMMENT 'D-U-N-S Number',
  phone varchar(50) NULL COMMENT '회사전화번호',
  fax varchar(50) NULL COMMENT '회사팩스번호',
  ct_id char(2) NOT NULL COMMENT '회사국가코드',
  cs_id char(2) NULL COMMENT '회사주코드',
  city varchar(100) NULL COMMENT '회사도시명',
  address1 varchar(255) NULL COMMENT '회사주소1',
  address2 varchar(255) NULL COMMENT '회사주소2',
  zipcode varchar(10) NULL COMMENT '회사우편번호',
  website varchar(255) NULL COMMENT '회사웹사이트',
  attachments longtext NULL COMMENT '회사첨부파일',
  establishment_date date NULL COMMENT '회사설립일',
  comments text NULL COMMENT '회사설명',
  duns_verified tinyint(1) NULL COMMENT '관리자 duns 인증 여부',
  duns_verified_updated timestamp NULL COMMENT '관리자 duns 인증 수정일시',
  cert_verified tinyint(1) DEFAULT NULL COMMENT '관리자 증명서 인증 여부',
  cert_verified_updated timestamp NULL COMMENT '관리자 증명서 인증 수정일시',
  created timestamp NULL DEFAULT current_timestamp() COMMENT '생성일시',
  updated timestamp NULL ON UPDATE current_timestamp() COMMENT '수정일시',
  deleted timestamp NULL COMMENT '삭제일시',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='어드민회원회사정보'


-- 관리자 회원 (base from loopback)
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  id varchar(30) NOT NULL COMMENT '관리자회원 아이디',
  realm varchar(512) NULL COMMENT 'loopback',
  role_id int(11) UNSIGNED NOT NULL DEFAULT 1 COMMENT '관리자롤 아이디',
  user_type varchar(30) NOT NULL COMMENT '회원타입(슈퍼관리자,일반관리자)',
  company_id varchar(20) NULL COMMENT '회원회사 고유코드',
	ct_id char(2) NOT NULL COMMENT '회사국가코드',
  first_name varchar(100) NOT NULL COMMENT '이름',
  last_name varchar(100) NOT NULL COMMENT '성',
  password varchar(512) NOT NULL COMMENT '비밀번호',
  password_updated timestamp NULL COMMENT '비밀번호변경일시',
  email varchar(512) NOT NULL COMMENT '이메일주소',
  email_verified tinyint(1) NULL COMMENT '이메일인증여부',
  email_verified_updated timestamp NULL COMMENT '이메일인증일시',
  verification_token varchar(512) NULL COMMENT '인증토큰',
  nick_name varchar(100) NULL COLLATE utf8mb4_unicode_ci COMMENT '닉네임',
  avatar varchar(512) NULL COMMENT '프로필사진',
  position varchar(512) NULL COMMENT '직책',
  phone varchar(50) NULL COMMENT '전화번호',
  mobile varchar(50) NULL COMMENT '모바일번호',
  favorite_tags JSON NULL COMMENT '좋아하는 태그번호 배열',
  comments text NULL COLLATE utf8mb4_unicode_ci COMMENT '회원설명',
  last_login timestamp NULL COMMENT '최종로그인일시',
  login_count int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '로그인회수',
  status char(1) NULL DEFAULT 'W' COMMENT '상태값',
  status_updated timestamp NULL COMMENT '상태값변경일시',
  created timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
  approved timestamp NULL COMMENT '가입승인일시',
	updated timestamp NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
  deleted timestamp NULL COMMENT '삭제일시',
  PRIMARY KEY (id),
  INDEX `idx_admin_status` (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='관리자회원정보';


-- ------------------------------------------------
-- [미국]
-- Sole Proprietorships - 개인사업자
-- Partnerships - 파트너쉽
-- Corporations - 법인 (C-CORP/S-CORP)
-- Limited Liability Company(LLC) - 유한 책임 회사
-- ------------------------------------------------

-- 바이어 회사
DROP TABLE IF EXISTS `buyer_company`;
CREATE TABLE `buyer_company` (
  id varchar(20) NOT NULL COMMENT '바이어회사 아이디',
  biz_type varchar(50) NULL COMMENT '회사사업형태',
  scale varchar(50) NOT NULL COMMENT '회사규모(직원수)',
  name varchar(255) NOT NULL COMMENT '회사명',
  logo varchar(512) NULL COMMENT '회사로고',
  ceo_first_name varchar(100) NULL COMMENT '대표자명 이름',
  ceo_last_name varchar(100) NULL COMMENT '대표자명 성',
  biz_number varchar(50) NOT NULL COMMENT '사업자등록번호',
  duns_number varchar(10) NULL COMMENT 'D-U-N-S Number',
  phone varchar(50) NULL COMMENT '회사전화번호',
  fax varchar(50) NULL COMMENT '회사팩스번호',
  ct_id char(2) NOT NULL COMMENT '회사국가코드',
  cs_id char(2) NULL COMMENT '회사주코드',
  city varchar(100) NULL COMMENT '회사도시명',
  address1 varchar(255) NULL COMMENT '회사주소1',
  address2 varchar(255) NULL COMMENT '회사주소2',
  zipcode varchar(10) NULL COMMENT '회사우편번호',
  website varchar(255) NULL COMMENT '회사웹사이트',
  attachments JSON NULL COMMENT '회사첨부파일',
  establishment_date DATE NULL COMMENT '회사설립일',
  comments text NULL COLLATE utf8mb4_unicode_ci COMMENT '회사설명',
  duns_verified tinyint(1) NULL COMMENT '관리자 duns 인증 여부',
  duns_verified_updated timestamp NULL COMMENT '관리자 duns 인증 수정일시',
  cert_verified tinyint(1) NULL COMMENT '관리자 증명서 인증 여부',
  cert_verified_updated timestamp NULL COMMENT '관리자 증명서 인증 수정일시',
  created timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
  updated timestamp NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
  deleted timestamp NULL COMMENT '삭제일시',
  PRIMARY KEY (id)
  -- CONSTRAINT `fk_bc_id` FOREIGN KEY (id) REFERENCES buyer (id) ON DELETE CASCADE ON UPDATE RESTRICT,
  -- CONSTRAINT `fk_bc_ct_id` FOREIGN KEY (ct_id) REFERENCES country (id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='바이어회원회사정보';


-- 바이어 회원 (base from loopback)
DROP TABLE IF EXISTS `buyer`;
CREATE TABLE `buyer` (
  id varchar(20) NOT NULL COMMENT '관리자회원 아이디',
  realm varchar(512) NULL COMMENT 'loopback',
	role_id int(11) UNSIGNED NOT NULL DEFAULT 1 COMMENT '롤 아이디',
  user_type varchar(30) NOT NULL COMMENT '바이어회원타입',
  company_id varchar(20) NULL COMMENT '회원회사 고유코드',
	ct_id char(2) NOT NULL COMMENT '국가코드',
  first_name varchar(100) NOT NULL COMMENT '이름',
  last_name varchar(100) NOT NULL COMMENT '성',
  password varchar(512) NOT NULL COMMENT '비밀번호',
  password_updated timestamp NULL COMMENT '비밀번호변경일시',
  email varchar(512) NOT NULL COMMENT '이메일주소',
  email_verified tinyint(1) NULL COMMENT '이메일인증여부',
  email_verified_updated timestamp NULL COMMENT '이메일인증일시',
  verification_token varchar(512) NULL COMMENT '인증토큰',
  favorite_tags json NULL COMMENT '좋아하는태그들',
  nick_name varchar(100) NULL COLLATE utf8mb4_unicode_ci COMMENT '닉네임',
  avatar varchar(512) NULL COMMENT '프로필사진',
  position varchar(512) NULL COMMENT '직책',
  phone varchar(50) NULL COMMENT '전화번호',
  mobile varchar(50) NULL COMMENT '모바일번호',
  comments text NULL COLLATE utf8mb4_unicode_ci COMMENT '회원설명',
  last_login timestamp NULL COMMENT '최종로그인일시',
  login_count int(11) UNSIGNED NULL DEFAULT 0 COMMENT '로그인횟수',
  terms_agreed tinyint(1) NULL COMMENT '이용약관,개인정보취급방침동의여부',
  terms_agreed_updated timestamp NULL COMMENT '약관동의수정일시',
  receive_info_agreed tinyint(1) NULL COMMENT '정보수신동의여부',
  receive_info_agreed_updated timestamp NULL COMMENT '정보수신동의수정일시',
  receive_info_method json NULL COMMENT '정보수신방법선택 (sms/email/phone/fax)',
  status char(1) NULL DEFAULT 'W' COMMENT '상태값',
  status_updated timestamp NULL COMMENT '상태값변경일시',
  created timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
  approved timestamp NULL COMMENT '가입승인일시',
  updated timestamp NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
  deleted timestamp NULL COMMENT '삭제일시',
  PRIMARY KEY (id),
  INDEX `idx_buyer_status` (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='바이어회원정보';


-- 셀러 회사
DROP TABLE IF EXISTS `seller_company`;
CREATE TABLE `seller_company` (
  id varchar(20) NOT NULL COMMENT '셀러회사 아이디',
  biz_type varchar(512) COMMENT '회사사업형태',
  scale varchar(512) NOT NULL COMMENT '회사규모(직원수)',
  name varchar(512) NOT NULL COMMENT '회사명',
  logo varchar(512) NULL COMMENT '회사로고',
  ceo_first_name varchar(100) NOT NULL COMMENT '대표자명 이름',
  ceo_last_name varchar(100) NOT NULL COMMENT '대표자명 성',
  biz_number varchar(50) NOT NULL COMMENT '사업자등록번호',
  duns_number varchar(10) NULL COMMENT 'D-U-N-S Number',
  phone varchar(50) NULL COMMENT '회사전화번호',
  fax varchar(50) NULL COMMENT '회사팩스번호',
  ct_id char(2) NOT NULL COMMENT '회사국가코드',
  cs_id char(2) NULL COMMENT '회사주코드',
  city varchar(100) NULL COMMENT '회사도시명',
  address1 varchar(512) NULL COMMENT '회사주소1',
  address2 varchar(512) NULL COMMENT '회사주소2',
  zipcode varchar(10) NULL COMMENT '회사우편번호',
  website varchar(512) NULL COMMENT '회사웹사이트',
  establishment_date DATE NULL COMMENT '회사설립일',
  comments text NULL COLLATE utf8mb4_unicode_ci COMMENT '회사설명',
  attachments json NULL COMMENT '회사첨부파일',
  duns_verified tinyint(1) NULL COMMENT '관리자 duns 인증 여부',
  duns_verified_updated timestamp NULL COMMENT '관리자 duns 인증 수정일시',
  cert_verified tinyint(1) NULL COMMENT '관리자 증명서 인증 여부',
  cert_verified_updated timestamp NULL COMMENT '관리자 증명서 인증 수정일시',
  created timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
  updated timestamp NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
  deleted timestamp NULL COMMENT '삭제일시',
  PRIMARY KEY (id)
  -- CONSTRAINT `fk_sc_id` FOREIGN KEY (id) REFERENCES seller (id) ON DELETE CASCADE ON UPDATE RESTRICT,
  -- CONSTRAINT `fk_sc_ct_id` FOREIGN KEY (ct_id) REFERENCES country (id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='셀러회원회사정보';


-- 셀러 회원 (base from loopback)
DROP TABLE IF EXISTS `seller`;
CREATE TABLE `seller` (
  id varchar(20) NOT NULL COMMENT '셀러회원 아이디',
	realm varchar(512) NULL COMMENT 'loopback',
	role_id int(11) UNSIGNED NOT NULL DEFAULT 1 COMMENT '롤 아이디',
  user_type varchar(30) NOT NULL COMMENT '바이어회원타입',
  company_id varchar(20) NULL COMMENT '회원회사 고유코드',
	ct_id char(2) NOT NULL COMMENT '국가코드',
	first_name varchar(100) NOT NULL COMMENT '이름',
	last_name varchar(100) NOT NULL COMMENT '성',
	password varchar(512) NOT NULL COMMENT '비밀번호',
	password_updated timestamp NULL COMMENT '비밀번호변경일시',
  email varchar(512) NOT NULL COMMENT '이메일주소',
  email_verified tinyint(1) NULL COMMENT '이메일인증여부',
  email_verified_updated timestamp NULL COMMENT '이메일인증일시',
  verification_token varchar(512) NULL COMMENT '인증토큰',
  br_id int(11) UNSIGNED NULL COMMENT '관리 브랜드 아이디',
  nick_name varchar(100) NULL COLLATE utf8mb4_unicode_ci COMMENT '닉네임',
  avatar varchar(512) NULL COMMENT '프로필사진',
  position varchar(512) NULL COMMENT '직책',
  phone varchar(50) NULL COMMENT '전화번호',
  mobile varchar(50) NULL COMMENT '모바일번호',
  comments text NULL COLLATE utf8mb4_unicode_ci COMMENT '회원설명',
  last_login timestamp NULL COMMENT '최종로그인일시',
  login_count int(11) UNSIGNED NULL DEFAULT 0 COMMENT '로그인횟수',
  terms_agreed tinyint(1) NULL COMMENT '이용약관,개인정보취급방침동의여부',
  terms_agreed_updated timestamp NULL COMMENT '약관동의수정일시',
  receive_info_agreed tinyint(1) NULL COMMENT '정보수신동의여부',
  receive_info_agreed_updated timestamp NULL COMMENT '정보수신동의수정일시',
  receive_info_method json NULL COMMENT '정보수신방법선택 (sms/email/phone/fax)',
  status char(1) NULL DEFAULT 'W' COMMENT '상태값',
  status_updated timestamp NULL COMMENT '상태값변경일시',
  created timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',,
  approved timestamp NULL COMMENT '가입승인일시',
  updated timestamp NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
  deleted timestamp NULL COMMENT '삭제일시',
  PRIMARY KEY (id),
  INDEX `idx_seller_status` (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='셀러회원정보';


-- SET foreign_key_checks = 1;
-- 바이어회원뷰테이블
CREATE OR REPLACE VIEW `view_buyer_user` AS
	SELECT
	bc.biz_type as bc_biz_type,
	bc.scale as bc_scale,
	bc.name as bc_name,
	bc.ceo_first_name as bc_ceo_first_name,
	bc.ceo_last_name as bc_ceo_last_name,
	bc.biz_number as bc_biz_number,
	bc.phone as bc_phone,
	bc.fax as bc_fax,
	bc.ct_id as bc_ct_id,
	bc.cs_id as bc_cs_id,
	bc.city as bc_city,
	bc.address1 as bc_address1,
	bc.address2 as bc_address2,
	bc.zipcode as bc_zipcode,
	bc.website as bc_website,
	bc.attachments as bc_attachments,
	bu.* FROM buyer AS bu
	LEFT JOIN buyer_company AS bc ON bc.id = bu.company_id;
