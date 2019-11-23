$(document).ready(function() {
    $('#name').focus();
});

//hide 'other' input on load
$('#other-title').hide();
//click handler for 'other' job role option
const $jobSelect = $('#title');
const $jobOption = $('#title option');
$jobSelect.on('change', function(event){
    //console.log($(event.target).val());
    if ($(event.target).val()==='other'){
    $('#other-title').show();
    } else {
    }    
 });


//hide 'select theme' in design menu
const $designSelect = $('#design option');
$designSelect.eq(0).hide();


const $colorSelect = $('#color');
//console.log($colorSelect);
//$colorSelect.children.hide();

// $(document).ready(function() {
//     $("#colors").children('option').hide();

// });