'use strict';

angular.module('ngTemplateApp')
        .constant("baseURL","http://localhost:3000/")

        //.factory('productListFactory', function() {}
        //.service('productListFactory', function() {
        .service('productListFactory', ['$resource', 'baseURL', function($resource,baseURL) {

                this.getProducts = function(){
                    // return products;
                    //return $http.get(baseURL+"products");
                    return $resource(baseURL+"products/:id",null,  {'update':{method:'PUT' }});
                };
                 
                this.getDeals = function(){
                    // return deals[0];
                    return $resource(baseURL+"deals/:id",null,  {'update':{method:'PUT' }});
                };

        }])
 
        .factory('corporateFactory', ['$resource', 'baseURL', function($resource,baseURL) {

            var corpfac = {};
     
            corpfac.getManagement = function(){
                    // return management[index];
                    return $resource(baseURL+"management/:id",null,  {'update':{method:'PUT' }});
                };

            return corpfac;
    
        }])

        .factory('contactReqFactory', ['$resource', 'baseURL', function($resource,baseURL) {

            var contactReqfac = {};
     
            // contactReqfac.getContactReq = $resource(baseURL + "contactReq/:id", null, {'save':{method:'POST' }});// Omit last args.
            // contactReqfac.getContactReq = $resource(baseURL + "contactReq/:id");// Omit last args.
             contactReqfac.getContactReq = function(){
                    // return management[index];
                    return $resource(baseURL+"contactReq/:id",null,  {'update':{method:'PUT' }});                   
                };

            return contactReqfac;
        }])
;
