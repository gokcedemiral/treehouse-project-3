//global variables
let totalAmount = 0;
const $form = document.querySelector("form");
const $name = $('#name');
const $email = $('#mail');
const $title = $('#title');
const $size = $('#size');
const $designSelect = $('#design');
const $colorSelect = $('#color');
const $activities = $('.activities');
const $activityCheckboxes =$('.activities input')
const $payment = $('#payment')
const $paymentOptions = $("#payment option");
const $creditCardDiv = $('#credit-card');
const $payPalDiv = $('#paypal');
const $bitCoinDiv = $('#bitcoin')
const $creditCardNumber = $('#cc-num');
const $zipCode = $('#zip');
const $cvv = $('#cvv');
// const payPal = payment.attr("id", "paypal");
// const bitCoin = payment.attr("id", "bitcoin");

/***
    Sets focus on the first text field
    When the page first loads, the first text field should be in focus by default.
***/
$name.focus();

/***
    "Job Role" section
    Included a text field with id of “other-title" and the placeholder text of "Your Job Role" to index.html, and with the following code it be revealed when the "Other" option is selected from the "Job Role" drop down menu.
***/
$('#other-title').hide(); //To make sure at start we do not have the other title field showing.
$title.change(function() {
    if($(this).val() === "other") {
        $('#other-title').show();
    }
    else {
        $('#other-title').hide();
    }
});

/***
"T-Shirt Info" section
    For exceeding expectations the color select section is hidden when design select is not made.(It used to be : When a selection for a theme is not made the color field is disabled and only reads 'Please select a T-shirt theme'.)
    When a selection for a theme is made the color options match the selection and is updated dynamically.
***/

if ( $designSelect.val() === 'Select Theme' ) { //Color options is not shown
    $('#colors-js-puns').hide();
}
$designSelect.change(() => {
    $('#colors-js-puns').show();
    // the theme tshirts are collected under related variables
    let $themeJSPuns = $('#color option[value="cornflowerblue"],[value="darkslategrey"],[value="gold"]');
    let $themeIheartJS = $('#color option[value="tomato"],[value="steelblue"],[value="dimgrey"]');

        //If the user selects "Theme - JS Puns" then the color menu will only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
    if ( $designSelect.val() === 'js puns' ) {
        $themeIheartJS.hide();
        $themeJSPuns.show();
        $colorSelect.val('cornflowerblue');

        //If the user selects "Theme - I ♥ JS" then the color menu will only display "Tomato," "Steel Blue," and "Dim Grey."
    } else if ($('#design').val() === "heart js") {
        $themeJSPuns.hide();
        $themeIheartJS.show();
        $colorSelect.val('tomato');

        //If the user selects the empty option for selecting theme, the color select area is not shown
    } else if ($designSelect.val() === 'Select Theme') {
        $('#colors-js-puns').hide();
    }
})

/***
"Register for Activities" section
For the same day and time activities, once one is selected the others are disabled and once unchecked are no longer disabled.
As activities chosen/unchosen the total amount of costs are listed below the list.
***/
$activities.append('<div id="total-cost"></div>');
const $totalCost = $('#total-cost');
$totalCost.css('border-left', '4px solid rgba(8,63,87,0.6').css('background-color', 'rgb(233,246,251)').css('padding', '5px 10px');
$totalCost.hide();

$activities.change((e) => {
    const checked = e.target;
    const checkedEventInfo = checked.parentElement.textContent;
    const eventTimeFromInfo = checkedEventInfo.match(/\w+\s\d\w{2}-\d\d?\w{2}/)
    const eventCostFromInfo = checkedEventInfo.match(/\d{3}/);
    const cost = parseInt(eventCostFromInfo);

    //Loop through the activities to see if there is a conflicting activity
    for (let i=0; i < $activityCheckboxes.length; i++) {
        let textOfActivity = $activityCheckboxes[i].parentElement.textContent;

        if (checked !== $activityCheckboxes[i] && textOfActivity.includes(eventTimeFromInfo) ) {
            $activityCheckboxes[i].disabled = !($activityCheckboxes[i].disabled);
            if($activityCheckboxes[i].disabled === true ){
                $($activityCheckboxes[i].parentElement).css("textDecoration", "line-through");
            } else {
                $($activityCheckboxes[i].parentElement).css("textDecoration", "none");
            }
        }
    }

    //When a change occurs if the clicked item is checked add the cost to total amount and if not substract.
    if ( $(checked).prop('checked')) {
        totalAmount += cost;
    } else {
        totalAmount -= cost;
    }

    $totalCost.html(`Total Amount: $ ${totalAmount}`);

    //When amount is higher than 0 user will see it, when hits 0 back it is hid.
    if( totalAmount > 0) {
        $totalCost.show();
    } else {
        $totalCost.hide();
    }
});

