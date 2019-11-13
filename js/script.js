//global variables
let total = 0;
const nameInput = $('#name');
const emailInput = $('#email');
const titleInput = $('#title');
const sizeInput = $('#size');
const designInput = $('#design');
const colorInput = $('#color');
const activitiesCheckboxes = $('.activities input');
const paymentInput = $('#payment')
const paymentOptions = $("#payment option");
const creditCardDiv = $('#credit-card');
const creditCardNumberInput = $('#cc-num');
const zipCodeInput = $('#zip');
const cvvInput = $('#cvv');
// const payPal = payment.attr("id", "paypal");
// const bitCoin = payment.attr("id", "bitcoin");

/***
    Sets focus on the first text field
    When the page first loads, the first text field should be in focus by default.
***/
nameInput.focus();

/***
    "Job Role" section
    Included a text field with id of “other-title" and the placeholder text of "Your Job Role" to index.html, and with the following code it be revealed when the "Other" option is selected from the "Job Role" drop down menu.
***/
$('#other-title').hide(); //To make sure at start we do not have the other title field showing.
titleInput.change(function() {
    if($(this).val() === "other") {
        $('#other-title').show();
    }
    else {
        $('#other-title').hide();
    }
});

