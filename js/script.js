$(document).ready(function() {
    $('#name').focus();
});

///////////***********Email Section*******////////////
/////REAL TIME VALIDATION ON EMAIL////
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
//hide Color menu input on load
$('#colors-js-puns').hide();

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
    $('#colors-js-puns').show();
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
const $paymentOptions = $('#payment option');
$paymentOptions.eq(0).hide();
$paymentOptions.eq(1).prop('selected',true);
let $paymentSel = $("#payment option:selected").val();

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
   $paymentSel = $(event.target);
})

///////////*********Validation section*********////////////

//validation for name
const nameValidation = () => {
    const $name = $('#name')
    if (($name).val().length === 0) {
        if($('#error-name').length > 0)
        {} else {
            $name.before($('<div class="error-message" id="error-name">Please enter your name</div>'));
            $name.css("border","red solid 2px");
            return false;
        }
    } else {
        $('.error-message').css({"display":"none"});
        $name.css({"border":"none"});
        return true;
    }
}

//validation for email
const emailValidation = () => {
    const $pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const $isValid = $pattern.test($email.val());
    if ($isValid){
        $('.error-message').css({"display":"none"});
        $email.css({"border":"none"});
        return true;
    } else {
        if($('#error-email').length > 0)
        {} else {
            $email.before($('<div class="error-message" id="error-email">Please enter a valid email address</div>'));
            $email.css("border","red solid 2px");
            return false;
        }
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
        if($('#error-act').length > 0)
        {} else {
            $actLegend.append($('<div class="error-message" id="error-act">Please register for at least one activity.</div>'));
            return false;
        }
    } else {
        $('.error-message').css({"display":"none"});
        return true;
    }
}

////////////credit card/////////////
const $creditCard = $('#credit-card');
const $ccNum = $('#cc-num');
const $zip = $('#zip');
const $cvv = $('#cvv');

/////CONDITIONAL ERROR MESSAGE/////
const $ccTip1 = $('<div class="cc-tip">Enter a CC number at least 13 numbers long.</div>');
$ccNum.css({"margin-bottom":"2px"}); 

$('#cc-num').keydown(function(){
    console.log($ccNum.val())
    if ($ccNum.val().length < 13){
        $ccNum.after($ccTip1).fadeIn(1000);
        $('.cc-tip').css({"font-size":".80em","font-weight":"bold"});
    } else {
        $ccTip1.css("display","none");
    }
})  

//validation for credit card
const ccValidation = () => {
    //test cc num function
    const ccNumValid = () =>{
        // const $pattern = /^[0-9]{13,16}$/;
        // const $isValid = $pattern.test($ccNum.val());
        if ($ccNum.val().length > 0 && $isValid == true){
            $('.error-message').css({"display":"none"});
            $ccNum.css({"border":"none"}); 
            return true;
        } else {
            if($('#error-cc').length > 0)
            {} else {
                $ccNum.after($('<div class="error-message" id="error-cc">Please enter a valid credit card number.</div>'));
                $ccNum.css({"border":"red solid 2px","margin-bottom":"2px"});  
                return false;
            }
        }
    }

    //test zip function
    const zipValid = () =>{
        const $pattern = /^[0-9]{5}$/;
        const $isValid = $pattern.test($zip.val());
        if ($zip.val().length > 0 && $isValid == true){
            $('.error-message').css({"display":"none"});
            $zip.css({"border":"none"}); 
            return true;
        } else {
            if($('#error-zip').length > 0)
            {} else {
                $zip.after($('<div class="error-message" id="error-zip">Please enter a valid zip code.</div>'));
                $zip.css({"border":"red solid 2px","margin-bottom":"0"}); 
                return false;
            }
        }
    }

    //test cvv function
    const cvvValid = () =>{
        const $pattern = /^[0-9]{3}$/;
        const $isValid = $pattern.test($cvv.val());
        if ($cvv.val().length > 0 && $isValid == true){
            $('.error-message').css({"display":"none"});
            $cvv.css({"border":"none"}); 
            return true;
        } else {
            if($('#error-cvv').length > 0)
            {} else {
                $cvv.after($('<div class="error-message" id="error-cvv">Please enter a CVV code.</div>'));
                $cvv.css({"border":"red solid 2px","margin-bottom":"0"});
                return false;
            }
        }
    }
    //call all three functions
    ccNumValid();
    zipValid();
    cvvValid();
}

const masterValidation = () => {
    nameValidation();
    emailValidation();
    activitiesValidation();
    if ($paymentSel === 'Credit Card'){
        ccValidation();
    } 
}

//submit handler on button//
$('form').submit(function(event) {
    event.preventDefault();
    masterValidation();
    $('.error-message').css({"color":"red"});
 });
