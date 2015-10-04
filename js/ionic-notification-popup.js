(function () {
    'use strict';
    angular.module('ionic-notification-popup', [])
        .factory('notificationPopup',
        ['$document',
            function ($document) {
                var NOTIFICATION_POPUP = 'notification-popup',
                    NOTIFICATION_INVISIBLE = 'notification-invisible',
                    NOTIFICATION_IMAGE = 'notification-image',
                    NOTIFICATION_TEXT = 'notification-text',
                    NOTIFICATION_CLICKABLE = 'notification-clickable',
                    NOTIFICATION_CLOSE_BUTTON = 'notification-close-button',
                    POPUP_TEMPLATE = '<div class="'+NOTIFICATION_POPUP+' '+NOTIFICATION_INVISIBLE+'">' +
                        ' <div class="'+NOTIFICATION_CLOSE_BUTTON+'"><span class="icon ion-close-round"></span></div>' +
                        ' <div class="'+NOTIFICATION_IMAGE+'"></div>' +
                        ' <div class="'+NOTIFICATION_TEXT+'"></div>' +
                        '</div>',
                    notificationElement,
                    clickCallback;

                function initialize(options) {
                    if (notificationElement) remove();
                    var $body = $document.find('body');
                    notificationElement = angular.element(POPUP_TEMPLATE);
                    options = options || {
                            title: 'Notification',
                            content: 'Notification text'
                        };
                    // Text element
                    var textElement = angular.element(notificationElement[0].querySelector('.'+NOTIFICATION_TEXT)),
                        textHtml = '';
                    if (options.title) {
                        textHtml = textHtml + '<div class="h3">'+options.title+'</div>';
                    }
                    if (options.content) {
                        textHtml = textHtml + '<div>'+options.content+'</div>';
                    }
                    textElement.html(textHtml);
                    // Image element
                    var imageElement = angular.element(notificationElement[0].querySelector('.'+NOTIFICATION_IMAGE));
                    if (options.icon || options.image) {
                        if (options.icon) imageElement.prepend('<span class="icon '+options.icon+'"></span>')
                        else if (options.image) imageElement.prepend('<img src="'+options.image+'" alt=""/>');
                    }
                    // Close button
                    var closeButtonElement = angular.element(notificationElement[0].querySelector('.'+NOTIFICATION_CLOSE_BUTTON));
                    closeButtonElement.on('click', remove);
                    // Click handler
                    clickCallback = null;
                    if (typeof options.onClick === 'function') clickCallback = options.onClick;
                    if (clickCallback) {
                        textElement.on('click', clickCallback);
                        textElement.addClass(NOTIFICATION_CLICKABLE);
                    }
                    //
                    $body.prepend(notificationElement);
                }

                function remove() {
                    var textElement = angular.element(notificationElement[0].querySelector('.'+NOTIFICATION_TEXT)),
                        closeButtonElement = angular.element(notificationElement[0].querySelector('.'+NOTIFICATION_CLOSE_BUTTON));
                    textElement.off('click');
                    closeButtonElement.off('click');
                    clickCallback = null;
                    notificationElement.remove();
                    notificationElement = null;
                }

                function show(options) {
                    if (options) {
                        initialize(options);
                    }
                    if (notificationElement) {
                        notificationElement.removeClass(NOTIFICATION_INVISIBLE);
                    }
                }

                function hide() {
                    if (notificationElement) {
                        notificationElement.addClass(NOTIFICATION_INVISIBLE);
                    }
                }

                return {
                    initialize: initialize,
                    remove: remove,
                    show: show,
                    hide: hide
                };
            }
        ]);

})();