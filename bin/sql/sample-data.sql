-- umma-trade sample data

-- 등록
INSERT INTO common_code
(id, parent_id, code, name)
VALUES
(1, 0, 'DATA_STATUS', '상태값'),
(2, 0, 'USER_STATUS', '회원 상태값');

INSERT INTO common_code
(parent_id, code, name)
VALUES
(1, 'D', '삭제'),
(1, 'N', '미사용'),
(1, 'Y', '사용'),
(2, 'W', '대기'),
(2, 'Y', '승인'),
(2, 'N', '거절'),
(2, 'H', '보류'),
(2, 'O', '탈퇴');

-- 단위 대분류 등록
--INSERT INTO common_code
--(id, parent_id, name)
--VALUES
--(1, 0, 'LENGTH'),
--(2, 0, 'WEIGHT'),
--(3, 0, 'VOLUME'),
--(4, 0, 'AREA'),
--(5, 0, 'QUANTITY');

INSERT INTO category (
  id,
  name
) VALUES (
  1,
  'Skin Care'
);

INSERT INTO brand (
  id,
  name
) VALUES (
  1,
  'Skin1004'
);

INSERT INTO product (
  id,
  br_id,
  cat_id,
  name
) VALUES (
  1,
  1,
  1,
  'Zombie Pack'
),(
  2,
  1,
  1,
  'Madagascar Centella Asiatica Cream'
);
