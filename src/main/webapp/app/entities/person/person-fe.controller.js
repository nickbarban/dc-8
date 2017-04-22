(function() {
    'use strict';

    angular
        .module('dancekvartalApp')
        .controller('PersonFeController', PersonFeController);

    PersonFeController.$inject = ['Person'];

    function PersonFeController(Person) {

        var vm = this;

        vm.people = [];

        loadAll();

        function loadAll() {
            Person.query(function(result) {
                vm.people = result;
                vm.searchQuery = null;
            });
        }
    }
})();
