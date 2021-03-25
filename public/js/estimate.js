var t = TrelloPowerUp.iframe();

window.estimate.addEventListener('submit', function(event){
  // Stop the browser trying to submit the form itself.
  event.preventDefault();
  return t.set('card', 'shared', 'backend_estimate', window.estimateSize.value)
  .then(function(){
    t.closePopup();
  });
});

t.render(function(){
  
    return t.get('card', 'shared', 'backend_estimate')
  .then(function(backend_estimate){
    window.estimateSize.value = backend_estimate;
  })
  .then(function(){
  t.sizeTo('#backend_estimate').done();
    });
});