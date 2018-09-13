# umma-trade-admin-server

* admin
  - 프로젝트 루트 디렉토리에 .env 파일을 생성하여 아래 샘플과 같이 환경변수를 작성해야한다.
  ```
  NODE_ENV=development
  STRONGLOOP_GLOBALIZE_APP_LANGUAGE=en
  MYSQL_HOST=디비호스트
  MYSQL_PORT=디비포트
  MYSQL_USER=디비유저
  MYSQL_PASSWORD=디비암호
  MYSQL_DB=디비명
  MAIL_TYPE=smtp
  MAIL_HOST=smtp.gmail.com
  MAIL_SECURE=true
  MAIL_PORT=465
  MAIL_USER=이메일주소
  MAIL_PASSWORD=이메일비밀번호
  AWS_ACCESS_KEY_ID=키아이디
  AWS_SECRET_ACCESS_KEY=시크릿키
  AWS_S3_KEY_ID=키아이디
  AWS_S3_KEY=시크릿키
  AWS_CW_REGION=리전명
  AWS_CW_LOG_GROUP=로그그룹명
  AWS_CW_LOG_STREAM=로그스트림명
  ```

### TODO

* [ ] 클라우드 로그 관리 솔루션 선정
  - CloudWatch
  - DataDog
  - LogEntries

* [ ] 샘플 코드 사용 후 삭제
  - 소스 내에 // sample code 검색해서 찾기

* [ ] 오래된 CustomAccessToken 자동 삭제
  - 만료된 토큰 데이터를 삭제처리해야한다.

* [ ] 캐쉬 처리할 데이터 정리 후 로직 추가
  - 카테고리
  - 공통코드
  - 사이트정보
  - 기타

* [ ] 배포 도구 선정 (CI/CD)
  - CodeDeploy
  - Jenkins
  - CodeShip

### 개발 참고사항

* Stack
  - AWS Route 53 / ACM / CF / S3 / SES / RDS / EB / 추가 예정...
    + Elastic Beanstalk Node.js 현재 최신버전은 8.11.3 이다.
      + https://docs.aws.amazon.com/ko_kr/elasticbeanstalk/latest/dg/concepts.platforms.html#concepts.platforms.nodejs
  - Node.js 10.x
    + loopback-cli 는 8.x 버전에서 에러없이 설치됨 (cli 사용안함)
  - loopback 3.x
  - MariaDB 10.x
    + 개발환경 : 회사 123번 서버 MariaDB 10.3.8 on Docker
    + 운영환경 : AWS RDB MariaDB 10.2
  - Channel.io 챗 서비스 연동

* Loopback Customizing
  - 커스텀 멀티 유저 환경 구성으로 내장 빌트인 모델 확장으로 인해 내장 $owner 룰은 사용할 수 없다. 
    + The app configuration follows the multiple user models setup as described in http://ibm.biz/setup-loopback-auth The built-in role resolver $owner is not currently compatible with this configuration and should not be used in production.
  - ROLE : $everyone, $unauthenticated, $authenticated, admin, buyer, seller
    + https://loopback.io/doc/en/lb3/Controlling-data-access.html#comprehensive-accesstype-property-and-end-point
  - 내장 모델에는 ACLs 기본값을 확인하고 재설정이 필요하다.
    + http://apidocs.loopback.io/loopback/#user
  - 릴레이션 설정 참고
    + https://loopback.io/doc/en/lb3/Accessing-related-models.html

* ACL
  - accessType : READ, WRITE, EXECUTE
  - principalType : APPLICATION, USER, ROLE
  - principalId : appId, userId, roleId
  - permission : ALARM, ALLOW, AUDIT, DENY

* Custom Role
  - admin
  - buyer
  - seller

* Debugging
  - https://loopback.io/doc/en/lb3/Setting-debug-strings.html
  - examples
    ```
    DEBUG=<pattern>[,<pattern>...] node .
    DEBUG=* node .
    DEBUG=*mysql node .
    DEBUG=loopback:datasource node .
    DEBUG=loopback:connector:mysql node .
    DEBUG=*,-strong-remoting:* node .
    ```

* Security advisories
  - 아래 페이지에 수시로 접속해서 보안 업데이트가 있는지 확인해야한다.
    + https://loopback.io/doc/en/lb3/Security-advisories.html
