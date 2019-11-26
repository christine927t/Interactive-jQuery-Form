let totalCost = 0;
const $total = $('<span class="cost">Total: $' + totalCost + '</span>');
$('.activities').append($total);
const $checkboxes = $('.activities input[type="checkbox"]'); // global var to store .options input
$('.activities').on('change', (e) => { // change listener on .activities
 for (let i = 0; i < $checkboxes.length; i++) { // Loop to iterate over all the checkbox inputs
   const clicked = e.target // target main e.target click
   const clickedTime = clicked.dataset.dayAndTime; // clicked time
   const checkboxTime = $checkboxes[i].dataset.dayAndTime; // checkbox data type = time
   const clickedCost = clicked.dataset.cost // clicked data type = cost
   const checkboxCost = $checkboxes[i].dataset.cost; // checkbox type check = cost
   const clickPrice = parseFloat(event.target.dataset.cost.replace('$', '')); // convert clicked price from string to number
   if (clickedTime === checkboxTime && clicked !== $checkboxes[i]) { // check if element clicked has data = time
     if (clicked.checked) { // if clicked checkbox is checked
       $checkboxes[i].disabled = true // disable looped checkboxes of same type
       if ($checkboxes[i].disabled) { // if checkbox [i] is disabled add class 'disable'
         $checkboxes[i].parentNode.classList.add("disable");
       }
     } else { // else remove disabled and disabled classes
       $checkboxes[i].disabled = false // remove disabled attr from looped checkboxes of same type
       $checkboxes[i].parentNode.classList.remove("disable"); // if checkbox [i] is disabled add class 'disable'
     }
   }
   if (clickedCost === checkboxCost && clicked === $checkboxes[i]) { // check if element clicked has cost attrbute
     if (clicked.checked) { // if clicked checkbox is checked
       totalCost = totalCost + clickPrice // if checked then add clickprice to totalPrice
     } else { // if unchecked then deduct clickPrice from totalPrice
       totalCost = totalCost - clickPrice
     }
   }
 }
 // update cost based on user selection and adjust text within .cost element
 $('.cost').text('Total: $' + totalCost);
});
/*