import angular from 'angular';
import '../style/app.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
let app = () => {
	return {
		template: require('./app.html'),
		controller: 'AppCtrl',
		controllerAs: 'app'
	};
};

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
	.directive('app', app)
	.service('getData', function () {
		this.req = function ($http, url) {
			return $http.get(url)
				.then(function (response) {
					return response.data;
				});
		};
	})
	.controller('AppCtrl', function ($scope, $http, getData) {
		getData.req($http, 'http://api.icndb.com/jokes/random/1?escape=javascript').then(function (data) {
			$scope.jokes = data.value;
		}, function () {
			$scope.jokes = 'Oops,something went wrong!';
		});
		getData.req($http, 'https://api.icndb.com/categories').then(function (data) {
			$scope.categories = data.value;
		}, function () {
			$scope.categories = 'Oops,something went wrong!';
		});
		$scope.selectCategory = function (el) {
			let input = Number($scope.jokesNumber);
			if (input > 0 && input <= 10) {
				$scope.jokes = '';
				getData.req($http, 'http://api.icndb.com/jokes/random/' + input + '?escape=javascript').then(function (data) {
					$scope.jokes = data.value;
				}, function () {
					$scope.jokes = 'Oops,something went wrong!';
				});
			} else $scope.numberError = 'Sorry,but Chuck knows numbers 1 to 10 only!';
		};
		$scope.change = function () {
			$scope.selectCategory();
		};
	});
export default MODULE_NAME;