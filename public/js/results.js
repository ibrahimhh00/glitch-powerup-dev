var t = TrelloPowerUp.iframe();

var message = Object.values(t.arg("message"));
console.log("message type:", typeof message);
console.log("Message:", message);
if (message) {
  var i,
    x = "";
  for (i = 0; i < message.length; i++) {
    // console.log("i value:", i);
    // console.log("message.length:", message.length);
    console.log("message[i][nameList]", message[i]["nameList"]);

    x =
      x +
      "<br>" +
      "(" +
      message[i]["nameList"] +
      ")" +
      "<p></p> B:" +
      message[i]["value"] +
      "</br>";
    // document.getElementById("value").innerText = message[i]['value'];
  }
  document.getElementById("list").innerHTML = x;
}

// t.render is called when there is an update, here it i used
// If you open the popup via the card button, select a size,
// hit the button, and then re-open the popup, you'll notice that your previous selection isn't initially selected.
// When the iframe loads, we'll want to check to see if there is a value that has already been set,
// and if so pre-select it for our list. Adding this leaves our
t.render(function() {
  console.log("results.js tester");
});

//   return t.getAll()
//     // return t.get('card', 'shared', 'backend_estimate')
//   .then(function(estimates){
//       console.log(Object.keys(estimates["card"]["shared"]));
//       console.log(JSON.stringify(estimates, null, 2));

//     window.backend_estimateSize.value = Object.values(estimates["card"]["shared"]["backend_estimate"]);
//     window.frontend_estimateSize.value = Object.values(estimates["card"]["shared"]["frontend_estimate"]);
//   })

//   .then(function(){
//   t.sizeTo('#backend_estimate').done();
//     });

// });

// var t = TrelloPowerUp.iframe();

// window.backend_estimate.addEventListener('submit', function(event){
//   // Stop the browser trying to submit the form itself.
//   event.preventDefault();
//   return t.set('card', 'shared', window.resourceLabel, window.backend_estimateSize.value)
//   .then(function(){
//     t.closePopup();
//   });
// });

// t.render(function(){

//   return t.get('board', 'shared')
// .then(function (data) {
//   console.log(JSON.stringify(data, null, 2));
// });

//   //   return t.get('card', 'shared', 'backend_estimate')
//   // .then(function(backend_estimate){
//   //   window.backend_estimateSize.value = backend_estimate;
//   // })
//   // .then(function(){
//   // t.sizeTo('#backend_estimate').done();
//   //   });
// });
