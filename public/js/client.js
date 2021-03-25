/* global TrelloPowerUp */

var GREY_ROCKET_ICON = 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Frocket-ship-grey.png?1496162964717';
var WHITE_ROCKET_ICON = 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Fwhite-rocket-ship.png?1495811896182';
var BLACK_ROCKET_ICON = 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421';



var Promise = TrelloPowerUp.Promise;



window.TrelloPowerUp.initialize({
 
  'card-buttons': function(t, options){
    return [{
      icon: 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421',
      text: 'Estimate Size',
      callback: function(t){
        return t.popup({
          title: "Estimation",
          url: 'estimate.html'
        });
      }
    }];
  },
  

  
  'card-badges': function(t, options) {
    // return t.get('card', 'shared', 'backend_estimate')
    return t.getAll()
    .then(function(estimates) {
      var backend_estimate = estimates["card"]["shared"]["backend_estimate"];
      var frontend_estimate = estimates["card"]["shared"]["frontend_estimate"];
    
      return [{
     
      // icon: 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Frocket-ship-grey.png?1496162964717',
      icon: backend_estimate ? GREY_ROCKET_ICON : null,
      text: backend_estimate ? "Backend: "+ backend_estimate : null,
      color: backend_estimate ? "blue" : null,
    },
    {
      // icon: 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Frocket-ship-grey.png?1496162964717',
      icon: frontend_estimate ? BLACK_ROCKET_ICON : null,
      text: frontend_estimate ? "Frontend: "+ frontend_estimate : null,
      color: frontend_estimate ? "orange" : null,
    }
           
           
           ];
});
  },
  
  
  
  
  'card-detail-badges': function(t, options) {
    // return t.get('card', 'shared', 'backend_estimate')
    return t.getAll()
    .then(function(estimates) {
      var backend_estimate = estimates["card"]["shared"]["backend_estimate"];
      var frontend_estimate = estimates["card"]["shared"]["frontend_estimate"];
    return [
      {
      title: 'Backend Estimate',
      color: backend_estimate ? "blue" : null,
      text: backend_estimate,
      callback: function(t) {
        return t.popup({
          title: "Backend Estimation",
          url: 'estimate.html',
             });
      }
    },
          {
      title: 'Frontend Estimate',
      color: frontend_estimate ? "orange" : null || frontend_estimate != 0 ? "orange" : null ,
      text: frontend_estimate ? frontend_estimate : null || frontend_estimate != 0) 
      callback: function(t) {
        return t.popup({
          title: "Frontend Estimation",
          url: 'estimate.html',
             });
      }
    },
      
    
    ]
  });
  }

});

