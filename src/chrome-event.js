/**
 * Simplest event emitter with sinon like `yields` and `trigger` methods
 */
var ChromeEvent = function () {
    this._listeners = [];
};

ChromeEvent.prototype = {
    /**
     * Applies listeners with specified args
     */
    trigger: function (arg1, arg2, argN) {
        var args = arguments;
        this._listeners.forEach(function (listener) {
            listener.apply(null, args);
        });
    },

    /**
     * Applies listeners with specified args (async)
     */
    triggerAsync: function (arg1, arg2, argN) {
        var args = arguments;
        process.nextTick(function() {
            this.trigger.apply(this, args);
        }.bind(this));
    },

    /**
     * Triggers event using first argument as array for `apply` listener
     * Useful when callback expects several arguments
     * Example: chrome.tabs.onUpdate.applyTrigger(require('data.json'));
     */
    applyTrigger: function (args) {
        if (this.isAsync) {
            process.nextTick(this.executeListeners.bind(this, args));
        } else {
            this.executeListeners.call(this, args);
        }
    },

    /**
     * Triggers event using first argument as array for `apply` listener
     * Useful when callback expects several arguments
     * Example: chrome.tabs.onUpdate.applyTrigger(require('data.json'));
     */
    applyTriggerAsync: function (args) {
        if (this.isAsync) {
            process.nextTick(this.executeListeners.bind(this, args));
        } else {
            this.executeListeners.call(this, args);
        }
    },

    addListener: function (listener) {
        if (!this.hasListener(listener)) {
            this._listeners.push(listener);
        }
    },

    removeListener: function (listener) {
        var index = this._listeners.indexOf(listener);
        if (index >= 0) {
            this._listeners.splice(index, 1);
        }
    },

    hasListener: function (listener) {
        return this._listeners.indexOf(listener) >= 0;
    },

    removeListeners: function() {
       this._listeners.length = 0;
    }
};

module.exports = ChromeEvent;
