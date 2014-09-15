var jeopardyFilters = angular.module('jeopardyFilters', []);


jeopardyFilters.filter('safehtml', function($sce) {
  return function(input) {
    return $sce.trustAsHtml(input);
  };
});



  // // if you need to tack on another filter your way works, or:
  // .
  // filter('foobar')...

  // // or:
  // angular.module('jeopardyFilters').filter....
  // // without the dependencies declaration is a retrieval not creation

  // but with your setup, just jeopardyFilters.filter.. works
