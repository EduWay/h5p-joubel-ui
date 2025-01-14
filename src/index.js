/**
 * H5P Joubel UI library.
 *
 * This is a utility library, which does not implement attach. I.e, it has to bee actively used by
 * other libraries
 * @module
 */
export { default as Transition } from './Transition';
import $ from 'jquery';

import HelpTextDialog from './components/HelpDialog';
import MessageDialog from './components/MessageDialog';
import ProgressCircle from './components/ProgressCircle';
import ProgressBar from './components/ProgressBar';
import ScoreBar from'./components/ScoreBar';
import SimpleRoundedButton from './components/SimpleRoundedButton';
import Slider from './components/Slider';
import SpeechBubble from './components/SpeechBubble';
import Throbber from './components/Throbber';
import Tip from './components/Tip';

import './styles.css';
import './icons.css';

/**
 * The internal object to return
 * @class UI
 * @static
 */
function UI() {}

/* Public static functions */

/**
 * Create a tip icon
 * @method UI.createTip
 * @param  {string}  text   The textual tip
 * @param  {Object}  params Parameters
 * @return {Tip}
 */
UI.createTip = function (text, params) {
  return new Tip(text, params);
};

/**
 * Create message dialog
 * @method UI.createMessageDialog
 * @param  {jQuery}               $container The dom container
 * @param  {string}                   message    The message
 * @return {MessageDialog}
 */
UI.createMessageDialog = function ($container, message) {
  return new MessageDialog($container, message);
};

/**
 * Create help text dialog
 * @method UI.createHelpTextDialog
 * @param  {string}             header  The textual header
 * @param  {string}             message The textual message
 * @param  {string}             closeButtonTitle The title for the close button
 * @return {HelpTextDialog}
 */
UI.createHelpTextDialog = function (header, message, closeButtonTitle) {
  return new HelpTextDialog(header, message, closeButtonTitle);
};

/**
 * Create progress circle
 * @method UI.createProgressCircle
 * @param  {number}             number          The progress (0 to 100)
 * @param  {string}             progressColor   The progress color in hex value
 * @param  {string}             fillColor       The fill color in hex value
 * @param  {string}             backgroundColor The background color in hex value
 * @return {JoubelProgressCircle}
 */
UI.createProgressCircle = function (number, progressColor, fillColor, backgroundColor) {
  return new ProgressCircle(number, progressColor, fillColor, backgroundColor);
};

/**
 * Create throbber for loading
 * @method UI.createThrobber
 * @return {Throbber}
 */
UI.createThrobber = function () {
  return new Throbber();
};

/**
 * Create simple rounded button
 * @method UI.createSimpleRoundedButton
 * @param  {string}                  text The button label
 * @return {SimpleRoundedButton}
 */
UI.createSimpleRoundedButton = function (text) {
  return new SimpleRoundedButton(text);
};

/**
 * Create Slider
 * @method UI.createSlider
 * @param  {Object} [params] Parameters
 * @return {Slider}
 */
UI.createSlider = function (params) {
  return new Slider(params);
};

/**
 * Create Score Bar
 * @method UI.createScoreBar
 * @param  {number=}       maxScore The maximum score
 * @param {string} [label] Makes it easier for readspeakers to identify the scorebar
 * @return {ScoreBar}
 */
UI.createScoreBar = function (maxScore, label, helpText, scoreExplanationButtonLabel) {
  return new ScoreBar(maxScore, label, helpText, scoreExplanationButtonLabel);
};

/**
 * Create ProgressBar
 * @method UI.createProgressbar
 * @param  {number=}       numSteps The total numer of steps
 * @param {Object} [options] Additional options
 * @param {boolean} [options.disableAria] Disable readspeaker assistance
 * @param {string} [options.progressText] A progress text for describing
 *  current progress out of total progress for readspeakers.
 *  e.g. "Slide :num of :total"
 * @return {ProgressBar}
 */
UI.createProgressbar = function (numSteps, options) {
  return new ProgressBar(numSteps, options);
};

/**
 * Create standard Joubel button
 *
 * @method H5P.UI.createButton
 * @param {object} params
 *  May hold any properties allowed by jQuery. If href is set, an A tag
 *  is used, if not a button tag is used.
 * @return {H5P.jQuery} The jquery element created
 */
UI.createButton = function(params) {
  var type = 'button';
  if (params.href) {
    type = 'a';
  }
  else {
    params.type = 'button';
  }
  if (params.class) {
    params.class += ' h5p-joubelui-button';
  }
  else {
    params.class = 'h5p-joubelui-button';
  }
  return $('<' + type + '/>', params);
};

/**
 * Fix for iframe scoll bug in IOS. When focusing an element that doesn't have
 * focus support by default the iframe will scroll the parent frame so that
 * the focused element is out of view. This varies dependening on the elements
 * of the parent frame.
 */
//TODO
/*
if (H5P.isFramed && !H5P.hasiOSiframeScrollFix &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)) {
  H5P.hasiOSiframeScrollFix = true;

  // Keep track of original focus function
  var focus = HTMLElement.prototype.focus;

  // Override the original focus
  HTMLElement.prototype.focus = function () {
    // Only focus the element if it supports it natively
    if ( (this instanceof HTMLAnchorElement ||
          this instanceof HTMLInputElement ||
          this instanceof HTMLSelectElement ||
          this instanceof HTMLTextAreaElement ||
          this instanceof HTMLButtonElement ||
          this instanceof HTMLIFrameElement ||
          this instanceof HTMLAreaElement) && // HTMLAreaElement isn't supported by Safari yet.
        !this.getAttribute('role')) { // Focus breaks if a different role has been set
        // In theory this.isContentEditable should be able to recieve focus,
        // but it didn't work when tested.

      // Trigger the original focus with the proper context
      focus.call(this);
    }
  };
}
*/

export default UI;
