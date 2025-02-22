import $ from 'jquery';
import './style.css';

/**
 * Display a pop-up containing a message.
 * Class responsible for creating auto-disappearing dialogs
 *
 * @param {H5P.jQuery} $container The container which message dialog will be appended to
 * @param {string} message The message
 * @return {H5P.jQuery}
 */
function JoubelMessageDialog ($container, message) {
  var timeout;

  var removeDialog = function () {
    $warning.remove();
    clearTimeout(timeout);
    $container.off('click.messageDialog');
  };

  // Create warning popup:
  var $warning = $('<div/>', {
    'class': 'joubel-message-dialog',
    text: message
  }).appendTo($container);

  // Remove after 3 seconds or if user clicks anywhere in $container:
  timeout = setTimeout(removeDialog, 3000);
  $container.on('click.messageDialog', removeDialog);

  return $warning;
}

export default  JoubelMessageDialog;
