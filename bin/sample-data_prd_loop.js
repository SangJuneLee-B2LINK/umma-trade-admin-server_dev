'use strict';

//------------------------- Moudule;
const appRoot = require('app-root-path');
const app = appRoot.require('/server/server');
const Model = app.models.Product;
//------------------------- Moudule;
//------------------------- Variable;
/**
* 상품디비샘플 스키마;
*/
var sampleData = {
	  "id" : 1,
	  "pimsId" : "PM5771",
	  "catCd" : "001001001",
	  "userId" : "",
	  "companyId" : "",
	  "brId" : 1,
	  "sku" : "BL01AMP03260001000",
	  "barcode" : "8809541370724",
	  "bestSeller": 0,
      "newProduct": 0,
	  "recommended": 0,
	  "sort": 0,
	  "name" : "VITAMIN B5 10.8% MOISTURE AMPOULE",
	  "images" : "[\"{{images}}\", \"{{images}}\", \"{{images}}\"]",
	  "refUrl" : "http://commonlabs.co.kr/product/detail.html?product_no=36&cate_no=25&display_group=1",
	  "taxation" : 1,
	  "moq" : 5000,
	  "retailPrice" : 22000,
	  "supplyPrice" : 3250,
	  "salePrice" : 3250,
	  "pricingTable" : "[{\"min\" : 0, \"max\" : 100, \"price\" : {{prc1}}, {\"min\" : 100, \"max\" : 200, \"price\" : {{prc2}}}, {\"min\" : 200, \"max\" : 300, \"price\" : {{prc3}}} ]",
	  "capacity" : 18,
	  "volume": 8,
	  "sizeHorizontal": 2,
	  "sizeVertical": 2,
	  "sizeHeight": 2,
	  "totalWeight": 200,
	  "inboxQuantity": 1,
	  "ingredient" : "Water(Aqua/Eau), Panthenol, Butylene Glycol, 1,2-Hexanediol, Sodium Hyaluronate, Honey Extract, Gossypium Herbaceum (Cotton) Extract, Vanilla Planifolia Fruit Extract, Carbomer, Beta-Glucan, Trehalose, Sodium PCA, Tromethamine, Disodium EDTA, PPG-26-Buteth-26, Benzophenone-5, Citric Acid, Chlorophyllin-Copper Complex, PEG-40 Hydrogenated Castor Oil, Ammonium Acryloyldimethyltaurate/VP Copolymer, Fragrance",
	  "manufactured" : "나우코스",
	  "distributor" : "커먼랩스",
	  "producerCtId" : "KR",
	  "producerArea" : "",
	  "msds" : "[{\"url\" : \"https://www.wd40.com/files/pdf/msds-wd482671453.pdf\", orgFileName : \"MSDS_1.pdf\"}, {\"url\" : \"https://www.wd40.com/files/pdf/msds-wd482671453.pdf\", orgFileName : \"MSDS_2.pdf\"}, {\"url\" : \"https://www.wd40.com/files/pdf/msds-wd482671453.pdf\", orgFileName : \"MSDS_3.pdf\"}]",
	  "certificate" : "[{\"id\" : \"AC1\",\"nm\" : \"Made Safe\"}, {\"id\" : \"AC2\",\"nm\" : \"Leaping Bunny Approved\"}]",
	  "suppliedChannel" : "[{\"id\" : \"{{dc_id}}\",\"nm\" : \"{{dc_nm}}\"}]",
	  "invalidCountry" : "[{\"id\" : \"{{ct_id}}\",\"nm\" : \"{{ct_nm}}\"}]",
	  "contents" : "<b>사용자가 직접작성하는 상품 Description 영역입니다.</b>"
	};

/**
* 카테고리샘플데이터.
*/
var categortArr = ["001001001","001001002","001001003","001001004","001001005","001001006","001002001","001002002","001002003","001002004","001002005","001003001","001003002","001003003","001003004","001004001","001005001","001005002","001005003","001005004","001005005","001005006","001005007","001005008","002001001","002001002","002001003","002001004","002002001","002002002","002002003","002002004","003001001","003002001","003003001","003003002","003003003","003005001","003006001","003007001"];

/**
* 국가샘플데이터.
*/
var countryArr = [{id : "KR",nm : "KOREA"},{id : "JP",nm : "JAPAN"},{id : "CN",nm : "CHINA"}];

/**
* 공급채널샘플데이터.
*/
var dcArr = [{id : "DC1",nm : "Amazon"},{id : "DC2",nm : "Anthropologie"},{id : "DC3",nm : "As Nature Intended"}];

