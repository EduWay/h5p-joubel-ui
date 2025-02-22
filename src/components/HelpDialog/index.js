/**
 * Class responsible for creating a help text dialog
 */
import $ from 'jquery';
import { EventDispatcher } from 'eduway-h5p-lib';

import './styles.css';

var numInstances = 0;
/**
 * Display a pop-up containing a message.
 *
 * @param {H5P.jQuery}  $container  The container which message dialog will be appended to
 * @param {string}      message     The message
 * @param {string}      closeButtonTitle The title for the close button
 * @return {H5P.jQuery}
 */
function HelpTextDialog(header, message, closeButtonTitle) {
  EventDispatcher.call(this);

  var self = this;

  numInstances++;
  var headerId = 'joubel-help-text-header-' + numInstances;
  var helpTextId = 'joubel-help-text-body-' + numInstances;

  var $helpTextDialogBox = $('<div>', {
    'class': 'joubel-help-text-dialog-box',
    'role': 'dialog',
    'aria-labelledby': headerId,
    'aria-describedby': helpTextId
  });

  $('<div>', {
    'class': 'joubel-help-text-dialog-background'
  }).appendTo($helpTextDialogBox);

  var $helpTextDialogContainer = $('<div>', {
    'class': 'joubel-help-text-dialog-container'
  }).appendTo($helpTextDialogBox);

  $('<div>', {
    'class': 'joubel-help-text-header',
    'id': headerId,
    'role': 'header',
    'html': header
  }).appendTo($helpTextDialogContainer);

  $('<div>', {
    'class': 'joubel-help-text-body',
    'id': helpTextId,
    'html': message,
    'role': 'document',
    'tabindex': 0
  }).appendTo($helpTextDialogContainer);

  var handleClose = function () {
    $helpTextDialogBox.remove();
    self.trigger('closed');
  };

  var $closeButton = $('<div>', {
    'class': 'joubel-help-text-remove',
    'role': 'button',
    'title': closeButtonTitle,
    'tabindex': 1,
    'click': handleClose,
    'keydown': function (event) {
      // 32 - space, 13 - enter
      if ([32, 13].indexOf(event.which) !== -1) {
        event.preventDefault();
        handleClose();
      }
    }
  }).appendTo($helpTextDialogContainer);

  /**
   * Get the DOM element
   * @return {HTMLElement}
   */
  self.getElement = function () {
    return $helpTextDialogBox;
  };

  self.focus = function () {
    $closeButton.focus();
  };
}

HelpTextDialog.prototype = Object.create(EventDispatcher.prototype);
HelpTextDialog.prototype.constructor = HelpTextDialog;

export default HelpTextDialog;
