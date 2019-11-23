$(document).ready(function() {
    $('#name').focus();
});

///////////***********Job Role Section*******////////////

//hide 'other' input on load
$('#other-title').hide();
//click handler for 'other' job role option
const $jobSelect = $('#title');
const $jobOption = $('#title option');
$jobSelect.on('change', function(event){
    if ($(event.target).val()==='other'){
    $('#other-title').show();
    } else {
    }    
 });

///////////*********T-Shirt section*********////////////

//hide 'select theme' in design menu
const $designSelect = $('#design');
const $designSelectOptions = $('#design option');
$designSelectOptions.eq(0).hide();

//change default color dropdown option//hide all others
const $colorSelect = $('#color');
const $colorSelectOptions = $('#color option');
const $colorPlaceholder = $("<option value='choosetheme' selected='selected'>Please select a T-shirt theme</option>");
$colorSelect.prepend($colorPlaceholder);
$colorSelect.children().hide();

//change color dropdown options when design is chosen
$designSelect.on('change',function(event){
    if ($(event.target).val()==='js puns'){
        $colorPlaceholder.remove();
        $colorSelectOptions.eq(0).attr('selected','selected');
        $('#color option:gt(2)') && $('#color option:lt(6)').hide();
        $('#color option:gt(0)') && $('#color option:lt(3)').show();
        
        
    } else {//($(event.target).val()==='heart js'){
        $colorPlaceholder.remove();
        $colorSelectOptions.eq(3).attr('selected','selected');
        $('#color option:gt(2)') && $('#color option:lt(6)').show();
        $('#color option:gt(0)') && $('#color option:lt(3)').hide();
    }
});

///////////*********Activities section*********////////////

//create an element to display the total activity cost
let $storeTotal = 0;
const $totalCost = $('<span>Total Cost: $'+ $storeTotal +'</span>');
$('.activities').append($totalCost);

//listen for changes in the activity section
$('.activities').on('change',function(event){
    let $input = ($(event.target));
    console.log($input);
    
    let $cost = $input.attr('data-cost');
    console.log($cost);
    let $costNum = $cost.replace('$', '');
    console.log($costNum);
    Number($costNum);
    console.log($costNum);
    console.log(typeof($costNum));
})


//update and display the total activity cost

//disable conflicting activities