'use strict';

module.exports = function(ViewAdminUser) {
	/**
	* 관리자회원을 조회하는 함수;
	* @function
	* @param {filter} Object
	<code>
	{
		where : {
			email : { link : '%12%'},//회원아이디(like 검색)
			userType : "SA",//회원구분
			ctId : "KR",//회원회사의국가
			status : "Y",//회원상태
			created : { between: ['2018-09-05', '2018-09-06'] }//등록기간검색
		},//검색조건
		order : [''],//'id DESC | ASC'//정렬
		limit : 1 //리스트갯수
	}
	</code>
	* @return {data} Array;
	<code>
	[ { id: 'A2',
    ctId: 'KR',
    realm: null,
    roleId: 1,
    userType: 'NA',
    companyId: 'A1',
    firstName: 'Choi',
    lastName: 'Sukjune',
    password:'$2a$10$AZspruTTELc1bIGfurlP8O2Isj1s/FomXsCAQTzLafigKu7X8djzu',
    passwordUpdated: null,
    email: 'jun@blink.co.kr',
    emailVerified: null,
    emailVerifiedUpdated: null,
    verificationToken: null,
    nickName: null,
    avatar:'https://www.shareicon.net/data/128x128/2015/10/07/113615_face_512x512.png',
    position: 'Manager',
    phone: '+821068636311',
    mobile: '+821068636311',
    comments: '테스트유저입니다.',
    lastLogin: null,
    loginCount: 0,
    status: 'W',
    statusUpdated: null,
    created: 2018-09-05T07:29:46.000Z,
    approved: null,
    updated: null,
    deleted: null },
	...
	]
	</code>
	*/
	ViewAdminUser.getList = function( filter ){
		ViewAdminUser.find(filter,function(err,data){
			if(err) throw(err);
			console.log( data );
			return data;
		})
	}
		/**
	* 관리자회원을 ID 기준으로 조회하는 함수;
	* @function
	* @param {id} Number;
	* @return {data} Object;
	<code>
	{ id: 'A2',
    ctId: 'KR',
    realm: null,
    roleId: 1,
    userType: 'NA',
    companyId: 'A1',
    firstName: 'Choi',
    lastName: 'Sukjune',
    password:'$2a$10$AZspruTTELc1bIGfurlP8O2Isj1s/FomXsCAQTzLafigKu7X8djzu',
    passwordUpdated: null,
    email: 'jun@blink.co.kr',
    emailVerified: null,
    emailVerifiedUpdated: null,
    verificationToken: null,
    nickName: null,
    avatar:'https://www.shareicon.net/data/128x128/2015/10/07/113615_face_512x512.png',
    position: 'Manager',
    phone: '+821068636311',
    mobile: '+821068636311',
    comments: '테스트유저입니다.',
    lastLogin: null,
    loginCount: 0,
    status: 'W',
    statusUpdated: null,
    created: 2018-09-05T07:29:46.000Z,
    approved: null,
    updated: null,
    deleted: null
	}
	</code>
	*/
	ViewAdminUser.getById = function(id){
		ViewAdminUser.findOne({ where : { id : id }},function(err,data){
			if(err) throw(err);
			console.log( data );
			return data;
		})
	}
};
