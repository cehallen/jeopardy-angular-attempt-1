angular.module('jeopardyFilters', ['$sce']).filter('safehtml',
function($sce) {
  return function(input) {
    return $sce.trustAsHtml(input);
  };
});