/**
* 이미지경로 샘플데이터.
*/
var imagesArr = [
	"http://commonlabs.co.kr/web/product/big/201808/c90933bf99a8886f263ee23dcbfffa50.jpg",
	"http://commonlabs.co.kr/web/product/big/201808/0e5bd4f57b4ed4c9970f9a1b2bdea614.jpg",
	"http://commonlabs.co.kr/web/product/big/201808/ea9467904662621ee54e256aae45b5f0.jpg",
	"http://commonlabs.co.kr/web/product/big/201807/40_shop1_15329332883953.jpg",
	"http://commonlabs.co.kr/web/product/big/201803/34_shop1_102867.jpg",
	"http://commonlabs.co.kr/web/product/big/201803/35_shop1_641256.jpg",
	"http://commonlabs.co.kr/web/product/big/201807/25_shop1_1532941438651.jpg",
	"http://commonlabs.co.kr/web/product/big/201803/24_shop1_145732.jpg",
	"http://commonlabs.co.kr/web/product/big/201803/26_shop1_206153.jpg",
	"http://skin1004korea.com/web/product/big/201807/9_shop1_15311031326544.jpg",
	"http://skin1004korea.com/web/product/medium/201808/e906bfff091c551ed0edd62b52f1768d.jpg",
	"http://skin1004korea.com/web/product/medium/201808/df1fd17f6cdb85263a0035d4e4f3a1a3.jpg",
	"http://skin1004korea.com/web/product/medium/201808/e906bfff091c551ed0edd62b52f1768d.jpg",
	"http://skin1004korea.com/web/product/medium/201807/33_shop1_15311028573815.jpg",
	"http://skin1004korea.com/web/product/medium/201808/df1fd17f6cdb85263a0035d4e4f3a1a3.jpg",
	"http://skin1004korea.com/web/product/medium/201808/b0917facd3c84fd85086e7e53e3dd4e7.jpg",
	"http://skin1004korea.com/web/product/medium/201807/12_shop1_15311030929982.jpg",
	"http://skin1004korea.com/web/product/medium/201807/23_shop1_15311029719072.jpg",
	"http://skin1004korea.com/web/product/medium/201808/d80fdc4dd8e88a62512fe57c33df7946.jpg",
	"http://skin1004korea.com/web/product/medium/201807/18_shop1_15311030334656.jpg",
	"http://skin1004korea.com/web/product/medium/201807/13_shop1_15311030803712.jpg",
	"http://skin1004korea.com/web/product/medium/201807/20_shop1_15311030186963.jpg",
];

var i = 1, iLen = 100,ii = 0,to,ct_cnt,tmp;

var userIdArr = [ 'A1', 'A2', 'A3']

//------------------------- Variable;
//------------------------- Function;
/**
* 랜덤문자열을 리턴한다.
*/
var makeName = function(){
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 20; i++){
	text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

/**
* 랜덤 Int를 리턴한다.
*/
var generateRandom = function (min, max) {
  var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
  return ranNum;
}

/**
*데이터를 입력한다.
*/
var insertData = function(){
	to = sampleData;
	to.id = i;
	to.name = makeName();
	to.userId = userIdArr[ generateRandom(0,2) ];
	to.companyId = "A1"
	to.brId = generateRandom(1,30);
	to.catCd = categortArr[ generateRandom(0,39) ];
	to.moq = generateRandom(1,2000);
	to.retailPrice = generateRandom(1,10000);
	to.supplyPrice = generateRandom(1,5000);
	to.capacity = generateRandom(1,300);
	to.sizeHorizontal = generateRandom(2,10);
	to.sizeVertical = generateRandom(2,10);
	to.sizeHeight = generateRandom(2,10);
	to.volume = to.sizeHorizontal * to.sizeVertical * to.sizeHeight;
	to.totalWeight = generateRandom(100,500);
	to.inboxQuantity = generateRandom(1, 30);

	tmp = "[\"{{images}}\", \"{{images}}\", \"{{images}}\"]";
	to.images = tmp.replace(/{{images}}/g,imagesArr[ ii ]);

	tmp = "[{\"min\" : 0, \"max\" : 100, \"price\" : {{prc1}}}, {\"min\" : 100, \"max\" : 200, \"price\" : {{prc2}}}, {\"min\" : 200, \"max\" : 300, \"price\" : {{prc3}}} ]";
	to.pricingTable = tmp.replace(/{{prc1}}/,to.supplyPrice).replace(/{{prc2}}/,to.supplyPrice * 2).replace(/{{prc3}}/,to.supplyPrice * 3);

	ct_cnt = generateRandom(0,2);
	tmp = "[{\"id\" : \"{{ct_id}}\",\"nm\" : \"{{ct_nm}}\"}]";
	to.invalidCountry = tmp.replace('{{ct_id}}',countryArr[ ct_cnt ].id).replace('{{ct_nm}}',countryArr[ ct_cnt ].nm);

	tmp = "[{\"id\" : \"{{dc_id}}\",\"nm\" : \"{{dc_nm}}\"}]";
	to.suppliedChannel = tmp.replace('{{dc_id}}',dcArr[ ct_cnt ].id).replace('{{dc_nm}}',dcArr[ ct_cnt ].nm);

	Model.create(to,function(err){
		if(err) console.log(err);
		if( i == iLen ){
			console.log('Data Insert End -- ' + i + "건")
			return process.exit(1);
		}
		else
		{
			if( ii == 20 )
			{
				ii = 0;
				++i;
				insertData();
			}
			else
			{
				++ii;
				++i;
				insertData();
			}
		}
	})
}
//------------------------- Function;
//------------------------- Login;
insertData();
//------------------------- Login;
