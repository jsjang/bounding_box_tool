
CREATE DATABASE bb_annotation;            
USE bb_annotation;

CREATE TABLE `info` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'num 이라는 필드를 따로 지정해서 테이블 간 연결 역할을 하게 함.',
  `description` varchar(500) NOT NULL DEFAULT '' COMMENT '데이터 정보',
  `url` char(50) NOT NULL COMMENT '데이터 공개 URL',
  `version` char(3) NOT NULL COMMENT '데이터버전',
  `year` int(5) NOT NULL COMMENT '데이터 공개 연도',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `licenses` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `possession` varchar(50) NOT NULL DEFAULT '' COMMENT '소유권 정보',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `images` (
  `image_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `license_id` int(3) NOT NULL COMMENT '라이센스 id값',
  `file_name` char(50) DEFAULT NULL COMMENT '파일 이름',
  `height` int(10) DEFAULT NULL COMMENT '이미지 높이',
  `width` int(10) DEFAULT NULL COMMENT '이미지 폭',
  PRIMARY KEY (`image_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `annotations` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `image_id` int(11) NOT NULL COMMENT '이미지 id',
  `seq_num` int(4) NOT NULL COMMENT 'image_id와 결합해서 uniqe 값 구성',
  `image_url` varchar(500) NOT NULL DEFAULT '' COMMENT 'image url',
  `type` varchar(30) NOT NULL DEFAULT '' COMMENT 'Bounding Box',
  `category_id` int(5) DEFAULT NULL COMMENT '대상체 클래스',
  `lefttop_x` int(4) DEFAULT NULL COMMENT '바운딩 박스 좌표; 좌상단 x 좌표',
  `lefttop_y` int(4) DEFAULT NULL COMMENT '바운딩 박스 좌표; 좌상단 y 좌표',
  `rightbottom_x` int(4) DEFAULT NULL COMMENT '바운딩 박스 좌표; 우하단 x 좌표',
  `rightbottom_y` int(4) DEFAULT NULL COMMENT '바운딩 박스 좌표; 우하단 y 좌표',
  `truncated` tinyint(1) DEFAULT NULL COMMENT '태그; 대상체 잘림',
  `hidden` tinyint(1) DEFAULT NULL COMMENT '태그; 대상체 가려짐',
  `light_reflex` tinyint(1) DEFAULT NULL COMMENT '태그; 대상체 빛반사',
  `na` tinyint(1) DEFAULT NULL COMMENT '태그; 속성 해당없음',
  `flag` tinyint(1) NOT NULL DEFAULT '0' COMMENT '작업 여부 구분; 작업된 경우 1, 아니면 0',
  `cat_class_id` int(11) NOT NULL COMMENT '카테고리 ID; categories 테이블 참조',
  `info_id` int(11) NOT NULL COMMENT 'INFO ID; info 테이블 참조',
  `license_id` int(11) NOT NULL COMMENT '라이선스 ID; licenses 테이블 참조',
  PRIMARY KEY (`id`),
  UNIQUE KEY `image_id` (`image_id`,`seq_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `categories` (
  `class_id` int(11) DEFAULT NULL COMMENT '클래스 id',
  `name` varchar(30) DEFAULT NULL COMMENT '클래스 이름',
  `supercategory` varchar(10) DEFAULT NULL COMMENT '대분류',
  `metainfo` json DEFAULT NULL COMMENT '하위 카테고리, json형태 사용'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO info (description, url, version, year)
		  values ('2020 landmark Dataset',
				  'https://aihub.or.kr/aidata/8009',
                  '1.0',
                  2020);

INSERT INTO licenses (id, possession)
		  values (1, 'PCN컨소시엄');
          
INSERT INTO images (image_id, license_id, file_name, width, height)
		  values (1,
                  1,
				  'lss_statue.jpg',
                  700,
                  700
                  );

INSERT INTO annotations (image_id, seq_num, image_url, type, category_id, cat_class_id, info_id, license_id)
		  values (1,
                  1,
                  'https://cdn.sejongeconomy.kr/news/photo/201901/10320_11642_1019.jpg',
                  'Bounding box',
				  1,
                  1,
                  1,
                  1);
                  
INSERT INTO categories (class_id, name, supercategory, metainfo)
		  values (1,
				  '(구)태백등기소',
                  '문화유산',
                  json_object('location1', '강원도',
							  'location2', '태백시',
                              'Type1', '문화유산',
                              'Type2', '사적',
                              'name_kr', '(구)태백등기소',
                              'add', '강원도 태백시 장성동 62-4'));

INSERT INTO info (description, url, version, year)
		  values ('2020 landmark Dataset',
				  'https://aihub.or.kr/aidata/8009',
                  '1.0',
                  2020);

INSERT INTO images (image_id, license_id, file_name, width, height)
		  values (2,
                  1,
				  'namsan_tower.jpg',
                  1000,
                  500
                  );

INSERT INTO annotations (image_id, seq_num, image_url, type, category_id, cat_class_id, info_id, license_id)
		  values (2,
                  1,
                  'http://image.kmib.co.kr/online_image/2019/0202/611220110013038149_1.jpg',
                  'Bounding box',
				  1,
                  1,
                  1,
                  1);
          
