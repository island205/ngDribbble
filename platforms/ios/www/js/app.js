angular.module('ngDribbble', ['ionic', 'ngResource'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('ngDribbbleController', ['$scope','Dribbble', function($scope, Dribbble){
  $scope.poppularList = Dribbble.popular()
  $scope.getItemHeight = function(item, index) {
    return 90;
  };
}])

.factory('Dribbble', ['$resource', function($resource){
  return $resource('http://api.dribbble.com/shots/:list', {
    callback: 'JSON_CALLBACK'
  }, {
    popular: {
      method: 'JSONP',
      params: {list: 'popular', per_page: 30},
      isArray: true,
      transformResponse: function(data) {
        return data.shots
      }
    },
    debuts: {
      method: 'JSONP',
      params: {list: 'debuts'},
      isArray: true,
      transformResponse: function(data) {
        return data.shots
      }
    },
    everyone: {
      method: 'JSONP',
      params: {list: 'everyone'},
      isArray: true,
      transformResponse: function(data) {
        return data.shots
      }
    }
  })
}])
