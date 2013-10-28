###
 * Cylong ARDrone navigation data driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';
namespace = require 'node-namespace'
require './commands'

namespace "Cylon.Driver.ARDrone", ->
  class @Nav
    constructor: (opts) ->
      @self = this
      @device = opts.device
      @connection = @device.connection

    commands: ->
      []

    start: (callback) ->
      Logger.debug "ARDrone nav started"
      @connection.on 'navdata', (data) =>
        @emit 'navdata', data

      (callback)(null)
