var developmentMode = true;
// Ionic Starter App
(function() {
  'use strict';

  angular.module('app', ['ionic', 'ngCordova', 'ngResource', 'ngTemplates', 'ngStorage', 'applicat.push.service', 'ngFileUpload', 'permission', 'ngTagsInput', 'ngIOS9UIWebViewPatch'])

  .run(['$ionicPlatform', '$rootScope', '$state', '$window', 'Message', 'Permission', 'rootScopeService',
    function($ionicPlatform, $rootScope, $state, $window, Message, Permission, rootScopeService) {

      angular.extend($rootScope, rootScopeService);
      $ionicPlatform.ready(onIonicPlatformReady);
      // Comment this out on production
      if (developmentMode === true) {
        setInitialState();
      }

      //====================================================
      //  Implementation
      //====================================================
      function onIonicPlatformReady() {
        if ($window.cordova && $window.cordova.plugins.Keyboard) {
          $window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if ($window.StatusBar) {
          $window.StatusBar.styleDefault();
        }
        setInitialState();
      }

      //====================================================
      //  Helper
      //====================================================
      function setInitialState() {
        if ($rootScope.appStorage.firstTime && $state.get('main.walkThrough')) {
          $state.go('main.walkThrough');
        } else {
          $state.go('main.announcementList', {
            category: 'news',
            id: '1abcd'
          });
        }
      }

    }
  ])

  .config(['$stateProvider', '$httpProvider',
    function($stateProvider, $httpProvider) {

      // //Security handler
      // $httpProvider.interceptors.push('AuthInterceptor');

      // //Allow session
      // $httpProvider.defaults.withCredentials = true;

      $stateProvider

      .state('main', {
        url: '/main',
        templateUrl: 'state/00main/main.html',
        controller: 'MainController as Main'
      })

      .state('main.walkThrough', {
        url: '/walkThrough',
        views: {
          main: {
            templateUrl: 'state/01walkThrough/walkThrough.html',
            controller: 'WalkThroughController as WalkThrough'
          }
        }
      })

      .state('main.login', {
        url: '/login',
        views: {
          main: {
            templateUrl: 'state/02login/login.html',
            controller: 'LoginController as Login'
          }
        }
      })

      .state('main.signUp', {
        params: {
          userType: ''
        },
        url: '/signUp',
        views: {
          main: {
            templateUrl: 'state/02signUp/signUp.html',
            controller: 'SignUpController as SignUp'
          }
        }
      })

      .state('main.resetPassword', {
        url: '/resetPassword',
        views: {
          main: {
            templateUrl: 'state/02resetPassword/resetPassword.html',
            controller: 'ResetPasswordController as ResetPassword'
          }
        }
      })

      .state('main.profile', {
        url: '/profile',
        views: {
          main: {
            templateUrl: 'state/03profile/profile.html',
            controller: 'ProfileController as Profile'
          }
        }
      })

      .state('main.customer', {
        url: '/customer',
        views: {
          main: {
            templateUrl: 'state/04customer/customer.html',
            controller: 'CustomerController as Customer'
          }
        }
      })

      .state('main.home', {
        url: '/home',
        views: {
          main: {
            templateUrl: 'state/09home/home.html',
            controller: 'HomeController as Home'
          }
        }
      })

      .state('main.bidDetail', {
        params: {
          id: ''
        },
        url: '/bidDetail',
        views: {
          main: {
            templateUrl: 'state/10bidDetail/bidDetail.html',
            controller: 'BidDetailController as BidDetail'
          }
        }
      })

      .state('main.bidList', {
        params: {
          product: '',
          to: ''
        },
        url: '/bidList',
        views: {
          main: {
            templateUrl: 'state/10bidList/bidList.html',
            controller: 'BidListController as BidList'
          }
        }
      })

      .state('main.favoriteProductList', {
        params: {},
        url: '/favoriteProductList',
        views: {
          main: {
            templateUrl: 'state/10favoriteProductList/favoriteProductList.html',
            controller: 'FavoriteProductListController as FavoriteProductList'
          }
        }
      })

      .state('main.myProductList', {
        params: {
          category: '' // userProduct, sellerProduct
        },
        url: '/myProductList',
        views: {
          main: {
            templateUrl: 'state/10myProductList/myProductList.html',
            controller: 'MyProductListController as MyProductList'
          }
        }
      })


      .state('main.productList', {
        params: {
          category: '' // userProduct, sellerProduct
        },
        url: '/productList',
        views: {
          main: {
            templateUrl: 'state/10productList/productList.html',
            controller: 'ProductListController as ProductList'
          }
        }
      })

      .state('main.productDetail', {
        params: {
          id: ''
        },
        url: '/productDetail',
        views: {
          main: {
            templateUrl: 'state/10productDetail/productDetail.html',
            controller: 'ProductDetailController as ProductDetail'
          }
        }
      })

      .state('main.postList', {
        params: {
          category: ''
        },
        url: '/postList',
        views: {
          main: {
            templateUrl: 'state/11postList/postList.html',
            controller: 'PostListController as PostList'
          }
        }
      })

      .state('main.postDetail', {
        params: {
          id: ''
        },
        url: '/postDetail',
        views: {
          main: {
            templateUrl: 'state/11postDetail/postDetail.html',
            controller: 'PostDetailController as PostDetail'
          }
        }
      })

      .state('main.announcementList', {
        params: {
          category: ''
        },
        url: '/announcementList',
        views: {
          main: {
            templateUrl: 'state/12announcementList/announcementList.html',
            controller: 'AnnouncementListController as AnnouncementList'
          }
        }
      })

      .state('main.announcementDetail', {
        params: {
          category: '',
          id: ''
        },
        url: '/announcementDetail',
        views: {
          main: {
            templateUrl: 'state/12announcementDetail/announcementDetail.html',
            controller: 'AnnouncementDetailController as AnnouncementDetail'
          }
        }
      })

      .state('main.placeList', {
        params: {
          category: ''
        },
        url: '/placeList',
        views: {
          main: {
            templateUrl: 'state/19placeList/placeList.html',
            controller: 'PlaceListController as PlaceList'
          }
        }
      })

      .state('main.placeDetail', {
        params: {
          id: ''
        },
        url: '/placeDetail',
        views: {
          main: {
            templateUrl: 'state/19placeDetail/placeDetail.html',
            controller: 'PlaceDetailController as PlaceDetail'
          }
        }
      })

      .state('main.daumMap', {
        url: '/daumMap',
        views: {
          main: {
            templateUrl: 'state/20daumMap/daumMap.html',
            controller: 'DaumMapController as DaumMap'
          }
        }
      })

      .state('main.reservationRegister0', {
        url: '/reservationRegister0',
        views: {
          main: {
            templateUrl: 'state/30reservationRegister/reservationRegister0.html',
            controller: 'ReservationRegisterController0 as ReservationRegister0'
          }
        }
      })

      .state('main.reservationRegister1', {
        url: '/reservationRegister1',
        views: {
          main: {
            templateUrl: 'state/30reservationRegister/reservationRegister1.html',
            controller: 'ReservationRegisterController1 as ReservationRegister1'
          }
        }
      });
    } //END
  ]);

})();
