import $ from 'jquery';
import { EventDispatcher } from 'eduway-h5p-lib';

import './style.css';

/**
 * Joubel progressbar class
 * @method ProgressBar
 * @constructor
 * @param  {number}          steps Number of steps
 * @param {Object} [options] Additional options
 * @param {boolean} [options.disableAria] Disable readspeaker assistance
 * @param {string} [options.progressText] A progress text for describing
 *  current progress out of total progress for readspeakers.
 *  e.g. "Slide :num of :total"
 */
function ProgressBar(steps, options) {
  EventDispatcher.call(this);
  var self = this;
  this.options = $.extend({
    progressText: 'Slide :num of :total'
  }, options);
  this.currentStep = 0;
  this.steps = steps;

  this.$progressbar = $('<div>', {
    'class': 'h5p-joubelui-progressbar',
    on: {
      click: function () {
        self.toggleTooltip();
        return false;
      },
      mouseenter: function () {
        self.showTooltip();
      },
      mouseleave: function () {
        setTimeout(function () {
          self.hideTooltip();
        }, 1500);
      }
    }
  });
  this.$background = $('<div>', {
    'class': 'h5p-joubelui-progressbar-background'
  }).appendTo(this.$progressbar);

  $('body').click(function () {
    self.toggleTooltip(true);
  });
}

ProgressBar.prototype = Object.create(EventDispatcher.prototype);
ProgressBar.prototype.constructor = ProgressBar;

/**
 * Display tooltip
 * @method showTooltip
 */
ProgressBar.prototype.showTooltip = function () {
  var self = this;

  if (this.currentStep === 0 || this.tooltip !== undefined) {
    return;
  }

  var parentWidth = self.$progressbar.offset().left + self.$progressbar.width();

  this.tooltip = new H5P.Drop({
    target: this.$background.get(0),
    content: this.currentStep + '/' + this.steps,
    classes: 'drop-theme-arrows-bounce h5p-joubelui-drop',
    position: 'top right',
    openOn: 'always',
    tetherOptions: {
      attachment: 'bottom center',
      targetAttachment: 'top right'
    }
  });
  this.tooltip.on('open', function () {
    var $drop = $(self.tooltip.drop);
    var left = $drop.position().left;
    var dropWidth = $drop.width();

    // Need to handle drops getting outside of the progressbar:
    if (left < 0) {
      $drop.css({marginLeft: (-left) + 'px'});
    }
    else if (left + dropWidth > parentWidth) {
      $drop.css({marginLeft: (parentWidth - (left + dropWidth)) + 'px'});
    }
  });
};

ProgressBar.prototype.updateAria = function () {
  var self = this;
  if (this.options.disableAria) {
    return;
  }

  if (!this.$currentStatus) {
    this.$currentStatus = $('<div>', {
      'class': 'h5p-joubelui-progressbar-slide-status-text',
      'aria-live': 'assertive'
    }).appendTo(this.$progressbar);
  }
  var interpolatedProgressText = self.options.progressText
    .replace(':num', self.currentStep)
    .replace(':total', self.steps);
  this.$currentStatus.html(interpolatedProgressText);
};

/**
 * Hides tooltip
 * @method hideTooltip
 */
ProgressBar.prototype.hideTooltip = function () {
  if (this.tooltip !== undefined) {
    this.tooltip.remove();
    this.tooltip.destroy();
    this.tooltip = undefined;
  }
};

/**
 * Toggles tooltip-visibility
 * @method toggleTooltip
 * @param  {boolean} [closeOnly] Don't show, only close if open
 */
ProgressBar.prototype.toggleTooltip = function (closeOnly) {
  if (this.tooltip === undefined && !closeOnly) {
    this.showTooltip();
  }
  else if (this.tooltip !== undefined) {
    this.hideTooltip();
  }
};

/**
 * Appends to a container
 * @method appendTo
 * @param  {H5P.jquery} $container
 */
ProgressBar.prototype.appendTo = function ($container) {
  this.$progressbar.appendTo($container);
};

/**
 * Update progress
 * @method setProgress
 * @param  {number}    step
 */
ProgressBar.prototype.setProgress = function (step) {
  // Check for valid value:
  if (step > this.steps || step < 0) {
    return;
  }
  this.currentStep = step;
  this.$background.css({
    width: ((this.currentStep/this.steps)*100) + '%'
  });

  this.updateAria();
};

/**
 * Increment progress with 1
 * @method next
 */
ProgressBar.prototype.next = function () {
  this.setProgress(this.currentStep+1);
};

/**
 * Reset progressbar
 * @method reset
 */
ProgressBar.prototype.reset = function () {
  this.setProgress(0);
};

/**
 * Check if last step is reached
 * @method isLastStep
 * @return {Boolean}
 */
ProgressBar.prototype.isLastStep = function () {
  return this.steps === this.currentStep;
};

export default ProgressBar;
