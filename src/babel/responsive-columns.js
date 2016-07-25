Polymer({
  is: 'responsive-columns',

  properties: {
    /**
     * The selected index when in small mode
     */
    selectedIndex: {
      type: Number,
      value: 0,
      notify: true,
      observer: "_selectedIndexChanged"
    },

    /**
     * The items in the neon-animated-pages.
     * Used to show or hide the 'next' button in small mode.
     */
    _items: {
      type: Array
    },

    /**
     * animation used in 'small' mode. Changes programaticaly
     */
    _entryAnimation: {
      type: String,
      readOnly: true
    },
    /**
     * animation used in 'small' mode. Changes programaticaly
     */
    _exitAnimation: {
      type: String,
      readOnly: true
    },

    /**
     * Number, interpreted in px, that represents the breakpoint between small
     * and big mode.
     */
    responsiveWidth: {
      type: Number,
      value: 640
    },

    /**
     * Current mode, 'small' or 'big'.
     */
    responsiveMode: {
      type: String,
      readOnly: true,
      reflectToAttribute: true
    },

    /**
     * Force-hide the toolbar in small mode.
     */
    noToolbar: {
      type: Boolean,
      value: false
    },

    /**
     * Mode to use for the columns in big mode, 'horizontal' or 'vertical'.
     */
    columnMode: {
      type: String,
      value: "horizontal"
    }
  },

  behaviors: [Polymer.IronResizableBehavior],

  listeners: {
    'iron-resize': '_sizeChanged'
  },

  /**
   * Responds to iron-resize event. Calculates responsiveMode.
   */
  _sizeChanged: function(event) {
    var x = Math.floor(this.offsetWidth);

    if (x < this.responsiveWidth) {
      this._setResponsiveMode("small");
    } else {
      this._setResponsiveMode("big");
    }
  },

  /**
   * Returns true if responsiveMode is 'small'
   */
  _isSmall(responsiveMode) {
    return responsiveMode == "small";
  },

  _toolbarMustHide: function(responsiveMode, noToolbar) {
    return noToolbar || !this._isSmall(responsiveMode);
  },

  _firstIsSelected: function(selectedIndex) {
    return selectedIndex == 0;
  },

  _lastIsSelected: function(selectedIndex, _items) {
    return this.selectedIndex == _items.length - 1;
  },

  _selectedIndexChanged: function(index, oldIndex) {
    if (index > oldIndex) {
      this._set_entryAnimation("slide-from-right-animation");
      this._set_exitAnimation("slide-left-animation");
    } else {
      this._set_entryAnimation("slide-from-left-animation");
      this._set_exitAnimation("slide-right-animation");
    }
  },

  selectPrevious: function() {
    if (this.selectedIndex > 0) {
      this.$.animatedPages.selectPrevious();
    }
  },

  selectNext: function() {
    if (this.selectedIndex < this.$.animatedPages.items.length - 1) {
      this.$.animatedPages.selectNext();
    }
  },

  _columnIsVertical: function(columnMode) {
    return columnMode == "vertical";
  },

  _columnIsHorizontal: function(columnMode) {
    return !this._columnIsVertical(columnMode);
  }
});
