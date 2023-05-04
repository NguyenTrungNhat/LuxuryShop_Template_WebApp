var app = angular.module('LuxuryShopAdmin',[]);
app.controller("LoginCtrl", function ($scope, $http,$window){
    $scope.Token;  
    $scope.getToken = function () { 
        console.log($scope.userName);	 
        console.log($scope.password);	 
        $http({
            method: 'POST', 
            data: { UserName: $scope.userName, Password: $scope.password },
            url: current_url_admin + '/api/Users/authenticate',
        }).then(function (response) { 
            $scope.Token = response.data;
            console.log($scope.Token);
            json = {
                username: $scope.userName,
                token : $scope.Token
            }
            $window.sessionStorage.setItem('user', JSON.stringify(json));
            $window.location.href = '/LuxuryShopTemplateWepApp/index.html';
        },function(error){
            alert(error.data);
            $window.location.href = '/LuxuryShopTemplateWepApp/login-register.html';
        });
    }; 

    $scope.UserID;
    $scope.FullName;
    $scope.BirthDay;
    $scope.Gender;
    $scope.Thumb = 'abc.jpg';
    $scope.Address;
    $scope.Email;
    $scope.Phone;
    $scope.UserName;
    $scope.Password;


    $scope.Save = function () {
        let user = {};
        user.UserID = $scope.UserID;
        user.FullName = $scope.FullName;
        user.BirthDay = $scope.BirthDay;
        user.Gender = $scope.Gender;
        user.Thumb = $scope.Thumb;
        user.Address = $scope.Address;
        user.Email = $scope.Email;
        user.Phone = $scope.Phone;
        user.UserName = $scope.UserName;
        user.Password = $scope.Password;
        user.RoleID = 1;

        var file = document.getElementById('Thumb').files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            $http({
                method: 'POST',
                headers: {
                    'Content-Type': undefined
                },
                data: formData,
                url: current_url + '/api/Users/upload',
            }).then(function (res) {
                user.Thumb = res.data;
                $http({
                    method: 'POST',
                    
                    data: user,
                    url: current_url + '/api/Users/register',
                }).then(function (response) {
                    alert('Thêm user thành công!');
                    $window.location.reload();
                });
            });
        } else {
            user.Thumb = $scope.Thumb;
            $http({
                method: 'POST',
                data: user,
                url: current_url + '/api/Users/register',
            }).then(function (response) {
                alert('Thêm user thành công!');
                $window.location.reload();
            });
        }
    };
});