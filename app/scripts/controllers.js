'use strict';

angular.module('ngTemplateApp')

        .controller('ProductListController', ['$scope', 'productListFactory', function($scope, productListFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;

            $scope.showProductList = false;
            $scope.productMessage = "Loading ...";
            $scope.products = productListFactory.getProducts().query(
                function(response) {
                    $scope.products = response;
                    $scope.showProductList = true;
                    console.log("products="); console.log($scope.products);
                },
                function(response) {
                    $scope.productMessage = "Error: "+response.status + " " + response.statusText;
                    console.log("products=ERROR");
                });

            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2)      { $scope.filtText = "line1"; }
                else if (setTab === 3) { $scope.filtText = "line2"; }
                else if (setTab === 4) { $scope.filtText = "line3"; }
                else if (setTab === 5) { $scope.filtText = "line4"; }
                else                   { $scope.filtText = ""; }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.contactReq = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('ContactReqController', ['$scope', 'contactReqFactory', function($scope, contactReqFactory) {
            
            $scope.sendContactReq = function() {
                
                console.log("$scope.contactReq=");
                console.log($scope.contactReq);
                
                if ($scope.contactReq.agree && ($scope.contactReq.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    contactReqFactory.getContactReq().save($scope.contactReq);

                    $scope.invalidChannelSelection = false;
                    $scope.contactReq = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.contactReq.mychannel="";
                    $scope.contactReqForm.$setPristine();
                    console.log($scope.contactReq);
                }
            };
            
        }])

        .controller('ProductController', ['$scope', '$stateParams', 'productListFactory', function($scope, $stateParams, productListFactory) {

                //$scope.product= productListFactory.getProduct(3);
                //var product= productListFactory.getProduct(parseInt($stateParams.id,10));
                //$scope.product = product;

                $scope.showProduct = false;
                $scope.productMessage="Loading ...";
                $scope.product = productListFactory.getProducts().get({id:parseInt($stateParams.id,10)})
                .$promise.then(
                    function(response){
                        $scope.product = response;
                        $scope.showProduct = true;
                        console.log("product="); console.log($scope.product);
                    },
                    function(response) {
                        $scope.productMessage = "Error: "+response.status + " " + response.statusText;
                        console.log("product=ERROR");
                    });

        }])

        //.controller('ProductCommentController', ['$scope', function($scope) {}
        .controller('ProductCommentController', ['$scope', 'productListFactory', function($scope,productListFactory) {
            
            $scope.comment = { rating:5, comment:"", author:"", date:"" };

            $scope.submitComment = function () {
                $scope.comment.date = new Date().toISOString();
                console.log($scope.comment);
                $scope.product.comments.push($scope.comment);

                productListFactory.getProducts().update({id:$scope.product.id},$scope.product);
                $scope.commentForm.$setPristine();
                $scope.comment = {rating:5, comment:"", author:"", date:""};
            }
        }])

        // implement the IndexController and OurCompany Controller here
        .controller('IndexController', ['$scope', 'productListFactory', 'corporateFactory', function ($scope, productListFactory, corporateFactory) {

          // var featuredProduct  = productListFactory.getProduct(1); // should be random ??
          // var featuredProduct  = productListFactory.getProduct(0); // should be random ??
          // console.log("featured product="); console.log(featuredProduct);
          // $scope.product = featuredProduct;
          $scope.showProduct = false;
          $scope.productMessage="Loading ...";
          $scope.product = productListFactory.getProducts().get({id:0})
          .$promise.then(
              function(response){
                  $scope.product = response;
                  $scope.showProduct = true;
                  console.log("product="); console.log($scope.product);
              },
              function(response) {
                  $scope.productMessage = "Error: "+response.status + " " + response.statusText;
                  console.log("product=ERROR");
              });

           $scope.showDeal = false;
           $scope.deal = productListFactory.getDeals().get({id:0}) // should be random ??
           .$promise.then(
              function(response){
                  $scope.deal = response;
                  $scope.showDeal = true;
                  console.log("deal="); console.log($scope.deal);
              },
              function(response) {
                  $scope.promoMessage = "Error: "+response.status + " " + response.statusText;
                  console.log("deal=ERROR");
              });

           $scope.showCEO = false;
           $scope.ceo = corporateFactory.getManagement().get({id:3}) // should be random ??
           .$promise.then(
              function(response){
                  $scope.ceo = response;
                  $scope.showCEO = true;
                  console.log("CEO="); console.log($scope.ceo);
              },
              function(response) {
                  $scope.promoMessage = "Error: "+response.status + " " + response.statusText;
                  console.log("CEO=ERROR");
              });

              console.log("idxcllr.CEO="); console.log($scope.ceo);
        }])


        .controller('OurCompanyController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {
          $scope.showManagement=false
          $scope.management = corporateFactory.getManagement().query(
                function(response) {
                    $scope.management = response;
                    $scope.showManagement = true;
                    console.log("management="); console.log($scope.management);
                },
                function(response) {
                    $scope.managementMessage = "Error: "+response.status + " " + response.statusText;
                    console.log("management=ERROR");
                });
        }])
;
