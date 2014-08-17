class @Global
  self = this

  @init_datetime_picker: ->
    datetimepicker_options = 
      format: "d/m/Y g:i a"
      formatTime: "g:i a"
      step: 30

    $(".datetimepicker").datetimepicker(datetimepicker_options)

  @init: ->
    self.init_datetime_picker()

$ ->
  Global.init()
