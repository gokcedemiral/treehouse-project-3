//global variables
let total = 0;
const $nameInput = $('#name');
const $emailInput = $('#email');
const $titleInput = $('#title');
const $sizeInput = $('#size');
const $designSelect = $('#design');
const $colorSelect = $('#color');
const $activitiesCheckboxes = $('.activities input');
const $paymentInput = $('#payment')
const $paymentOptions = $("#payment option");
const $creditCardDiv = $('#credit-card');
const $creditCardNumberInput = $('#cc-num');
const $zipCodeInput = $('#zip');
const $cvvInput = $('#cvv');
// const payPal = payment.attr("id", "paypal");
// const bitCoin = payment.attr("id", "bitcoin");

/***
    Sets focus on the first text field
    When the page first loads, the first text field should be in focus by default.
***/
$nameInput.focus();

/***
    "Job Role" section
    Included a text field with id of “other-title" and the placeholder text of "Your Job Role" to index.html, and with the following code it be revealed when the "Other" option is selected from the "Job Role" drop down menu.
***/
$('#other-title').hide(); //To make sure at start we do not have the other title field showing.
$titleInput.change(function() {
    if($(this).val() === "other") {
        $('#other-title').show();
    }
    else {
        $('#other-title').hide();
    }
});

/***
"T-Shirt Info" section
    When a selection for a theme is not made the color field is disabled and only reads 'Please select a T-shirt theme'.
    When a selection for a theme is made the color options match the selection and is updated dynamically.
***/

if ( $designSelect.val() === 'Select Theme' ) { //Color options disabled thus no options appear, field reads 'Please select a T-shirt theme'.
    $colorSelect.prepend('<option value="disabled">Please select a T-shirt theme.</option>')
    $colorSelect.val('disabled');
    $colorSelect.attr('disabled', true);
}
$designSelect.change(() => {
    $colorSelect.removeAttr("disabled");
    $('#color option[value="disabled"]').hide();

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

        //If the user selects the empty option for selecting theme, the color dropdown is again disabled and shows only the message.
    } else if ($designSelect.val() === 'Select Theme') {
        $('#color option[value="disabled"]').show();
        $colorSelect.val('disabled');
        $colorSelect.attr('disabled', true);
    }
})
