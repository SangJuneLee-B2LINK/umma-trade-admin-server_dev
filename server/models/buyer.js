'use strict';

const logger = require('../../lib/logger')(module);

module.exports = function(Buyer) {
  // override deleteById method
  Buyer.deleteById = function(id, cb) {
    Buyer.update({id: id}, {
      status: Buyer.app.umma.commonCode.DATA_STATUS.DELETED,
      deleted: new Date(),
    }, cb);
  };
/**
 * 바이어 회원등록(회사정보도 같이 등록한다.);
 * @function
 * @param {data} Object
<code>
{
	"buyer" : {
		"id" : -1,
		"companyId" : "",
		"firstName" : "choi",
		"lastName" : "sukjune",
		"password" : "111",
		"email" : "12k4@naver.com",
		"nickName" : "test",
		"avatar" : "test.jpg",
		"position" : "Manger",
		"phone" : "+82000000"
		"mobile" : "+82000000",
		"comments" : "쿼리테스트",
		"status" : "W"
	},
	"company" : {
		"id : "",
		"bizType : "DTB",
		"scale : "LV1",
		"name : "test",
		"ceoFirstName : "test",
		"ceoLastName : "test",
		"bizNumber : "000",
		"phone : "000",
		"fax : "000",
		"ctId : "KR",
		"csId : "",
		"city : "SEOUL",
		"address1 : "11",
		"address2 : "11",
		"zipcode : "111",
		"website : "1111",
		"attachments : ""
	}
}
</code>
 * @return {result} Object
<code>
{
	"buyer" : {"id" : -1,"roleId" : "","companyId" : "","firstName" : "","lastName" : "","password" : "","email" : "","nickName" : "","avatar" : "","position" : "","phone" : "","mobile" : "","comments" : "","status" : ""},
	"company" : {"id : "","bizType : "","scale : "","name : "","ceoFirstName : "","ceoLastName : "","bizNumber : "","phone : "","fax : "","ctId : "","csId : "","city : "","address1 : "","address2 : "","zipcode : "","website : "","attachments : ""}
}
</code>
 */	
	Buyer.createUser = function( data ){	
		 var result = {buyer : {},company : {}}
		 Buyer.find({order : 'id desc',limit : 1},function(err,d){
				if(err) throw(err);

				var idx = "B" + ((d[0].id.substr(1) * 1) + 1);
				data.buyer.id = data.companyId = idx;
				data.buyer.roleId = 1;
				
				Buyer.create(data.buyer,function(err,r){
					if(err) throw(err);
				
					console.log( r );
					result.buyer = r;
					data.company.id = data.buyer.id;
					
					Buyer.app.models.BuyerCompany.create(data.company,function(err,r){
							if(err) throw(err);
					
							console.log( r );
							result.company = r;
							return result;
					})
				})
		 })
	};

/**
 * 회원아이디로 상태를 변경하는 함수(승인상태 및 상태);
<code>
USER_STATUS
D : 삭제
N : 미사용
Y : 사용
W : 대기
H : 보류
O : 탈퇴
</code>
 * @function
 * @param {id} Number
 * @param {cd} String
 * @return {d} Object
 <code>
	{	count : 1	}
 </code>
 */
	Buyer.updateUserStatusById = function( id,cd ) {	
		Buyer.update({id : id},{ status : cd, updated : new Date() },function(err,d){
			if(err) console.log( err );
			console.log( d );
			return d;
		});
	};

/**
 * 회원아이디로 상태를 변경하는 함수(승인상태 및 상태);
<code>
USER_STATUS
D : 삭제
N : 미사용
Y : 사용
W : 대기
A : 승인
R : 거절
H : 보류
O : 탈퇴
</code>
 * @function
 * @param {arr} Array
 <code>
 [ 'B1', 'B2','B3',...]
 </code>
 * @param {cd} String
 * @return {d} Object
 <code>
	{	count : 1	}
 </code>
 */
	Buyer.updateUserStatusArray = function( arr, cd ) {	
		Buyer.update( { id : { inq: arr }}, { status : cd, updated : new Date() },function(err,r){
			if(err) console.log( err );
			console.log( r );
			return r;
		});
	};
  
	/**
	 * 가입승인을 아이디로 업데이트한다.
	 * @function
	 * @param {id} String
	 * @param {cd} String
	 <code>
		USER_STATUS
		A : 승인
		R : 거절
	 </code>
	 * @return {d} Object
	 <code>
		{	count : 1	}
	 </code>
	 */
	Buyer.updateUserRegistApprovalById = function( id, cd ) {	
		Buyer.update({id : id},{ status : cd, approved : new Date() },function(err,d){
			if(err) console.log( err );
			console.log( d );
			return d;
		});
	};

	/**
	 * 가입승인을 여러 아이디로 업데이트한다.;
	 * @function
	 * @param {arr} Array
	 <code>
	 [ 'B1', 'B2','B3',...]
	 </code>
	 * @param {cd} String
	 <code>
		USER_STATUS
		A : 승인
		R : 거절
	 </code>
	 * @return {d} Object
	 <code>
		{	count : 1	}
	 </code>
	 */
	Buyer.updateUserRegistApprovalArray = function( arr, cd ) {	
		Buyer.update( {where: { id : { inq: arr }}}, { status : cd, approved : new Date() },function(err,r){
			if(err) console.log( err );
			console.log( r );
			return r;
		});
	};
  

	/**
	*
	* @function
	* @param{id} String;
	* @param{data} Object
	<code>
	{
		"buyer" : {
			"companyId" : "A1",
			"firstName" : "choi",
			"lastName" : "sukjune",
			"password" : "111",
			"email" : "12k4@naver.com",
			"nickName" : "test",
			"avatar" : "test.jpg",
			"position" : "Manger",
			"phone" : "+82000000"
			"mobile" : "+82000000",
			"comments" : "쿼리테스트",
			"status" : "W"
		},
		"company" : {
			"id : "A1",
			"bizType : "DTB",
			"scale : "LV1",
			"name : "test",
			"ceoFirstName : "test",
			"ceoLastName : "test",
			"bizNumber : "000",
			"phone : "000",
			"fax : "000",
			"ctId : "KR",
			"csId : "",
			"city : "SEOUL",
			"address1 : "11",
			"address2 : "11",
			"zipcode : "111",
			"website : "1111",
			"attachments : ""
		}
	}
	</code>
	 * @return {result} Object
	<code>
	{
		"buyer" : {"id" : -1,"roleId" : "","companyId" : "","firstName" : "","lastName" : "","password" : "","email" : "","nickName" : "","avatar" : "","position" : "","phone" : "","mobile" : "","comments" : "","status" : ""},
		"company" : {"id : "","bizType : "","scale : "","name : "","ceoFirstName : "","ceoLastName : "","bizNumber : "","phone : "","fax : "","ctId : "","csId : "","city : "","address1 : "","address2 : "","zipcode : "","website : "","attachments : ""}
	}
	</code>
	*/
	Buyer.updateUserInfo = function( id, data ){
		var result = { buyer : {},company : {} };
		
		//회원정보수정;
		Buyer.update({ id : id },data.buyer,function(err,r){
			if(err) throw(err);
			
			console.log(r);
			result.buyer = r;

			//회원회사정보수정;
			Buyer.app.models.BuyerCompany.upadate({id : id},data.company,function(err,r){
				if(err) throw(err);
				
				console.log(r);
				result.company = r;
				
				return result
			})
		})
	}

};
