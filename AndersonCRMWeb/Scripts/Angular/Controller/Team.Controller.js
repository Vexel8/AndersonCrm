﻿(function () {
    'use strict';

    angular
        .module('App')
        .controller('TeamController', TeamController);

    TeamController.$inject = ['$filter', '$window', 'TeamService'];

    function TeamController($filter, $window, TeamService) {
        var vm = this;

        vm.TeamId;

        vm.Team;

        vm.Teams = [];

        vm.GoToUpdatePage = GoToUpdatePage;
        vm.Initialise = Initialise;
        vm.InitialiseDropdown = InitialiseDropdown;

        vm.Delete = Delete;

        function GoToUpdatePage(companyId) {
            $window.location.href = '../Team/Update/' + teamId;
        }

        function Initialise() {
            // vm.TeamId = companyId;
            Read();

        }


        function InitialiseDropdown(teamId) {
            vm.TeamId = teamId;
            Read();
        }

        function Read() {
            TeamService.Read()
                .then(function (response) {
                    vm.Teams = response.data;
                    if (vm.TeamId)
                        UpdateTeam();
                })
                .catch(function (data, status) {
                    new PNotify({
                        title: status,
                        text: data,
                        type: 'error',
                        hide: true,
                        addclass: "stack-bottomright"
                    });

                });
        }

        function UpdateTeam() {
            vm.Team = $filter('filter')(vm.Teams, { TeamId: vm.TeamId })[0];
        }


        function Delete(teamId) {
            TeamService.Delete(teamId)
                .then(function (response) {
                    Read();
                })
                .catch(function (data, status) {
                    new PNotify({
                        title: status,
                        text: data,
                        type: 'error',
                        hide: true,
                        addclass: "stack-bottomright"
                    });
                });
        }

    }
})();