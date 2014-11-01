angular.module('ngDribbble', ['ionic', 'ngResource'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('ngDribbbleController', ['$scope', 'Dribbble',
  function($scope, Dribbble) {
    $scope.popularPage = 1
    $scope.poppularList = []
    $scope.loadMore = function() {
      Dribbble.popular({
        page: $scope.popularPage++
      }).$promise.then(function(list) {
        $scope.poppularList.push.apply($scope.poppularList, list)
        $scope.$broadcast('scroll.infiniteScrollComplete')
      })
    }
    $scope.$on('$stateChangeSuccess', function() {
      $scope.loadMore()
    })
    $scope.getItemHeight = function(item, index) {
      return 90;
    };
  }
])

.factory('Dribbble', ['$resource',
  function($resource) {
    return $resource('http://api.dribbble.com/shots/:list', {
      callback: 'JSON_CALLBACK'
    }, {
      popular: {
        method: 'JSONP',
        params: {
          list: 'popular',
          per_page: 30
        },
        isArray: true,
        transformResponse: function(data) {
          return data.shots
        }
      },
      debuts: {
        method: 'JSONP',
        params: {
          list: 'debuts'
        },
        isArray: true,
        transformResponse: function(data) {
          return data.shots
        }
      },
      everyone: {
        method: 'JSONP',
        params: {
          list: 'everyone'
        },
        isArray: true,
        transformResponse: function(data) {
          return data.shots
        }
      }
    })
  }
])