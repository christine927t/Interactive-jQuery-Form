$(document).ready(function() {
    $('#name').focus();
    $('#paypal').hide();
    $('#bitcoin').hide();
    $('#colors-js-puns').hide();
    $('#other-title').hide();
});

///////////EMAIL SECTION////////////
//EXCEEDS - REAL TIME ERROR MESSAGE//
////////////////////////////////////
const $email = $('#mail');
const $emailTip = $('<div id="email-tip">Please enter your email address</div>');

$('#mail').focus(function(){
    $email.before($emailTip).fadeIn(1000);
    $('#email-tip').css({"font-size":".80em","font-weight":"bold"});
    $('#mail').keyup(function(){
        const $pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const $isValid = $pattern.test($email.val());
        if ($isValid) {
            $emailTip.css("display","none");
        }
    })    
});

///////////JOB ROLE SECTION////////////
//click handler for 'other' job role option
const $jobSelect = $('#title');
$jobSelect.on('change', function(event){
    if ($(event.target).val()==='other'){
    $('#other-title').show();
    } else {
       $('#other-title').hide();
    }
 });

///////////T-SHIRT SECTION////////////
//hide 'select theme' in design menu
const $designSelect = $('#design');
const $designSelectOptions = $('#design option');
$designSelectOptions.eq(0).hide();

//change default color dropdown option//hide all others
const $colorSelect = $('#color');
const $colorSelectOptions = $('#color option');
const $colorSelectPuns = $("#color option:contains('Puns')");
const $colorSelectNotPuns = $("#color option:not(:contains('Puns'))");

//change color dropdown options when design is chosen
$designSelect.on('change',function(event){
    $('#colors-js-puns').show();
    if ($(event.target).val()==='js puns'){
        $colorSelectPuns.eq(0).prop('selected',true);
       $colorSelectPuns.show();
       $colorSelectNotPuns.hide();
        
    } else {
        $colorSelectNotPuns.eq(0).prop('selected',true);
        $colorSelectNotPuns.show();
        $colorSelectPuns.hide();
    }
});

///////////ACTIVITIES SECTION////////////
//create an element to display the total activity cost
let $storeTotal = 0;
let totalCost = document.createElement("span"); 
$('.activities').append(totalCost);

