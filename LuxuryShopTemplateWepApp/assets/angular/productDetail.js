var app = angular.module('LuxuryShop', []);
app.controller("ProductDetailCtrl", function ($scope, $http, $window) {
    $scope.current_img = _current_img;
    var keylanguage = 'LanguageId';
    var keyproduct = 'ProductID';
    $scope.value = window.location.search.substring(window.location.search.indexOf(keylanguage) + keylanguage.length + 1);
    $scope.id = window.location.search.slice(window.location.search.indexOf(keyproduct) + keyproduct.length + 1, window.location.search.indexOf('&'));
    if ($scope.value == '') {
        $scope.value = 'vi-VN'
    }

    $scope.listCategories;
    $scope.LoadCategoryByLanguage = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/Categories/getCategoriesByLanguage/' + $scope.value,
        }).then(function (response) {
            $scope.listCategories = response.data;
            console.log($scope.listCategories);
        });
    };

    $scope.ProductDetail;
    $scope.listProductWithCate;
    $scope.LoadProductByLanguage = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/Product/GetProductDetail/' + $scope.id +'/'+ $scope.value,
        }).then(function (response) {
            $scope.ProductDetail = response.data;
            $scope.listImageProduct = JSON.parse($scope.ProductDetail.imagePath);
            console.log($scope.listImageProduct);

            $scope.listProductWithCate;
            $scope.page = 1;
            $scope.pageSize = 4;

            $http({
                method: 'POST',
                data: { page: $scope.page, pageSize: $scope.pageSize,CatID: $scope.ProductDetail.catID, languageId: $scope.value },
                url: current_url + '/api/Product/getProductByCate',
            }).then(function (response) {
                $scope.listProductWithCate = response.data.data;
                console.log($scope.listProductWithCate);
            });
            
            console.log($scope.ProductDetail);
        });
    };

    $scope.handleButtonClick = function(x){
        //const quantity = window.prompt('Số lượng cần mua?');
        var quantity = 1;
        if (quantity && !isNaN(quantity)) {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const existingItem = cart.find(item => item.productID === x.productID);
            if (existingItem) {
                existingItem.quantity += Number(quantity);
            } else {
                x.imagePath = JSON.parse(x.imagePath)[0].ImagePath;
                cart.push({
                    ...x,
                    quantity: Number(quantity),
                });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            $window.location.reload();
            alert("Thêm vào giỏ hàng thành công !");
        }
    };

    $scope.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    $scope.total_price = 0;
    $scope.cart_quantity = 0;

    if($scope.cart != ''){
        for(var i =0;i<$scope.cart.length;i++){
            $scope.total_price += $scope.cart[i].quantity * $scope.cart[i].price;
            $scope.cart_quantity += $scope.cart[i].quantity;
        }
    }

    $scope.LoadCategoryByLanguage();    
    $scope.LoadProductByLanguage();       
});