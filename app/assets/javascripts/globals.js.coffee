class @Global
  self = this

  @init_datetime_picker: ->
    datetimepicker_options = 
      format: "d/m/Y g:i a"
      formatTime: "g:i a"
      step: 30

    $(".datetimepicker").datetimepicker(datetimepicker_options)

  @init_tinymce: ->
    tinyMCE.init 
      selector: 'textarea'

  @init: ->
    self.init_datetime_picker()
    self.init_tinymce()

$ ->
  Global.init()

$(document).on "page:change", ->
  Global.init()

$(document).on "page:load", ->
  Global.init()

$(document).on "page:fetch", ->
  Global.init()
