'use strict';

const path = require('path');
const logger = require('../../lib/logger')(module);

module.exports = function(Admin) {
  // override deleteById method

	/**
	*회원삭제 함수 - 회원상태를 삭제로 업데이트 한다.
  * @param {id} Number;
	*/
	Admin.deleteById = function(id, cb) {
    Admin.update({id: id},
      {
        status: Admin.app.umma.commonCode.USER_STATUS.DELETED,
        deleted: new Date(),
      }, cb);
  };

/**
 * 회원아이디로 입력하는하는 함수(승인상태 및 상태);
<code>
</code>
 * @function
 * @param {data} Object
<code>
{
  "id" : -1,
	"userType" : "SA",
	"ctId" : "KR",
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
}
</code>
 * @return {d} Object
<code>
{
  "id" : -1,
	"userType" : "",
	"ctId" : "",
	"firstName" : "",
	"lastName" : "",
	"password" : "",
	"email" : "",
	"nickName" : "",
	"avatar" : "",
	"position" : "",
	"phone" : "",
	"mobile" : "",
	"comments" : "",
	"status" : ""
}
</code>
 */

	Admin.createUser = function( data, cb ){
		 return Admin.find({order : 'id desc',limit : 1},function(err,d){
				data.id = "A" + ((d[0].id.substr(1) * 1) + 1);
				data.roleId = 1;
				data.companyId = "A1";
				Admin.create(data,cb)
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
	Admin.updateUserStatusById = function( id, cd, cb ) {
		return Admin.update({id : id},{ status : cd, updated : new Date() },cb);
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
	Admin.updateUserStatusArray = function( arr, cd, cb ) {
		return Admin.update( { id : { inq: arr }}, { status : cd, updated : new Date() },cb);
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
	Admin.updateUserRegistApprovalById = function( id, cd ) {
		return Admin.update({id : id},{ status : cd, approved : new Date() },cb);
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
	Admin.updateUserRegistApprovalArray = function( arr, cd, cb ) {
		Admin.update( {where: { id : { inq: arr }}}, { status : cd, approved : new Date() }, cb );
	};


	/**
	*
	* @function
	* @param{id} String;
	* @param{data} Object
	<code>
	{
		"userType" : "",
		"ctId" : "",
		"firstName" : "",
		"lastName" : "",
		"password" : "",
		"email" : "",
		"nickName" : "",
		"avatar" : "",
		"position" : "",
		"phone" : "",
		"mobile" : "",
		"comments" : "",
		"status" : ""
	}
	</code>
	* @return{data} Object
	*/
	Admin.updateUserInfo = function( id, data ){
		Admin.update({id : id},data, cb )
	}

  // sample code - send an email
  Admin.sendEmail = function(cb) {
    Admin.app.models.Email.send({
      to: 'jun@b2link.co.kr',
      from: 'noreply@umma.io',
      subject: 'umma.io test email',
      text: 'my text',
      html: 'my <em>html</em>',
    }, function(err, mail) {
      console.log('email sent!');
      if (mail) console.log(mail);
      cb(err, true);
    });
  };

  // sample code - send an email
  Admin.remoteMethod('sendEmail', {
    returns: {arg: 'success', type: 'boolean'},
    http: {verb: 'get'},
  });

  // sample code - Validating model data
  // Admin.validatesPresenceOf('name', 'email');
  // Admin.validatesLengthOf('password', {min: 5, message: {min: 'Password is too short'}});
  // Admin.validatesInclusionOf('gender', {in: ['male', 'female']});
  // Admin.validatesExclusionOf('domain', {in: ['www', 'billing', 'admin']});
  // Admin.validatesNumericalityOf('age', {int: true});
  // Admin.validatesUniquenessOf('email', {message: 'email is not unique'});
  //
  // const re = /^(([^<>()[\]\\.,;:\s@\"]-(\.[^<>()[\]\\.,;:\s@\"]-)*)|(\".-\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]-\.)-[a-zA-Z]{2,}))$/;
  // Admin.validatesFormatOf('email', {with: re, message: 'Must provide a valid email'});
  // if (!(Admin.settings.realmRequired || Admin.settings.realmDelimiter)) {
  //   Admin.validatesUniquenessOf('email', {message: 'Email already exists'});
  //   Admin.validatesUniquenessOf('username', {message: 'User already exists'});
  // }

  const roleName = 'admin';

  // rollback user registration
  function rollbackUser(id) {
    Admin.removeById(id);
    logger.info('remove admin user id:', id);
  }

  // add role mapping and send verification email after registration
  Admin.afterRemote('create', function(context, userInstance, next) {
    logger.debug('Admin.afterRemote triggered');
    try {
      // add role mapping
      const CustomRole = Admin.app.models.CustomRole;
      const CustomRoleMapping = Admin.app.models.CustomRoleMapping;

      CustomRole.find({
        where: {
          name: roleName,
        },
      }, async function(err, role) {
        if (err) {
          // rollback
          rollbackUser(userInstance.id);
          logger.error(err);
          return next(err);
        }
        if (role.length === 0) {
          // rollback
          rollbackUser(userInstance.id);
          const err = new Error(`Custom Role '${roleName}' not found.`);
          logger.error(err);
          return next(err);
        }
        CustomRoleMapping.create({
          principalType: role[0].name,
          principalId: userInstance.id,
          roleId: role[0].id,
        }, function(err, roleMapping) {
          if (err) {
            // rollback
            rollbackUser(userInstance.id);
            logger.error(err);
            return next(err);
          }
          logger.info('user assigned roleId:', roleMapping.roleId);
        });
      });

      // send verification email
      const options = {
        type: 'email',
        to: userInstance.email,
        from: 'noreply@umma.io',
        subject: 'Thanks for registering.',
        template: path.resolve(__dirname, '../../server/views/verify.ejs'),
        redirect: '/verified',
        user: Admin,
      };

      userInstance.verify(options, function(err, response, next) {
        if (err) return next(err);
        logger.info('verification email sent:', response);
        context.res.render('response', {
          title: 'Signed up successfully',
          content: 'Please check your email and click ' +
            'on the verification link before logging in.',
          redirectTo: '/',
          redirectToLinkText: 'Log in',
        });
      });
    } catch (err) {
      // rollback
      rollbackUser(userInstance.id);
      logger.error(err);
      return next(err);
    }
  });
};
