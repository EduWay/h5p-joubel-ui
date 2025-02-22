/**
 * Creates a new tip
 */
import $ from 'jquery';
import './style.css';

function SimpleRoundedButton(text) {
  var $simpleRoundedButton = $('<div>', {
    'class': 'joubel-simple-rounded-button',
    'title': text,
    'role': 'button',
    'tabindex': '0'
  }).keydown(function (e) {
    // 32 - space, 13 - enter
    if ([32, 13].indexOf(e.which) !== -1) {
      $(this).click();
      e.preventDefault();
    }
  });

  $('<span>', {
    'class': 'joubel-simple-rounded-button-text',
    'html': text
  }).appendTo($simpleRoundedButton);

  return $simpleRoundedButton;
}

export default SimpleRoundedButton;
