var t = TrelloPowerUp.iframe();



window.backend_estimate.addEventListener('submit', function(event){
  // Stop the browser trying to submit the form itself.
  event.preventDefault();
  return t.set('card', 'shared', 'backend_estimate', window.backend_estimateSize.value)
  .then(function(){
    t.closePopup();
  });
});



// t.render is called when there is an update, here it i used 
// If you open the popup via the card button, select a size, 
// hit the button, and then re-open the popup, you'll notice that your previous selection isn't initially selected. 
// When the iframe loads, we'll want to check to see if there is a value that has already been set, 
// and if so pre-select it for our list. Adding this leaves our 
t.render(function(){
  
    // return t.get('board', 'shared')
//   return t.getAll()
// .then(function (data) {
//   console.log("board return");
//   console.log(data[shared]);
//   console.log(JSON.stringify(data, null, 2));
// });
  
  
  
//     return t.get('card', 'shared', 'backend_estimate')
//   .then(function(backend_estimate){
//       console.log("testtt");
//       console.log(JSON.stringify(backend_estimate, null, 2));
//     window.backend_estimateSize.value = backend_estimate;
//   })
  
//   .then(function(){
//   t.sizeTo('#backend_estimate').done();
//     });
// });


  return t.getAll()
    // return t.get('card', 'shared', 'backend_estimate')
  .then(function(backend_estimate){
      console.log(Object.keys(backend_estimate));
      console.log(JSON.stringify(backend_estimate, null, 2));
    window.backend_estimateSize.value = backend_estimate;
  })
  
  .then(function(){
  t.sizeTo('#backend_estimate').done();
    });


});





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