'use strict';

module.exports = function(ViewInquiry) {

    /**
     * 상품리스트를 조회하는 함수;
     * @param  {Object} filter
     <code>
     {
        where : {
            registerEmail : { like : '%value%'},
            registerCompanyName : { like : '%value%'},
            name : { like : '%value%'},
            catCd1depth : "",
            catCd2depth : "",
            catCd3depth : "",
            brName : { like : '%value%'},
            barcode : { like : '%value%'},
            status : "",
            bestSeller : 1,
            display : 1,
            producerCtId : "",
            producerArea : "",<-- 검섹조건에서 삭제예정
            invalidCountry : { nlike: '%KR%' },
            suppliedChannel : { like: '%AM%' },
            { created : { between: ['2018-09-05', '2018-09-06'] }}//등록기간검색
        },//검색조건
        order : [''],//'id DESC | ASC'//정렬
        limit : 1 //리스트갯수
    }
     </code>
     * @return {Array} r
     */
    ViewInquiry.getListBySearchCondition = function( filter ) {
        filter = filter | {};
        ViewInquiry.find(filter, function(err, r){
            if(err) throw(err);
            console.log( r )
            return r;
        })
    };

    /**
     * 상품 id로 상세정보를 조회한다.
     * @param  {Number} id
     * @return {Object} r
     */
    ViewInquiry.getDetailById = function( id ) {
        ViewInquiry.findOne({ id : id }, function(err, r){
            if(err) throw(err);
            console.log( r )
            return r;
        })
    };
};
