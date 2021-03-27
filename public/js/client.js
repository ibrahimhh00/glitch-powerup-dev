/* global TrelloPowerUp */

var GREY_ROCKET_ICON = 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Frocket-ship-grey.png?1496162964717';
var WHITE_ROCKET_ICON = 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Fwhite-rocket-ship.png?1495811896182';
var BLACK_ROCKET_ICON = 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421';

var BACKEND_ICON = 'https://cdn.glitch.com/aef55bcb-cec2-438b-98c0-959249969810%2Fworksheet-number-monochrome-b-classroom.jpg?v=1616731943091';
// var FRONTEND_ICON 
var ROCKET_ICON = 'https://cdn.glitch.com/aef55bcb-cec2-438b-98c0-959249969810%2Fc69415fd-f70e-4e03-b43b-98b8960cd616_white-rocket-ship.png?v=1616729876518';

var Promise = TrelloPowerUp.Promise;


var onBtnClick = function (t, opts) {
  // console.log('Someone clicked the button');
  return t.popup({
    title: 'Snooze Card',
    items: function(t, options) {
      
    // t.lists("all").get("")  
      
      
//           return t.lists("all").then(function (lists) {
//       console.log(JSON.stringify(lists, null, 2));
            
//              return t.get("5f53e15a6bb8a9122694687f", "shared","backend_estimate").then(function (estimate) {
//               console.log("estimate is:", estimate)
//             });
//     });

                return t.lists("cards").then(function (ids) {
      console.log("ids are:", ids);
            
                });
       
      
       // return t.getAll().then(function (estimate) {
       //    console.log("estimate is:", estimate)
       //  });
      
      
    //    return t.cards("id","idList","name","badges","customFieldItems","coordinates","pos").then(function (cards) {
    //   console.log(JSON.stringify(cards, null, 2));
    // });
      
    //  return t.board("id", "name","customFields").then(function (board) {
    //   console.log(JSON.stringify(board, null, 2));
    // });
      
    }
  });
};

window.TrelloPowerUp.initialize({
    
   'board-buttons': function (t, opts) {
    return [{
      // we can either provide a button that has a callback function
      icon: {
        dark: WHITE_ROCKET_ICON,
        light: BLACK_ROCKET_ICON
      },
      text: 'Callback',
      callback: onBtnClick,
      condition: 'always'
    }, 
    //         {
    //   // or we can also have a button that is just a simple url
    //   // clicking it will open a new tab at the provided url
    //   icon: {
    //     dark: WHITE_ROCKET_ICON,
    //     light: BLACK_ROCKET_ICON
    //   },
    //   text: 'URL',
    //   condition: 'always',
    //   url: 'https://trello.com/inspiration',
    //   target: 'Inspiring Boards' // optional target for above url
    // }
           
           ];
  },
 
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
      icon: backend_estimate == null || backend_estimate == 0 ?  null : BLACK_ROCKET_ICON,
      text: backend_estimate == null || backend_estimate == 0 ?  null : "B: "+ backend_estimate,
      color: backend_estimate == null || backend_estimate == 0 ? null : "blue",
    },
    {
      // icon: 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Frocket-ship-grey.png?1496162964717',
      icon: frontend_estimate == null || frontend_estimate == 0 ? null : BLACK_ROCKET_ICON,
      text: frontend_estimate == null || frontend_estimate == 0 ? null : "F: "+ frontend_estimate,
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

