(function() {
  'use strict';
  angular.module('app')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['$scope', 'Users', 'SignUpModel', 'Message', '$state'];

  function SignUpController($scope, Users, SignUpModel, Message, $state) {

    var SignUp = this;
    SignUp.Model = SignUpModel;

    SignUp.signUp = signUp;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    //------------------------
    //  IMPLEMENTATIONS
    //------------------------
    function signUp(userType) {
      if (!validateForm(userType)) {
        return false;
      }
      Message.loading();
      return Users.register({}, SignUpModel.form).$promise
        .then(onSignUpSuccess)
        .then($state.go.bind(null, 'main.login'))
        .catch(onSignUpError);
    }

    function onBeforeEnter() {
      reset();
    }

    //====================================================
    //  Helper
    //====================================================
    function validateForm(userType) {
      var alert = Message.alert.bind(null, '가입신청 알림');
      var form = SignUpModel.form;
      if (userType === 'user') {
        if (!form.nickname) {
          alert('닉네임을 입력해주세요.');
          return false;
        } else if (!form.email) {
          alert('이메일을 입력해주세요.');
          return false;
        } else if (!form.password) {
          alert('비밀번호를 입력해주세요.');
          return false;
        } else if (form.password === SignUpModel.confirmPassword) {
          alert('비밀번호가 다릅니다 다시 입력해주세요.');
          return false;
        } else {
          return true;
        }
      } else if (userType === 'shop') {
        if (!form.shop) {
          alert('점포명을 입력해주세요.');
          return false;
        } else if (!form.email) {
          alert('이메일을 입력해주세요.');
          return false;
        } else if (!form.password) {
          alert('비밀번호를 입력해주세요.');
          return false;
        } else if (form.password === SignUpModel.confirmPassword) {
          alert('비밀번호가 다릅니다 다시 입력해주세요.');
          return false;
        } else if (!form.cellPhone) {
          alert('핸드폰 번호를 입력해주세요.');
          return false;
        } else if (!form.phone) {
          alert('전화번호를 입력해주세요.');
          return false;
        } else if (!form.companyNumber) {
          alert('대부업등록번호를 입력해주세요.');
          return false;
        } else if (!form.address) {
          alert('주소를 입력해주세요.');
          return false;
        } else {
          return true;
        }
      }
    }

    function onSignUpSuccess(data) {
      console.log(data);
      Message.hide();
      return Message.alert('회원가입 성공', '회원가입을 성공하였습니다.');
    }

    function onSignUpError(err) {
      console.log(err);
      Message.hide();
      reset();
      return Message.alert('가입실패', '다시 입력해주세요');
    }


    function reset() {
      SignUpModel.form = {};
      SignUpModel.comfirmPassword = null;
    }


  }
})();
