'use strict';

angular.module('ngTemplateApp', ['ui.router','ngResource'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/Header.html',
                    },
                    'content': {
                        templateUrl : 'views/Home.html',
                        controller  : 'IndexController'
                    },
                    'footer': {
                        templateUrl : 'views/Footer.html',
                    }
                }

            })

            // route for the ourCompany page
            .state('app.ourCompany', {
                url:'ourCompany',
                views: {
                    'content@': {
                        templateUrl : 'views/ourCompany.html',
                        controller  : 'OurCompanyController'
                   }
                }
            })

            // route for the contact page
            .state('app.contact', {
                url:'contact',
                views: {
                    'content@': {
                        templateUrl : 'views/Contact.html',
                        controller  : 'ContactController'
                                      }
                }
            })

            // route for the ProductList page
            .state('app.productList', {
                url: 'productlist',
                views: {
                    'content@': {
                        templateUrl : 'views/ProductList.html',
                        controller  : 'ProductListController'
                    }
                }
            })

            // route for the productdetail page
            .state('app.productdetails', {
                url: 'productlist/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/ProductPage.html',
                        controller  : 'ProductController'
                   }
                }
            });

            $urlRouterProvider.otherwise('/');
    })
;
