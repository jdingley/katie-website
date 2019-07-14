$(document).ready(function() {
  
    $('#note_field').editable({
       type:  'textarea',
       pk:    1,
       name:  'notes',
       url:   '/Temp/NoLawnSigns/EDIT/'+ $(this).parent().attr('id'), 
       title: 'Enter note'
    });    

});