angular.module('ngDribbbleApp', ['ionic', 'ngResource'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: "/home",
      abstract: true,
      templateUrl: "templates/home.html"
    })
    .state('home.popular', {
      url: "/popular",
      views: {
        'popular-tab': {
          templateUrl: "templates/popular.html",
          controller: 'PopularCtrl'
        }
      }
    })
    .state('home.debuts', {
      url: "/debuts",
      views: {
        'debuts-tab': {
          templateUrl: "templates/debuts.html",
          controller: 'DebutsCtrl'
        }
      }
    })
    .state('home.everyone', {
      url: "/everyone",
      views: {
        'everyone-tab': {
          templateUrl: "templates/everyone.html",
          controller: 'EveryoneCtrl'
        }
      }
    });


  $urlRouterProvider.otherwise("/home/popular");

})

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

.controller('PopularCtrl', ['$scope', 'Dribbble',
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

.controller('DebutsCtrl', ['$scope', 'Dribbble',
  function($scope, Dribbble) {
    $scope.debutsPage = 1
    $scope.debutsList = []
    $scope.loadMore = function() {
      Dribbble.debuts({
        page: $scope.debutsPage++
      }).$promise.then(function(list) {
        $scope.debutsList.push.apply($scope.debutsList, list)
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

.controller('EveryoneCtrl', ['$scope', 'Dribbble',
  function($scope, Dribbble) {
    $scope.everyonePage = 1
    $scope.everyoneList = []
    $scope.loadMore = function() {
      Dribbble.popular({
        page: $scope.everyonePage++
      }).$promise.then(function(list) {
        $scope.everyoneList.push.apply($scope.everyoneList, list)
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