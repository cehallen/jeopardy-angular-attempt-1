angular.module('jeopardyFilters', []).filter('safehtml', function($sce) {
  return function(input) {
    return $sce.trustAsHtml(input);
  };
});
  // // if you need to tack on another filter:
  // .
  // filter('foobar')...

  // // or:
  // angular.module('jeopardyFilters').filter....
  // // without the dependencies declaration is a retrieval not creation
