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
”Job Role” section
Include a text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
Give the field an id of “other-title,” and add the placeholder text of "Your Job Role".
Note: You'll need to add the "Other" job role input directly into the HTML and hide it initially with JS in order to get this feature to work when JS is disabled, which is a requirement below.
***/

