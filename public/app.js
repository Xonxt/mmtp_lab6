'use strict';

var appModule = angular.module('app', ['ngNewRouter', 'ngResource']);

appModule.controller('AppController', ['$router', AppController]);

function AppController($router) {
	
	$router.config([
		{path: '/', component: 'main'}
	]);
	
}