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
    $colorPlaceholder.remove();
    if ($(event.target).val()==='js puns'){
        $colorSelectOptions.eq(0).prop('selected',true);
        $('#color option:gt(2)') && $('#color option:lt(6)').hide();
        $('#color option:gt(0)') && $('#color option:lt(3)').show();
        
        
    } else {//($(event.target).val()==='heart js'){
        $colorSelectOptions.eq(3).prop('selected',true);
        $('#color option:gt(2)') && $('#color option:lt(6)').show();
        $('#color option:gt(0)') && $('#color option:lt(3)').hide();
    }
});

///////////*********Activities section*********////////////

//create an element to display the total activity cost
let $storeTotal = 0;
let totalCost = document.createElement("span"); 
$('.activities').append(totalCost);

//listen for changes in the activity section
$('.activities').on('change',function(event){
    let $input = ($(event.target));   
    let $inputCost = $input.attr('data-cost');
    let $costNum = $inputCost.replace('$', '');
    let $cost = parseInt($costNum);
    let $dayTime = $input.attr('data-day-and-time');
    console.log($dayTime);

    //update $cost based on activities checked
    if ($(event.target).prop('checked') === true) {
        $storeTotal = $storeTotal + $cost;
    } else {
        $storeTotal = $storeTotal - $cost;
    } 
    console.log("The new total is: " +$storeTotal);
    //display updated total cost of activities on page
    $(totalCost).html('<span>Total Cost: $'+ $storeTotal +'</span>');

    //dealing with conflicting activities day/time

    $('.activities input').each(function(i, input){
        let $activity = input[i];
        console.log($activity);
        if ($dayTime[i] === $input[i]){


            $dayTime[i].prop('disabled', true)
        }
    })
})

///////////*********Payment section*********////////////

const $payment = $('#payment');
const $paymentOptions = $('#payment option')
$paymentOptions.eq(0).hide();

$payment.on('change',function(event){
    if ($(event.target).val()=== 'Credit Card'){
        $('#credit-card').show();
        $('#paypal').hide();
        $('#bitcoin').hide();
    } else if ($(event.target).val()=== 'PayPal'){
        $('#credit-card').hide();
        $('#paypal').show();
        $('#bitcoin').hide();
    } else {
        $('#credit-card').hide();
        $('#paypal').hide();
        $('#bitcoin').show();
    }
})

///////////*********Validation section*********////////////
const invalid = (element) => {
    ($(element).css('border', 'red'));
    

}
//validation for name
const nameValidation = () => {
    if ($('#name').text === ' ') {
        $('#name').css('border', 'red');
        $('<span>Please enter your name</span>').appendTo('#name');
    }

}


//validation for email



//validation for activities


//validation for credit card
/////validation for credit card zip
/////validation for credit card cvv
const $button = $('button')
$button.on('click', function(event) {
    event.preventDefault();
    nameValidation();
 });