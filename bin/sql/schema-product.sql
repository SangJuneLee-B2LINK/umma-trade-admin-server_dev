-- SET foreign_key_checks = 0;

-- 카테고리
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  id int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '카테고리 아이디',
  code varchar(30) NOT NULL COMMENT '카테고리 코드',
  parent_cd varchar(30) NULL COMMENT '부모 카테고리 코드',
  depth tinyint(3) NOT NULL DEFAULT 1 COMMENT '카테고리 depth',
  sort int(11) NULL DEFAULT 0 COMMENT '카테고리 정렬번호',
  name varchar(512) NOT NULL COLLATE utf8mb4_unicode_ci COMMENT '카테고리명',
  comments text NULL COLLATE utf8mb4_unicode_ci COMMENT '카테고리 설명',
  status char(1) NULL DEFAULT 'Y' COMMENT '상태값',
  status_updated timestamp NULL COMMENT '상태값변경일시',
--  creator_role_id	int(11) NOT NULL COMMENT '등록자 회원롤 아이디',
--  creator_id	int(11) NOT NULL COMMENT '등록자 아이디',
--  updater_role_id	int(11) NULL COMMENT '수정자 회원롤 아이디',
--  updater_id	int(11) NULL COMMENT '수정자 아이디',
--  deleter_role_id	int(11) NULL COMMENT '삭제자 회원롤 아이디',
--  deleter_id	int(11) NULL COMMENT '삭제자 아이디',
  created timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
  updated timestamp NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
  deleted timestamp NULL COMMENT '삭제일시',
  PRIMARY KEY (id),
  INDEX `idx_cat_status` (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='카테고리 정보';

-- 브랜드
DROP TABLE IF EXISTS `brand`;
CREATE TABLE `brand` (
  id int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '브랜드 아이디',
  pims_id varchar(50) NULL COMMENT 'PIMS 브랜드 아이디',
  ct_id char(2) NOT NULL DEFAULT 'KR' COMMENT 'ISO 3166-1 alpha-2',
  sort int(11) NULL DEFAULT 0 COMMENT '브랜드 정렬번호',
  name varchar(512) NOT NULL COMMENT '브랜드명',
  logo varchar(512) NULL COMMENT '브랜드 로고URL',
  website varchar(512) NULL COMMENT '브랜드 홈페이지',
  comments text NULL COLLATE utf8mb4_unicode_ci COMMENT '브랜드 설명',
  product_count int(11) NULL DEFAULT 0 COMMENT '등록된 상품수',
  associated tinyint(1) NULL COMMENT '제휴/비제휴 구분',
  detail_used tinyint(1) NOT NULL DEFAULT 0 COMMENT '브랜드상세정보 사용여부',
  detail_banner_url	varchar(512) NULL COMMENT '브랜드상세정보 배너이미지',
  detail_media text NULL COMMENT '브랜드상세정보 영상소스',
  detail_html text NULL COMMENT '브랜드상세정보 HTML',
  detail_updated timestamp NULL COMMENT '브랜드상세정보 수정일시',
  status char(1) NULL DEFAULT 'Y' COMMENT '상태값',
  status_updated timestamp NULL COMMENT '상태값변경일시',
--  creator_role_id	int(11) NOT NULL COMMENT '등록자 회원롤 아이디',
--  creator_id	int(11) NOT NULL COMMENT '등록자 아이디',
--  updater_role_id	int(11) NULL COMMENT '수정자 회원롤 아이디',
--  updater_id	int(11) NULL COMMENT '수정자 아이디',
--  deleter_role_id	int(11) NULL COMMENT '삭제자 회원롤 아이디',
--  deleter_id	int(11) NULL COMMENT '삭제자 아이디',
  created timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
  updated timestamp NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
  deleted timestamp NULL COMMENT '삭제일시',
  PRIMARY KEY (id),
  INDEX `idx_br_status` (status)
  -- CONSTRAINT `fk_br_ct_id` FOREIGN KEY (ct_id) REFERENCES country (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='브랜드 정보';


-- ---------------------------------------------------
-- JSON (LONGTEXT) 데이터 타입 사용
-- (JSON 별칭은 MariaDB 10.2.7 부터 적용)
-- https://mariadb.com/kb/en/library/json-data-type/
-- (JSON Functions는 MariaDB 10.2.3 부터 적용)
-- https://mariadb.com/kb/en/library/json-functions/
-- ---------------------------------------------------

-- 상품 테이블
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  id int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '상품 아이디',
  pims_id varchar(50) NULL COMMENT 'PIMS 상품 아이디',
  cat_cd varchar(30) NOT NULL COMMENT '카테고리 코드',
  user_id varchar(20) NULL COMMENT '등록자 고유코드',
  company_id varchar(20) NULL COMMENT '등록자회사 고유코드',
  br_id int(11) UNSIGNED NOT NULL COMMENT '브랜드 아이디',
  sku varchar(50) NULL COMMENT 'SKU',
  barcode varchar(50) NULL COMMENT 'GS1바코드',
  asin varchar(50) NULL COMMENT '아마존 표준 식별 번호',
  best_seller int(11) NULL DEFAULT 0 COMMENT '베스트셀러',
  new_product int(11) NULL DEFAULT 0 COMMENT '신상품',
  recommended int(11) NULL DEFAULT 0 COMMENT '추천상품',
  sort int(11) NULL DEFAULT 0 COMMENT '상품 정렬번호',
  name varchar(512) NOT NULL COLLATE utf8mb4_unicode_ci COMMENT '상품명',
  images json NULL COMMENT '상품 이미지들',
  ref_url varchar(512) NULL COMMENT '상품 참조 URL',
  taxation tinyint(1) NULL COMMENT '과세여부',
  moq int(11) UNSIGNED NULL DEFAULT 0 COMMENT 'MOQ',
  retail_price decimal(10,2) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'MSRP',
  supply_price decimal(10,2) UNSIGNED NOT NULL DEFAULT 0 COMMENT '공급가',
  sale_price decimal(10,2) UNSIGNED NOT NULL DEFAULT 0 COMMENT '판매가',
  pricing_table json NULL COMMENT '판매가격테이블',
  stock int(11) NULL DEFAULT 0 COMMENT '재고',
  capacity int(11) UNSIGNED NULL COMMENT '사이즈/용량(ml)',
  inbox_quantity int(11) UNSIGNED NULL COMMENT '인박스내 상품수량(ea)',
  total_weight int(11) UNSIGNED NULL COMMENT '상품총중량(g)',
  -- pure_weight json NULL COMMENT '상품순중량',
  volume int(11) UNSIGNED NULL COMMENT '상품체적(CBM,mm3)',
  size_horizontal int(11) UNSIGNED NULL COMMENT '상품가로(mm)',
  size_vertical int(11) UNSIGNED NULL COMMENT '상품세로(mm)',
  size_height int(11) UNSIGNED NULL COMMENT '상품높이(mm)',
  -- packing_piece json NULL COMMENT '패킹피스',
  -- packing_unit json NULL COMMENT '패킹유닛',
  -- packing_package json NULL COMMENT '패킹패키지',
  -- packing_outbox json NULL COMMENT '패킹아웃박스',
  ingredient json NULL COMMENT '전성분',
  -- tags json NULL COMMENT '상품 태그 리스트',
  manufactured varchar(512) NULL COMMENT '제조업자',
  distributor varchar(512) NULL COMMENT '제조판매업자',
  producer_ct_id char(2) NULL COMMENT '생산국가코드',
  producer_area varchar(512)	NULL COMMENT '생산지역',
  msds_id int(11) UNSIGNED NULL COMMENT 'MSDS타입(DG,NDG)',
  msds json NULL COMMENT 'MSDS 파일',
  certificate json NULL COMMENT '인증 및 허가',
  supplied_channel json NULL COMMENT '공급중인채널',
  discontinued tinyint(1) NULL COMMENT '단종여부',
  discontinued_date date NULL COMMENT '단종일',
  discontinued_updated timestamp NULL COMMENT '단종여부 수정일시',
  valid_country json NULL COMMENT '판매가능국가',
  invalid_country json NULL COMMENT '판매불가능국가',
  comments text NULL COLLATE utf8mb4_unicode_ci COMMENT '상품 설명',
  contents text NULL COLLATE utf8mb4_unicode_ci COMMENT '상품 상세HTML',
  favorite_count int(11) UNSIGNED NULL DEFAULT 0 COMMENT '좋아요 카운트',
  inquiry_count int(11) UNSIGNED NULL DEFAULT 0 COMMENT '문의하기 카운트',
  view_count int(11) UNSIGNED NULL DEFAULT 0 COMMENT '조회수',
  display tinyint(1) NULL COMMENT '상품노출여부',
  status char(1) NULL DEFAULT 'W' COMMENT '상태값',
  status_updated timestamp NULL COMMENT '상태값변경일시',
--  creator_role_id	int(11) NOT NULL COMMENT '등록자 회원롤 아이디',
--  creator_id	int(11) NOT NULL COMMENT '등록자 아이디',
--  updater_role_id	int(11) NULL COMMENT '수정자 회원롤 아이디',
--  updater_id	int(11) NULL COMMENT '수정자 아이디',
--  deleter_role_id	int(11) NULL COMMENT '삭제자 회원롤 아이디',
--  deleter_id	int(11) NULL COMMENT '삭제자 아이디',
  created timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
  approved timestamp NULL COMMENT '등록승인일시',
  updated timestamp NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
  deleted timestamp NULL COMMENT '삭제일시',
  PRIMARY KEY (id),
  INDEX `idx_pr_pims_id` (pims_id),
  INDEX `idx_pr_cat_id` (cat_cd),
  INDEX `idx_pr_user_id` (user_id),
  INDEX `idx_pr_br_id` (br_id),
  INDEX `idx_pr_sku` (sku),
  INDEX `idx_pr_barcode` (barcode),
  INDEX `idx_pr_asin` (asin),
  INDEX `idx_pr_sort` (sort),
  INDEX `idx_pr_name` (name),
  INDEX `idx_pr_status` (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='상품 정보';
-- TRIGGER
CREATE OR REPLACE DEFINER=`umma`@`%` TRIGGER `pr_increment_brand_product_count`
  AFTER INSERT ON product
    FOR EACH ROW
    UPDATE brand SET product_count = product_count+1 WHERE id = NEW.br_id;
-- TRIGGER
CREATE OR REPLACE DEFINER=`umma`@`%` TRIGGER `pr_decrement_brand_product_count`
  AFTER DELETE ON product
    FOR EACH ROW
    UPDATE brand SET product_count = product_count-1 WHERE id = OLD.br_id;


-- 상품 뷰 테이블
CREATE OR REPLACE VIEW `view_product` AS
SELECT
  br.name as br_name,
  br.logo as br_logo,
  br.comments as br_comments,
  br.product_count as br_product_count,
  br.detail_used as br_detail_used,
  br.detail_banner_url as br_detail_banner_url,
  br.detail_media as br_detail_media,
  br.detail_html as br_detail_html,
  COALESCE(ad.email,sl.email) register_email,
  COALESCE(ad.first_name,sl.first_name) register_first_name,
  COALESCE(ad.last_name,sl.last_name) register_last_name,
  COALESCE(ac.name,sc.name) register_company_name,
  (select name from category where code = substring( pr.cat_cd,1,3)) as cat_name_1depth,
  (select code from category where code = substring( pr.cat_cd,1,3)) as cat_cd_1depth,
  (select name from category where code = substring( pr.cat_cd,1,6)) as cat_name_2depth,
  (select code from category where code = substring( pr.cat_cd,1,6)) as cat_cd_2depth,
  cat.name as cat_name_3depth,
  cat.code as cat_cd_3depth,
  if( pf.id is null,0,1) as is_favorite,
  pr.*
FROM product AS pr
LEFT JOIN
	brand AS br ON br.id = pr.br_id
LEFT JOIN
	category AS cat ON cat.code = pr.cat_cd
LEFT JOIN
	admin AS ad ON ad.id = pr.user_id
LEFT JOIN
	seller AS sl ON sl.id = pr.user_id
LEFT JOIN
	admin_company AS ac ON ac.id = pr.company_id
LEFT JOIN
	seller_company AS sc ON sc.id = pr.company_id
LEFT JOIN
	product_favorite AS pf ON pf.pr_id = pr.id;


-- 상품 트랜잭션 로그
DROP TABLE IF EXISTS `product_transaction_log`;
CREATE TABLE `product_transaction_log` (
  id int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '아이디',
  role_id int(11) UNSIGNED NOT NULL COMMENT '회원롤 아이디',
  user_id int(11) UNSIGNED NOT NULL COMMENT '회원 아이디',
  pr_id int(11) UNSIGNED NOT NULL COMMENT '상품 아이디',
  transaction text NULL COMMENT '트랜잭션',
  created timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='상품 트랜잭션 로그';


-- 상품 좋아요
DROP TABLE IF EXISTS `product_favorite`;
CREATE TABLE `product_favorite` (
  id int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '아이디',
  role_id int(11) UNSIGNED NOT NULL COMMENT '회원롤 아이디',
  user_id varchar(20) NOT NULL COMMENT '회원 아이디',
  br_id int(11) UNSIGNED NOT NULL COMMENT '브랜드 아이디',
	pr_id int(11) UNSIGNED NOT NULL COMMENT '상품 아이디',
  status tinyint(1) NULL DEFAULT 1 COMMENT '문의상태',
  created timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
  updated timestamp NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
  deleted timestamp NULL COMMENT '삭제일시',
  PRIMARY KEY (id),
  INDEX `idx_pf_ids` (role_id, user_id, pr_id)
  -- CONSTRAINT `fk_pf_pr_id` FOREIGN KEY (pr_id) REFERENCES product (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='상품 좋아요';
-- TRIGGER
CREATE OR REPLACE DEFINER=`umma`@`%` TRIGGER `pf_increment_product_favorite_count`
  AFTER INSERT ON product_favorite
    FOR EACH ROW
    UPDATE product SET favorite_count = favorite_count+1 WHERE id = NEW.pr_id;
-- TRIGGER
CREATE OR REPLACE DEFINER=`umma`@`%` TRIGGER `pf_decrement_product_favorite_count`
  AFTER DELETE ON product_favorite
    FOR EACH ROW
    UPDATE product SET favorite_count = favorite_count-1 WHERE id = OLD.pr_id;


-- 상품문의
DROP TABLE IF EXISTS `product_inquiry`;
CREATE TABLE `product_inquiry` (
  id int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '아이디',
  parent_id int(11) UNSIGNED NOT NULL COMMENT '부모 아이디',
  role_id int(11) UNSIGNED NOT NULL COMMENT '회원롤 아이디',
  user_id int(11) UNSIGNED NOT NULL COMMENT '회원 아아디',
  pr_id int(11) UNSIGNED NOT NULL COMMENT '상품 아이디',
  subject varchar(512) NOT NULL COMMENT '문의제목',
  contents varchar(512) NOT NULL COMMENT '문의내용',
  attachments json NULL COMMENT '문의첨부파일',
  status tinyint(1) NULL COMMENT '문의상태',
  replied tinyint(1) NULL COMMENT '답변여부',
  created timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
  updated timestamp NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
  deleted timestamp NULL COMMENT '삭제일시',
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='상품문의';
-- TRIGGER
CREATE OR REPLACE DEFINER=`umma`@`%` TRIGGER `pi_increment_product_inquiry_count`
  AFTER INSERT ON product_inquiry
    FOR EACH ROW
    UPDATE product SET inquiry_count = inquiry_count+1 WHERE id = NEW.pr_id;
-- TRIGGER
CREATE OR REPLACE DEFINER=`umma`@`%` TRIGGER `pi_decrement_product_inquiry_count`
  AFTER DELETE ON product_inquiry
    FOR EACH ROW
    UPDATE product SET inquiry_count = inquiry_count-1 WHERE id = OLD.pr_id;

-- 일반문의
DROP TABLE IF EXISTS `inquiry`;
CREATE TABLE `inquiry` (
  id int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '아이디',
  role_id int(11) UNSIGNED NULL COMMENT '회원롤 아이디',
  user_id varchar(20) NULL COMMENT '회원 아아디',
  inquiry_type char(1) NOT NULL COMMENT '문의타입',
  subject varchar(512) NOT NULL COMMENT '문의제목',
  contents varchar(512) NOT NULL COMMENT '문의내용',
  attachments json NULL COMMENT '문의첨부파일',
  pr_id int(11) UNSIGNED NULL COMMENT '상품아이디',
  status tinyint(1) NULL COMMENT '문의상태',
  closed timestamp NULL COMMENT '문의종료일시',
  created timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
  updated timestamp NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
  deleted timestamp NULL COMMENT '삭제일시',
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='문의';

-- 일반문의답변
DROP TABLE IF EXISTS `inquiry_reply`;
CREATE TABLE `inquiry_reply` (
  id int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '답변 아이디',
  inquiry_id int(11) UNSIGNED NOT NULL COMMENT '문의 아이디',
  role_id int(11) UNSIGNED NULL COMMENT '회원롤 아이디',
  user_id varchar(20) NULL COMMENT '회원 아아디',
  contents varchar(512) NOT NULL COMMENT '답변내용',
  attachments json NULL COMMENT '답변첨부파일',
  created timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
  updated timestamp NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
  deleted timestamp NULL COMMENT '삭제일시',
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='일반문의답변';

-- 사용자정의 상품 검색조건
DROP TABLE IF EXISTS `product_search_condition`;
CREATE TABLE `product_search_condition` (
  id int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '아이디',
  user_id int(11) UNSIGNED NOT NULL COMMENT '회원 아이디',
  keyword LONGTEXT NULL COMMENT '검색조건 키워드',
  category LONGTEXT NULL COMMENT '검색조건 카테고리',
  brand LONGTEXT NULL COMMENT '검색조건 브랜드',
  moq int(11) UNSIGNED NULL COMMENT '검색조건 최소구매수량',
  msrp LONGTEXT NULL COMMENT '검색조건 소비자가격(최소,최대)',
  supply_country LONGTEXT NULL COMMENT '검색조건 공급가능국가',
  created timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
  updated timestamp NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
  deleted timestamp NULL COMMENT '삭제일시',
  PRIMARY KEY (id),
  INDEX `idx_psc_user_id` (user_id),
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='사용자검색조건';

-- SET foreign_key_checks = 1;

-- 문의 View TABLE;
CREATE OR REPLACE VIEW `view_inquiry` AS
  SELECT
  bu.email as register_email,
  bu.ct_id as ct_id,
  bu.first_name as register_first_name,
  bu.last_name as register_last_name,
  bu.phone as register_phone,
  iq.id,
  iq.inquiry_type as inquiry_type,
  iq.subject as inquiry_subject,
  iq.contents as inquiry_contents,
  iq.attachments as inquiry_attachments,
  iq.status as inquiry_status,
  iq.created as inquiry_created,
  br.name as pr_br_name,
  pr.name as pr_name,
  pr.images as pr_images,
  pr.moq as pr_moq,
  pr.supply_price as pr_supply_price,
  pr.retail_price as pr_retail_price,
  pr.producer_ct_id as pr_producer_ct_id
  FROM inquiry as iq
  LEFT JOIN buyer as bu on bu.id = iq.user_id
  LEFT JOIN product as pr on pr.id = iq.pr_id
  LEFT JOIN brand as br on br.id = iq.pr_id;

-- 상품좋아요 View Table;
CREATE OR REPLACE VIEW `view_product_favorite` AS
  SELECT
  pf.*,
  br.name as br_name,
  pr.name as pr_name,
  pr.images as pr_images,
  pr.moq as pr_moq,
  pr.supply_price as pr_supply_price,
  pr.favorite_count as pr_favorite_count,
  pr.created as pr_created
  FROM product_favorite as pf
  LEFT JOIN product as pr on pf.pr_id = pr.id
  LEFT JOIN brand as br on br.id = pr.br_id;