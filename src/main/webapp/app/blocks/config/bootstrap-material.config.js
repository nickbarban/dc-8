(function() {
    'use strict';

    angular
        .module('dancekvartalApp')
        .config(bootstrapMaterialDesignConfig);

    compileServiceConfig.$inject = [];

    function bootstrapMaterialDesignConfig() {
        $.material.init();

    }
})();