//listen for changes in the activity section
let $checkbox = $('.activities input[type="checkbox"]');
$('.activities').on('change',function(event){
    for (i = 0; i < $checkbox.length; i ++){
        let $clicked = ($(event.target)); 
        let $clickedCost = $clicked.attr('data-cost');  //clicked cost
        let $clickedCostNum = parseInt($clickedCost.replace('$', '')); //clicked cost as num
        let $clickedDayTime = $clicked.attr('data-day-and-time'); //clicked day/time
        let $checkboxDayTime = $checkbox.eq(i).data('day-and-time'); //checkbox day/time
        let $checkboxCost = $checkbox.eq(i).data('cost'); //checkbox cost
        let $checkboxCostNum = parseInt($checkboxCost.replace('$', '')); //checkbox cost as num

    //update $clickedCostNum based on activities checked
        if ($clicked.eq(i).prop('checked')) {
            $storeTotal = $storeTotal + $clickedCostNum;
        } else if ($clicked.eq(i).prop('checked')===false){
            $storeTotal = $storeTotal - $clickedCostNum;
        } 
        $(totalCost).html('<span class="cost">Total Cost: $'+ $storeTotal +'</span>');
      
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

///////////PAYMENT SECTION////////////
const $payment = $('#payment');
const $paymentOptions = $('#payment option');
$paymentOptions.eq(0).hide();
$paymentOptions.eq(1).prop('selected',true);
let $paymentSel = $("#payment option:selected").val();
let ccCalled = true; //global var that will return true/false depending on whether ccValidation was called

//payment input/text shown/hidden on change event of $payment dropdown//
$payment.on('change',function(event){
    if ($(event.target).val()=== 'Credit Card'){
        $('#credit-card').show();
        $('#paypal').hide();
        $('#bitcoin').hide();
    } else if ($(event.target).val()=== 'PayPal'){
        ccCalled = false;
        $('#credit-card').hide();
        $('#paypal').show();
        $('#bitcoin').hide();
    } else {
        ccCalled = false;
        $('#credit-card').hide();
        $('#paypal').hide();
        $('#bitcoin').show();
    } 
   $paymentSel = $(event.target).val();
})

/////////////////////////////////////
/*********** VALIDATION ***********/
////////////////////////////////////

//NAME VALIDATION//
const nameValidation = () => {
    const $name = $('#name')
    if (($name).val().length === 0) {
        if($('#error-name').length > 0) //checking if error already exists
        {   return false;
        } else {
            $name.before($('<div class="error-message" id="error-name">Please enter your name</div>'));
            $name.css("border","#d86d09 solid 2px");
            return false;
        }
    } else {
        $('#error-name').css({"display":"none"}); //removes error when length is != 0
        $name.css({"border":"none"});
        return true;
    }
}

//EMAIL VALIDATION//
const emailValidation = () => {
    const $pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const $isValid = $pattern.test($email.val()); //tests for valid email entered
    if ($isValid){
        $('#error-email').css({"display":"none"}); //removes error when length is != 0
        $email.css({"border":"none"});
        return true;
    } else {
        if($('#error-email').length > 0) //checking if error already exists
        {   return false;
        } else {
            $email.before($('<div class="error-message" id="error-email">Please enter a valid email address</div>'));
            $email.css("border","#d86d09 solid 2px");
            return false;
        }
    }
}

//ACTIVITIES VALIDATION//
const activitiesValidation = () => {
    let $numChecked = 0;
    const $activities = $('.activities');
    const $actLegend = $('.activities legend');
    for (i = 0; i < $checkbox.length; i ++){ //loops through checkbox items to check for 'checked' property
        if ($checkbox.eq(i).prop('checked')) {
            $numChecked = $numChecked + 1;
        } else {}
    }
    if ($numChecked < 1){
        if($('#error-act').length > 0) //checking if error already exists
        {   return false;
        } else { 
            $actLegend.append($('<div class="error-message" id="error-act">Please register for at least one activity.</div>'));
            return false;
        }
    } else {
        $('#error-act').css({"display":"none"}); //removes error when activities are valid
        return true;
    }
}

/////////////////////////////////////
//EXCEEDS - CONDITIONAL ERROR MESSAGE//
////////////////////////////////////
const $creditCard = $('#credit-card');
const $ccNum = $('#cc-num');
const $zip = $('#zip');
const $cvv = $('#cvv');

const $ccTip1 = $('<div class="cc-tip" id="cc-tip1">Enter a CC number at least 13 digits long.</div>');
const $ccTip2 = $('<div class="cc-tip" id="cc-tip2">Enter a CC number less than 16 digits long.</div>');
$ccNum.css({"margin-bottom":"2px"}); 

$('#cc-num').keyup(function(){
    const $pattern1 = /^[0-9]{13,}$/; //checks for at least 13 numbers entered
    const $pattern2 = /^[0-9]{17,}$/; //checks for more than 16 numbers entered
    const $isValid1 = $pattern1.test($ccNum.val());//returns true/false
    const $isValid2 = $pattern2.test($ccNum.val());//returns true/false
    if (!$isValid1) {
        $ccNum.after($ccTip1).fadeIn(1000); //13+ error shows up
        $('.cc-tip').css({"font-size":".80em","font-weight":"bold"});
        $('#cc-tip2').css({"display":"none"});
    }
    else if ($isValid1){ //13+ error leaves
        $('#cc-tip1').css({"display":"none"});
    }
    if ($isValid2) {
        $ccNum.after($ccTip2).fadeIn(1000); //<16 error shows up
        $('.cc-tip').css({"font-size":".80em","font-weight":"bold"});
        $('#cc-tip1').css({"display":"none"});
    } 
    else {
        $('#cc-tip2').css({"display":"none"}); //<16 error leaves
    }

 }) 


//CREDIT CARD VALIDATION//
const ccValidation = () => {
    //TEST CC NUMBER INPUT
    const ccNumValid = () =>{
        const $pattern = /^[0-9]{13,16}$/; //checks for between 13 and 16 numbers being entered
        const $isValid = $pattern.test($ccNum.val());
        if ($ccNum.val().length > 0 && $isValid == true){
            $('#error-cc').css({"display":"none"});
            $ccNum.css({"border":"none"}); 
            return true;
        } else {
            if($('#error-cc').length > 0) //checks for error message already existing
            {   return false;
            } else {
                $ccNum.after($('<div class="error-message" id="error-cc">Please enter a valid credit card number.</div>'));
                $ccNum.css({"border":"#d86d09 solid 2px","margin-bottom":"2px"});  
                return false;
            }
        }
    }

    //TEST ZIP INPUT
    const zipValid = () =>{
        const $pattern = /^[0-9]{5}$/; //checks for exactly 5 numbers being entered
        const $isValid = $pattern.test($zip.val()); 
        if ($zip.val().length > 0 && $isValid == true){
            $('#error-zip').css({"display":"none"});
            $zip.css({"border":"none"}); 
            console.log("zip is correct")
            return true;
        } else {
            if($('#error-zip').length > 0) //checks for error message already existing
            {   return false;
            } else {
                $zip.after($('<div class="error-message" id="error-zip">Please enter a valid zip code.</div>'));
                $zip.css({"border":"#d86d09 solid 2px","margin-bottom":"2px"}); 
                console.log("zip is bad")
                return false;
            }
        }
    }

    //TEST CVV INPUT
    const cvvValid = () =>{
        const $pattern = /^[0-9]{3}$/; //checks for exactly 3 numbers being entered
        const $isValid = $pattern.test($cvv.val());
        if ($cvv.val().length > 0 && $isValid == true){
            $('#error-cvv').css({"display":"none"});
            $cvv.css({"border":"none"}); 
            return true;
        } else {
            if($('#error-cvv').length > 0) //checks for error message already existing
            {   return false;
            } else {
                $cvv.after($('<div class="error-message" id="error-cvv">Please enter a CVV code.</div>'));
                $cvv.css({"border":"#d86d09 solid 2px","margin-bottom":"2px"});
                return false;
            }
        }
    }
    //CALL ALL THREE INDIVIDUAL FUNCTIONS FOR CC VALIDATION
    ccNumValid();
    zipValid();
    cvvValid();

    if (ccNumValid() && zipValid() && cvvValid()){ //checks for all three validations returning true
        return true; 
    }   else {
        return false;
    }
}

const masterValidation = () => {
    nameValidation();
    emailValidation();
    activitiesValidation();

    if (ccCalled){ //if ccCalled is true, credit card is selected and ccValidation needs to be called
        ccValidation();
    } else {
    }

    if (nameValidation() && emailValidation() && activitiesValidation() && (ccCalled) && ccValidation()){
        return true;
    } else if (nameValidation() && emailValidation() && activitiesValidation() && !(ccCalled)){
        return true;
    } else if (nameValidation() && emailValidation() && activitiesValidation() && (ccCalled) && !ccValidation()){
        return false;
    } else {
        return false;
    }
    
}

//SUBMIT HANDLER ON BUTTON - CHECKS IF MASTERVALIDATION FUNCTION RETURNS TRUE//
$('form').submit(function(event) {
    if (masterValidation()){
    } else {
        event.preventDefault(); 
        $('.error-message').css({"color":"#d86d09"});
    }
});
