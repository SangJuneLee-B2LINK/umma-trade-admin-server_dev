-- 데이터가 크고 테이블에 인덱스 걸려있을 경우 인덱스 해제 > 데이터 로딩 > 인덱스 설정 순으로 작업
ALTER TABLE umma.country DISABLE KEYS;
LOAD DATA local INFILE "filePath"
INTO TABLE umma.country
FIELDS TERMINATED BY ',';
ENCLOSED BY '\"'
LINES TERMINATED BY '\n'
(column1,column2,column3, ...);
ALTER TABLE umma.country ENABLE KEYS;
--
-- import csv
LOAD DATA INFILE "countrycode.csv"
INTO TABLE umma.country
FIELDS TERMINATED BY ','
ENCLOSED BY '\"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(ctr_cd, ctr_name, ctr_alpha3_cd, ctr_numeric_cd, ctr_phone_cd, ctr_continent, ctr_capital, ctr_timezone, ctr_currency, ctr_language_cd, ctr_languages);
--

-- JSON_SEARCH
SELECT * FROM member_admin WHERE JSON_SEARCH(ma_favorite_tags, 'all', 'natural') LIKE '"$[%]"';
SELECT * FROM member_admin WHERE JSON_SEARCH(ma_favorite_tags, 'all', 'natural') IS NOT NULL;

-- 복호화가 필요한 데이터 암호화
SELECT HEX(AES_ENCRYPT('value', SHA2('salt',512)));
SELECT AES_DECRYPT(UNHEX('B89E9624D38BCFEA2EBBF32FF1AAF273'), SHA2('salt',512));
-- 비밀번호 암호화
SELECT SHA2(CONCAT('salt','value'),512));


-- 상품 좋아요 트리거 테스트 쿼리
insert into product_favorite (pf_mt_id, pf_m_id, pf_pr_id) values (200,1,1);
delete from product_favorite where pf_mt_id=200 and pf_m_id=1 and pf_pr_id=1;
