-- SET foreign_key_checks = 0;

-- 국가
DROP TABLE IF EXISTS `country`;
CREATE TABLE `country` (
  id char(2) NOT NULL COMMENT 'ISO 3166-1 alpha-2',
  iso_alpha3 char(3) NOT NULL COMMENT 'ISO 3166-1 alpha-3',
  iso_numeric varchar(10) NOT NULL COMMENT 'ISO 3166-1 numeric',
  dial varchar(100) NOT NULL COMMENT '국가전화번호',
  name varchar(512) NOT NULL COMMENT '국가명',
  capital varchar(512) NULL COMMENT '수도명',
  continent_cd varchar(10) NULL COMMENT '대륙코드',
  region varchar(512) NULL COMMENT '지역명',
  subregion varchar(512) NULL COMMENT '하위지역명',
  currency_cd varchar(512) NULL COMMENT '통화코드',
  currency varchar(512) NULL COMMENT '통화명',
  languages varchar(512) NULL COMMENT '언어코드',
  timezone varchar(512) NULL COMMENT '타임존',
  status char(1) NULL DEFAULT 'Y' COMMENT '상태값',
  status_updated timestamp NULL COMMENT '상태값변경일시',
  created timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
  updated timestamp NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
  deleted timestamp NULL COMMENT '삭제일시',
  PRIMARY KEY (id),
  INDEX `idx_ct_status` (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='국가코드';

-- 국가 STATE
DROP TABLE IF EXISTS `country_state`;
CREATE TABLE `country_state` (
  ct_id char(2) NOT NULL COMMENT '국가코드',
  id char(2) NOT NULL COMMENT 'state코드',
  name varchar(512) NOT NULL COMMENT 'state명',
  status char(1) NULL DEFAULT 'Y' COMMENT '상태값',
  status_updated timestamp NULL COMMENT '상태값변경일시',
  created timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
  updated timestamp NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
  deleted timestamp NULL COMMENT '삭제일시',
  PRIMARY KEY (ct_id, id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='state코드';

-- 국가 도시
DROP TABLE IF EXISTS `country_city`;
CREATE TABLE `country_city` (
  ct_id char(2) NOT NULL COMMENT '국가코드',
  id char(2) NOT NULL COMMENT '도시코드',
  name varchar(100) NOT NULL COMMENT '도시명',
  status char(1) NOT NULL DEFAULT 'Y' COMMENT '상태값',
  status_updated timestamp NULL COMMENT '상태값변경일시',
  created timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
  updated timestamp NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
  deleted timestamp NULL COMMENT '삭제일시',
  PRIMARY KEY (ct_id, id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='도시코드';

-- 사이트 정보
DROP TABLE IF EXISTS `common_site`;
CREATE TABLE `common_site` (
  id int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '아이디',
  name varchar(512) NOT NULL COMMENT '정보명',
  contents text NULL COLLATE utf8mb4_unicode_ci COMMENT '내용',
  created timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
  updated timestamp NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
  deleted timestamp NULL COMMENT '삭제일시',
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='사이트정보';

-- 공통 코드 테이블
DROP TABLE IF EXISTS `common_code`;
CREATE TABLE `common_code` (
  id int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '아이디',
  parent_id int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '부모 아이디',
  depth tinyint(3) NOT NULL DEFAULT 1 COMMENT '코드 depth',
  code varchar(512) NOT NULL COMMENT '코드',
  name varchar(512) NOT NULL COMMENT '코드명',
  comments text NULL COMMENT '설명',
  created timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
  updated timestamp NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
  deleted timestamp NULL COMMENT '삭제일시',
  PRIMARY KEY (id),
  UNIQUE `idx_cc_code` (parent_id, code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='공통 코드 테이블';


-- 상품 태그 설정
DROP TABLE IF EXISTS `product_tag`;
CREATE TABLE `product_tag` (
  id int(11) NOT NULL AUTO_INCREMENT COMMENT '아이디',
  name varchar(512) NOT NULL COMMENT '태그명',
  comments text NULL COMMENT '태그설명',
  status char(1) NULL DEFAULT 'Y' COMMENT '상태값',
  status_updated timestamp NULL COMMENT '상태값변경일시',
  created timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
  updated timestamp NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
  deleted timestamp NULL COMMENT '삭제일시',
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='상품 태그';

-- SET foreign_key_checks = 1;
