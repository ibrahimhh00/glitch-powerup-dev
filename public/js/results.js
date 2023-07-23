var t = TrelloPowerUp.iframe();

t.render(function () {
  var data = t.arg("message");
  var container = document.getElementById("card-container");

  data.forEach(function (item) {
    var div = document.createElement("div");
    div.textContent = item.nameList + ": " + item.value + ", " + item.value2;
    container.appendChild(div);
  });

  return t.sizeTo("#card-container");
});
