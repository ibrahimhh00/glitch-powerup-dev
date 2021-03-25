// var t = TrelloPowerUp.iframe();

// window.backend_estimate.addEventListener('submit', function(event){
//   // Stop the browser trying to submit the form itself.
//   event.preventDefault();
//   return t.set('card', 'shared', 'backend_estimate', window.backend_estimateSize.value)
//   .then(function(){
//     t.closePopup();
//   });
// });

// t.render(function(){
  
//     return t.get('card', 'shared', 'backend_estimate')
//   .then(function(backend_estimate){
//     window.backend_estimateSize.value = backend_estimate;
//   })
//   .then(function(){
//   t.sizeTo('#backend_estimate').done();
//     });
// });

var t = TrelloPowerUp.iframe();

window.backend_estimate.addEventListener('submit', function(event){
  // Stop the browser trying to submit the form itself.
  event.preventDefault();
  return t.set('card', 'shared', window.resourceLabel, window.backend_estimateSize.value)
  .then(function(){
    t.closePopup();
  });
});

t.render(function(){
  
    return t.get('card', 'shared', 'backend_estimate')
  .then(function(backend_estimate){
    window.backend_estimateSize.value = backend_estimate;
  })
  .then(function(){
  t.sizeTo('#backend_estimate').done();
    });
});