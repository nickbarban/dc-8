(function () {
    'use strict';

    angular
        .module('dancekvartalApp')
        .filter('ageFilter', ageFilter);

    function ageFilter() {
        return calculateAgeFilter;

        function calculateAgeFilter(birthday) {
            var ageDifMs = Date.now() - new Date(birthday).getTime();
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }
    }
})();
