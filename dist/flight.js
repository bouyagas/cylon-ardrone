/*
 * Cylong ARDrone flight commander driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  'use strict';
  var namespace,
    __slice = [].slice;

  namespace = require('node-namespace');

  require('./commands');

  namespace("Cylon.Driver.ARDrone", function() {
    return this.Flight = (function() {
      function Flight(opts) {
        this.self = this;
        this.device = opts.device;
        this.connection = this.device.connection;
        this.setupCommands();
      }

      Flight.prototype.commands = function() {
        return Cylon.ARDrone.Commands;
      };

      Flight.prototype.start = function(callback) {
        Logger.debug("ARDrone started");
        return callback(null);
      };

      Flight.prototype.setupCommands = function() {
        var command, _i, _len;
        for (_i = 0, _len = Commands.length; _i < _len; _i++) {
          command = Commands[_i];
          if (typeof this.self[command] === 'function') {
            return;
          }
          this.self[command] = function() {
            var args, _ref;
            args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            return (_ref = this.connection)[command].apply(_ref, args);
          };
        }
      };

      return Flight;

    })();
  });

}).call(this);
