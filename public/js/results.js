var t = window.TrelloPowerUp.iframe();

t.render(function(){
    var data = t.arg('message');
    var container = document.getElementById('card-container');

    // Check if data is an array
    if(Array.isArray(data)) {
      data.forEach(function(item){
          var div = document.createElement('div');
          div.textContent = item.listName + ': ' + item.totalPoints + ', ' + JSON.stringify(item.categoryPoints);
          container.appendChild(div);
      });

      return t.sizeTo('#card-container');
    } else {
      console.log("Received data is not an array:", data);
    }
});
