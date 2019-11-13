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