/***
"Payment Info" section
Payment sections are displayed based on the payment option chosen in the select menu.
"Select payment method" option is removed
 ***/
// Empty select option is removed
$($payment).find("option").eq(0).remove();

// The not chosen divs are hidden
$payPalDiv.hide();
$bitCoinDiv.hide();

// When payment input is changed the display will update accordingly
$payment.change( function() {
    $creditCardDiv.show();
    const $paymentMethod = $(this).val();
    if ( $paymentMethod === "PayPal" ) {
        $payPalDiv.show();
        $bitCoinDiv.hide();
        $creditCardDiv.hide();
    }
    if ( $paymentMethod === "Bitcoin") {
        $bitCoinDiv.show();
        $payPalDiv.hide();
        $creditCardDiv.hide();
    }
    if ( $paymentMethod === "Credit Card") {
        $bitCoinDiv.hide();
        $payPalDiv.hide();
        $creditCardDiv.show();
    }
});
/***
Form validation
***/

// Regex validation variables
const regex_name =  /[\d+\!\"#\$%&\(\)\=\/*-+\|@`\']/;
const regex_email = /(\w+@\w+)(\.com|\.net|\.co)/;
const regex_creditCardNumber = /^(?:\d[ -]*?){13,16}$/;
const regex_zipCode = /^(\d{5})$/;
const regex_ccv = /^\d{3}$/;

// Validation error messages - inserted and hidden
const $nameValidationMessage = $('<small class="validation-message">Required field</small>');
$nameValidationMessage.insertAfter($name).css('color', 'tomato').css('margin-bottom', '10px');

const $emailValidationMessage = $('<small class="validation-message">Required field</small>');
$emailValidationMessage.insertAfter($email).css('color', 'tomato').css('margin-bottom', '10px');

const $activitiesValidationMessage = $('<small class="validation-message">Required field</small>');
$activitiesValidationMessage.insertAfter($activities).css('color', 'tomato').css('margin-bottom', '10px');

const $creditCardValidationMessage =  $('<small class="validation-message">Required field</small>');
$creditCardValidationMessage.insertAfter($creditCardNumber).css('color', 'tomato').css('margin-bottom', '10px');

const $cvvValidationMessage =  $('<small class="validation-message">Required field</small>');
$cvvValidationMessage.insertAfter($cvv).css('color', 'tomato').css('margin-bottom', '10px');

const $zipValidationMessage =  $('<small class="validation-message">Required field</small>');
$zipValidationMessage.insertAfter($zipCode).css('color', 'tomato').css('margin-bottom', '10px');

// Validation checking functions
function checkName(name){
    if(name.val() === '' || !(regex_name.test(name.val()))) {
        $nameValidationMessage.show();
        name.css('borderColor', 'red');
        return false;
    } else {
        name.css('borderColor', '');
        return true;
    }
}

function checkEmail(email) {
    if (email.val() === '' || !(regex_email.test(email.val()))) {
        $emailValidationMessage.show();
        email.css('borderColor', 'red');
          return false;
    } else {
        email.css('borderColor', '');
        return true;
    }
}

function checkActivity(activities) {
    if(activities === 0) {
        $activitiesValidationMessage.show()
        activities.css('color', 'red');
        return false;
    } else {
        activities.css('border', 'none');
        return true;
    }
}

function checkCreditCardNum(creditCardNumber) {
    if(creditCardNumber.val() === "" || !(regex_creditCardNumber.test(creditCardNumber.val())) ) {
        $creditCardValidationMessage.show();
        creditCardNumber.css('borderColor', 'red');
        return false;
    } else {
        creditCardNumber.css('borderColor', '');
        return true;
    }
}

function checkZipCode(zip) {
    if(zip.val() === "" || !(regex_zipCode.test(zip.val())) ) {
        $zipValidationMessage.show();
        zip.css('borderColor', 'red' );
        return false;
    } else {
        zip.css('borderColor', '');
        return true;
    }
}

function checkCVV(cvv) {
    if(cvv.val() === "" || !(regex_CVV.test(cvv.val())) ) {
        $cvvValidationMessage.show();
        cvv.css('borderColor', 'red' );
        return false;
    } else {
        cvv.css('borderColor', '');
        return true;
    }
}

// function to check the validity of all input. If everything is valid it will return true
function validateForm() {
    let isValid = true;
    if(checkName($name) === false) {
       isValid = false;
    }
    if(checkEmail($email) === false) {
        isValid = false;
    }
    if (checkActivity(totalAmount) === false) {
        isValid = false;
    }

    if ($payment.val() === 'Credit Card') {
        if(checkCreditCardNum($creditCardNum) === false) {
            isValid = false;
        }
        if(checkZipCode($zipCode) === false ) {
            isValid = false;
        }
        if (checkCVV($cvv) === false) {
            isValid = false;
        }
    }
    return isValid;
}

 // function that clears red border and error message if input is correct
function clearError() {
    if (checkName($name)) {
        $nameValidationMessage.hide();
        $name.css('borderColor', '');
    }
    if (checkEmail($email)) {
        $emailValidationMessage.hide();
        $email.css('borderColor', '');
    }
    if(checkActivity($activities)) {
        $activitiesValidationMessage.hide();
        $activities.css('color', '');
    }
    if(checkCreditCardNum($creditCardNumber)) {
        $creditCardValidationMessage.hide();
        $creditCardNumber.css('borderColor', '');
    }
    if(checkZipCode($zipCode)) {
        $zipValidationMessage.hide();
        $zipCode.css('borderColor', '' );

    }
    if(checkCVV($cvv)) {
        $cvvValidationMessage.hide();
        $cvv.css('borderColor', '' );
    }
}

//keyup checks functions for validation messages
$name.on('keyup', function(){
    checkName($name)
    if (regex_name.test($name.val()) ){
        $nameValidationMessage.text("Please provide in correct form: Only letters and spaces").show()
    } else {
        $name.css('borderColor', '');
        $nameValidationMessage.hide();
    }
    });
$email.on('keyup', function(){
    checkEmail($email)
    if ( !(regex_email.test($email.val())) )  {
         $emailValidationMessage.text("Please provide in correct form: example123@email.com").css("font-size","60%").show()
    } else {
        $email.css('borderColor', '');
        $emailValidationMessage.hide();
    }
});
$creditCardNumber.on('keyup', function(){
    checkCreditCardNum($creditCardNumber)
    if ( !(regex_creditCardNumber.test($creditCardNumber.val())) ){
        $creditCardValidationMessage.text("Please provide in correct form: Must be between 13-16 digits").css("color","green").show()
    } else {
        $creditCardNumber.css('borderColor', '');
        $creditCardValidationMessage.hide();
    }
});
$zipCode.on('keyup', function(){
    checkZipCode($zipCode)
    if ( !(regex_zipCode.test($zipCode.val())) ) {
        $zipValidationMessage.text("Please provide in correct form: Must be 5 digits").css("color","green").show();
    } else {
        $zipCode.css('borderColor', '');
        $zipValidationMessage.hide();
    }
});
$cvv.on('keyup', function(){
    checkCVV($cvv)
    if (!(regex_ccv.test($cvv.val()))  ) {
        $cvvValidationMessage.text("Please provide in correct form: Must be 3 digits").css("color","green").show();
    } else {
        $cvv.css('borderColor', '');
        $cvvValidationMessage.hide();
    }
});

 //submitting the form, clearing errors and checking for validity
 $form.addEventListener("submit", function(e) {
     if (validateForm() === false) {
        e.preventDefault();
        console.log('test')
     } else {
        clearError();
     }
 });

