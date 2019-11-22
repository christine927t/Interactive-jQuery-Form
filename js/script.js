$(document).ready(function() {
    $('#name').focus();
});

//hide 'other' input on load
$('#other-title').hide();
//click handler for 'other' job role option
$('option[value="other"]').on('select', function(){
     $('#other-title').show();
 })


//hide 'select theme' in design menu
const $designSelect = $('#design option');
console.log($designSelect);
$designSelect.eq(0).hide();


const $colorSelect = $('#color');
console.log($colorSelect);
$colorSelect.children.hide();

// $(document).ready(function() {
//     $("#colors").children('option').hide();

// });