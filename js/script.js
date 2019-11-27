$(document).ready(function() {
    $('#name').focus();
});

///////////***********Job Role Section*******////////////

//hide 'other' input on load
$('#other-title').hide();
//click handler for 'other' job role option
const $jobSelect = $('#title');
//const $jobOption = $('#title option');
$jobSelect.on('change', function(event){
    if ($(event.target).val()==='other'){
    $('#other-title').show();
    } else {
       $('#other-title').hide();
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
let $checkbox = $('.activities input[type="checkbox"]');
$('.activities').on('change',function(event){
    for (i = 0; i < $checkbox.length; i ++){
        let $clicked = ($(event.target));   // target main e.target click
        let $clickedCost = $clicked.attr('data-cost');  
        let $clickedCostNum = parseInt($clickedCost.replace('$', '')); //clicked as num
        let $clickedDayTime = $clicked.attr('data-day-and-time'); //clicked day/time
        let $checkboxDayTime = $checkbox.eq(i).data('day-and-time'); //checkbox day/time
        let $checkboxCost = $checkbox.eq(i).data('cost');
        let $checkboxCostNum = parseInt($checkboxCost.replace('$', ''));
        console.log('clicked cost=' + $clickedCostNum);
        console.log('checkbox cost=' + $checkboxCostNum);
        //console.log('clicked day/time=' + $clickedDayTime);
        //console.log('checkbox day/time=' + $checkboxDayTime);
        //console.log($storeTotal);
        console.log($checkbox.eq(i).prop('checked'))
    //update $clickedCostNum based on activities checked
    //if ($clickedCostNum === $checkboxCostNum && $clicked !== $checkbox.eq(i)){
        if ($(this).prop('checked')) {
            $storeTotal = $storeTotal + $clickedCostNum;
        } else {
            $storeTotal = $storeTotal - $clickedCostNum;
        } 
    //}
    console.log("The new total is: " +$storeTotal);
    $(totalCost).html('<span>Total Cost: $'+ $storeTotal +'</span>');
      
    ////////dealing with conflicting activities day/time/////////////
    if ($clickedDayTime === $checkboxDayTime){
        if ($clicked.prop('checked')){
            $checkbox.eq(i).prop('disabled',true);
        }   else {
            $checkbox.eq(i).prop('disabled',false);
        }          
    }
    $clicked.prop('disabled',false);

    } 
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
    $("<style>")
    .prop("type", "text/css")
    .html("\
    #errors {\
        border: red 1px solid;\
        color: red;\
    }")
    .appendTo('head');
    
//validation for name
const nameValidation = () => {
    if ($('#name:text').val().length === 0) {
        console.log($('#name'));
        $('#name').addClass('#errors');
        $('<span>Please enter your name</span>').appendTo('#name');
    } else {

    }

}



//validation for email



//validation for activities


//validation for credit card
/////validation for credit card zip
/////validation for credit card cvv


// const $button = $('button')
// $button.on('click', function(event) {
//  });