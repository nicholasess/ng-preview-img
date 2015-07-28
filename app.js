(function() {
'use strict';

angular.module('ng-preview-img')
.factory("previewImg", function($q, $log) {
  var onLoad = function(reader, deferred) {
    return function() {
      deferred.resolve(reader.result);
    };
  };

  var onError = function(reader, deferred) {
    return function() {
      deferred.reject(reader.result);
    };
  };

  var getReader = function(deferred) {
    var reader = new FileReader();
    reader.onload = onLoad(reader, deferred);
    reader.onerror = onError(reader, deferred);
    return reader;
  };

  var readAsDataURL = function(file) {
    var deferred = $q.defer();

    var reader = getReader(deferred);
    reader.readAsDataURL(file);

    return deferred.promise;
  };

  return {
    readAsDataUrl: readAsDataURL
  };
});


})();