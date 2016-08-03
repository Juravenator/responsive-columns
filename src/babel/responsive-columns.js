Polymer({
  is: 'responsive-columns',

  properties: {
    /**
     * The selected column number, starts at 0
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
     * true when the first column is selected
     */
    minSelected: {
      type: Boolean,
      computed: "_isMinSelected(selectedIndex)",
      reflectToAttribute: true,
      notify: true
    },

    /**
     * true when the last column is selected
     */
    maxSelected: {
      type: Boolean,
      computed: "_isMaxSelected(selectedIndex, _items)",
      reflectToAttribute: true,
      notify: true
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
      reflectToAttribute: true,
      notify: true
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
    'iron-resize': '_sizeChanged',
    'tap': '_tapHandler'
  },

  /**
   * true when the first column is selected
   *
   * @param {Number} selectedIndex the column index
   * @return {Boolean}
   */
  _isMinSelected: function(selectedIndex) {
    return selectedIndex == 0;
  },

  /**
   * true when the last column is selected
   * @param {Number} selectedIndex the column index
   * @param {Array} _items the columns
   * @return {Boolean}
   */
  _isMaxSelected: function(selectedIndex, _items) {
    return this.selectedIndex == _items.length - 1;
  },

  /**
   * Responds to iron-resize event. Calculates responsiveMode.
   * @param {Event} event the iron-resize event
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
   * reponds to tap events, used to make [next-button] and [previous-button] work
   * @param {Event} tap the tap event
   */
  _tapHandler: function(tap) {
    var target = Polymer.dom(tap).localTarget;
    if (target) {
      if (target.hasAttribute('next-button')) {
        this.selectNext();
      }
      if (target.hasAttribute('previous-button')) {
        this.selectPrevious();
      }
    }
  },

  /**
   * Returns true if responsiveMode is 'small'
   * @return {Boolean}
   * @param {String} responsiveMode the current responsiveMode
   */
  _isSmall(responsiveMode) {
    return responsiveMode == "small";
  },

  /**
   * @return {Boolean}
   * @param {String} responsiveMode the current responsiveMode
   * @param {Boolean} noToolbar if the toolbar is force-hidden
   */
  _toolbarMustHide: function(responsiveMode, noToolbar) {
    return noToolbar || !this._isSmall(responsiveMode);
  },

  /**
   * @param {Number} index the current selectedIndex
   * @param {Number} oldIndex the old selectedIndex
   */
  _selectedIndexChanged: function(index, oldIndex) {
    if (this.responsiveMode == "small") {
      if (index > oldIndex) {
        this._set_entryAnimation("slide-from-right-animation");
        this._set_exitAnimation("slide-left-animation");
      } else {
        this._set_entryAnimation("slide-from-left-animation");
        this._set_exitAnimation("slide-right-animation");
      }
    } else {
      this._set_entryAnimation("");
      this._set_exitAnimation("");
    }
  },

  /**
   * Decrements the selected index unless this value is already 0.
   * This function still works when in big mode. The effect will, of course,
   * only be seen when switching to small mode.
   */
  selectPrevious: function() {
    if (this.selectedIndex > 0) {
      this.$.animatedPages.selectPrevious();
    }
  },

  /**
   * Increments the selected index unless this value is already the maximum, in
   * which case it will stay the same.
   * This function still works when in big mode. The effect will, of course,
   * only be seen when switching to small mode.
   */
  selectNext: function() {
    if (this.selectedIndex < this.$.animatedPages.items.length - 1) {
      this.$.animatedPages.selectNext();
    }
  },

  /**
   * @return {Boolean}
   * @param {String} columnMode the current column node
   */
  _columnIsVertical: function(columnMode) {
    return columnMode == "vertical";
  },

  /**
   * @return {Boolean}
   * @param {String} columnMode the current column node
   */
  _columnIsHorizontal: function(columnMode) {
    return !this._columnIsVertical(columnMode);
  }
});
