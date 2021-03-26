/* global TrelloPowerUp */

var GREY_ROCKET_ICON = 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Frocket-ship-grey.png?1496162964717';
var WHITE_ROCKET_ICON = 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Fwhite-rocket-ship.png?1495811896182';
var BLACK_ROCKET_ICON = 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421';

var BACKEND_ICON = 'https://cdn.glitch.com/aef55bcb-cec2-438b-98c0-959249969810%2Fworksheet-number-monochrome-b-classroom.jpg?v=1616731943091';
// var FRONTEND_ICON 
var ROCKET_ICON = 'https://cdn.glitch.com/aef55bcb-cec2-438b-98c0-959249969810%2Fc69415fd-f70e-4e03-b43b-98b8960cd616_white-rocket-ship.png?v=1616729876518';

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
      icon: backend_estimate == null || backend_estimate == 0 ?  null : BACKEND_ICON,
      text: backend_estimate == null || backend_estimate == 0 ?  null : backend_estimate,
      color: backend_estimate == null || backend_estimate == 0 ? null : "orange",
    },
    {
      // icon: 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Frocket-ship-grey.png?1496162964717',
      icon: frontend_estimate == null || frontend_estimate == 0 ? null : BLACK_ROCKET_ICON,
      text: frontend_estimate == null || frontend_estimate == 0 ? null : "Frontend: "+ frontend_estimate,
      color: frontend_estimate == null || frontend_estimate == 0 ? null : "orange",
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
      color: backend_estimate == null || backend_estimate == 0 ? null: "blue" ,
      text: backend_estimate == null || backend_estimate == 0 ? null : backend_estimate,
      callback: function(t) {
        return t.popup({
          title: "Backend Estimation",
          url: 'estimate.html',
             });
      }
    },
          {
      title: 'Frontend Estimate',
      color: frontend_estimate == null || frontend_estimate == 0 ? null : "orange" ,
      text: frontend_estimate == null ||  frontend_estimate == 0 ?  null : frontend_estimate,
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

