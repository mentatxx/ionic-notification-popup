(function () {
    'use strict';
    angular.module('ionic-notification-popup', [])
        .factory('notificationPopup',
        ['$document',
            function ($document) {
                var POPUP_TEMPLATE = '<div class="notification-popup"></div>',
                    element;
                function initialize() {
                    if (element) remove();
                    element = angular.element(POPUP_TEMPLATE);
                }

                function remove() {

                }

                function show() {

                }

                function hide() {

                }

                var instance = {
                    initialize: initialize,
                    remove: remove,
                    show: show,
                    hide: hide
                };
                return instance;
            }
        ]);

})();