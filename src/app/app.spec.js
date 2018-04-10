import app from './app';

describe('app', () => {

	describe('AppCtrl', () => {
		let service, $controller, $rootScope, $http, $httpBackend, createController;

		beforeEach(() => {
			angular.mock.module(app);
			angular.mock.inject(($injector) => {
				service = $injector.get('getData');
				$controller = $injector.get('$controller');
				$rootScope = $injector.get('$rootScope');
				$http = $injector.get('$http');
				$httpBackend = $injector.get('$httpBackend');
				$httpBackend.expectGET('https://api.icndb.com/jokes/random/1?escape=javascript').respond('Hi!');
				createController = function () {
					return $controller('AppCtrl', {
						'$scope': $rootScope,
					});
				};
			});
		});

		it('Matching a randomly generated String to input', () => {
			let controller = createController(),
				x = 100;

			function randomStr(num) {
				let str = '',
					abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&**()_+~:"|?><';
				for (let y = 0; y < num; y++) {
					str += abc.charAt(Math.floor(Math.random() * abc.length));
				}
				return str;
			}
			while (x--) {
				let randomNum = Math.floor((Math.random() * x) + 1);
				$rootScope.jokesNumber = randomStr(randomNum);
				$rootScope.selectCategory();
				expect($rootScope.alertWarning).toEqual(true);
			}
		});
		it( 'Verify tourService.start has been called', function() {
			service.req($http,'https://api.icndb.com/jokes/random/1?escape=javascript').then(function(data) {
				expect(data).toEqual('Hi!');
			});
			$httpBackend.flush();
		} );
	});
});