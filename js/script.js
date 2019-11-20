$( document ).ready(function() {
    $('#name').focus();
});


$('#other-title').hide();
//click handler for 'other' job role option
$('#title [value=other]').on('select', function(){
    $('#other-title').show();
})
//hide 'other' input on load
