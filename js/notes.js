/**
 * Treehouse FSJS Techdegree - Project Warm Up
 * Selects and Options - JS
 * Developed by: Robert Manolis - Student Success Specialist
 *               Milwaukie, OR - 2019
 */

"use strict";

// YOUR CODE GOES HERE!!! Do the steps below to complete this challenge

// 1) Hide the "Select a shirt" option tag so your user won't be able to select it or see it in the drop down menu
  // 1a) Target the "Select a shirt" `option` element with a jQuery selector, like so — $('option[value="Select a shirt"]') 
$('option[value="Select a shirt"]').attr('disabled', true).attr('hidden', true);
  // 1b) Use the jQuery `attr()` method to give the "Select a shirt" `option` element the `disabled` and `hidden` attributes
  // NOTE: The `disabled` and `hidden` attributes are boolean attributes, meaning their values are either true or false



// 2) Practice setting the value of the `select` element
  // 2a) Use jQuery to create a variable to store the shirt `select` element, like so: $('#shirt-select-element')
const $shirtSelect = $('#shirt-select-element');
  // 2b) Create a variable to store the `option` elements, like so: $('#shirt-select-element option')
const $shirtOption = $('#shirt-select-element option');
  // 2c) Log the variable to the console to confirm its value
console.log($shirtSelect);
console.log($shirtOption);
  // 2d) Target the second option element with the `option-elements` variable above and the `.eq()` method, like so: shirtOptionElements.eq(1)
$shirtOption.eq(1).attr('selected', 'selected');
  // 2e) Use the `.attr()` method to give the second `option` element the `selected` property
  // 2f) Refresh the browser to see the new value in the `select` element
  // 2g) To change the value of the `select` element again, first use the `.removeAttr()` method to remove the `selected` attribute from the second option, and then use the techniques above to give the selected property to one of the other options, and refresh the browser to see the new value in the `select` element
$shirtOption.eq(1).removeAttr('selected');
$shirtOption.eq(3).attr('selected','selected');



// 3) Updating the selected shirt in the drop down menu should highlight the chosen shirt by adding the "chosen" class name to the shirt `img` element and remove the "chosen" class name from all other `img` elements
  // 3a) Use the `shirt-select-element` variable you created above, and the `.change()` method to add a change event listener to the `select` element
  // 3b) Be sure to pass in the `event` parameter to the change listener's callback function
  // 3c) Inside the listener, log out the value of the `select` element with the `event.target` technique — console.log($(event.target).val());
  // 3d) Target the shirt `img` elements by their class name, "shirt-image", like so — $('.shirt-image') 
  // 3e) Loop over the shirt `img` elements with the`.each()` method
  // 3f) Pass in `i, image` as parameters to the `.each()` method's callback function
  // 3g) Inside the loop, create an if/else statement 
  // 3h) If `($(image).attr('alt') === $(event.target).val())`, use the `addClass()` method to add the 'chosen' class name to the `$(image)`
  // 3i) Else use the `.removeClass()` method to remove 'chosen' class name from the `$(image)`
