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

    //update $clickedCostNum based on activities checked
        if ($clicked.eq(i).prop('checked')) {
            $storeTotal = $storeTotal + $clickedCostNum;
        } else if ($clicked.eq(i).prop('checked')===false){
            $storeTotal = $storeTotal - $clickedCostNum;
        } 
  
    console.log("The new total is: " +$storeTotal);
    $(totalCost).html('<span>Total Cost: $'+ $storeTotal +'</span>');
      
    //dealing with conflicting activities day/time//
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

//validation for name
const nameValidation = () => {
    const $name = $('#name')
    if (($name).val().length === 0) {
        $name.before($('<div class="error-message" display="block">Please enter your name</div>'));
        $name.css("border","red solid 2px");
        return false;
    } else {
        $('.error-message').css({"display":"none"});
        $name.css({"border":"none"});
        return true;
    }
}



//validation for email
const emailValidation = () => {
    const $email = $('#mail');
    const $pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const $isValid = $pattern.test($email.val());
    if ($email.val().length > 0 && $isValid == true){
        $('.error-message').css({"display":"none"});
        $email.css({"border":"none"});
        return true;
    } else {
        $email.before($('<div class="error-message" display="block">Please enter a valid email address</div>'));
        $email.css("border","red solid 2px");
        return false;
    }

}


//validation for activities
const activitiesValidation = () => {
    let $numChecked = 0;
    const $activities = $('.activities');
    const $actLegend = $('.activities legend');
    for (i = 0; i < $checkbox.length; i ++){
        if ($checkbox.eq(i).prop('checked')) {
            $numChecked = $numChecked + 1;
        } else {}
    }
    if ($numChecked < 1){
        $actLegend.append($('<div class="error-message" display="block">Please register for at least one activity.</div>'));
        $actLegend.css("border","red solid 2px");   
        return false;
    } else {
        $('.error-message').css({"display":"none"});
        $actLegend.css({"border":"none"});   
        return true;
    }
}

//validation for credit card
const ccValidation = () => {
    const $creditCard = $('#credit-card');
    const $ccNum = $('#cc-num');
    if ($paymentOptions.val()==='Credit Card'){
        const $pattern = /[0-9]{13,16}/;
        const $isValid = $pattern.test($ccNum.val());
        $('.error-message').css({"display":"none"});
        $ccNum.css({"border":"none"}); 
        return true;
    } else {
        $ccNum.after($('<div class="error-message" display="block">Please enter a valid credit card number.</div>'));
        $ccNum.css({"border":"red solid 2px","margin-bottom":"0"});   
        return false;
    }



}
/////validation for credit card zip
/////validation for credit card cvv

const masterValidation = () => {
    nameValidation;
    emailValidation;
    activitiesValidation;
    if ($paymentOptions.val()==='Credit Card'){
        ccValidation;
    }
    if (nameValidation === true && emailValidation === true && activitiesValidation === true){
        return true;
    }    else {
            return false;
        }
    }


//const $button = $('button')
$('form').submit(function(event) {
    event.preventDefault();
    console.log("Submit has been clicked");
    nameValidation();
    emailValidation();
    activitiesValidation();
    ccValidation();
    $('.error-message').css({"color":"red"});
 });
