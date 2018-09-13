'use strict';

const commonCode = require('../../lib/common-code');
const commonSite = require('../../lib/common-site');

module.exports = function(app) {
  commonCode.load(app);
  commonSite.load(app);

//	app.models.Product.find({include:['admin','brand','company'],limit : 1},function(err,d0){
//		console.log( d0 )
//	})

//app.models.Admin.update({ id : 'A20180905092020'},{ roleId : 2 },function(err,d){
//	if(err) throw(err);
//	console.log(d)
//})

//app.models.Admin.find({
//  include: {
//    relation: 'company', // include the owner object
//    scope: { // further filter the owner object
//      //fields: ['id','companyId'], // only show two fields
//      where: { ctId: "KR"}
//      }
//    },
//			limit: 5
//  ,where: { "company.ctId" : "JP"}
//},function(err,d){
//console.log(d)
//})
var data = {
	"buyer" : {
		"id" : -1,
		"companyId" : "",
		"userType" : "R",
		"ctId" : "KR",
		"firstName" : "choi",
		"lastName" : "sukjune",
		"password" : "111",
		"email" : "12k4@naver.com",
		"nickName" : "test",
		"avatar" : "test.jpg",
		"position" : "Manger",
		"phone" : "+82000000",
		"mobile" : "+82000000",
		"comments" : "쿼리테스트",
		"status" : "W"
	},
	"company" : {
		"id" : "",
		"bizType" : "DTB",
		"scale" : "LV1",
		"name" : "test",
		"ceoFirstName" : "test",
		"ceoLastName" : "test",
		"bizNumber" : "000",
		"phone" : "000",
		"fax" : "000",
		"ctId" : "KR",
		"csId" : "",
		"city" : "SEOUL",
		"address1" : "11",
		"address2" : "11",
		"zipcode" : "111",
		"website" : "1111",
		"attachments" : ""
	}
}
app.models.ProductFavorite.deleteById(2,function(err,d){
console.log( d );
});
//app.models.Buyer.updateUserStatusArray(['B1',"B2"],"C")
//app.models.Admin.sendEmail();
//var data = {
//
//  "id" : -1,//----true | Number | id | N----
//  "firstName" : "choi",//----true | String | first_name | N----
//  "lastName" : "sukjune",//----true | String | last_name | N----
//  "password" : "111",//----true | String | password | N----
//  "email" : "12k4@naver.com",//----true | String | email | N----
//  "nickName" : "test",//----false | String | nick_name | Y----
//  "avatar" : "test.jpg",//----false | String | avatar | Y----
//  "position" : "Manger",//----false | String | position | Y----
//  "phone" : "+82000000",//----false | String | phone | Y----
//  "mobile" : "+82000000",//----false | String | mobile | Y----
//  "comments" : "쿼리테스트",//----false | String | comments | Y---
//  "status" : "W",//----false | String | status | Y----
//
//}
	//app.models.Admin.createUser( data );

};
