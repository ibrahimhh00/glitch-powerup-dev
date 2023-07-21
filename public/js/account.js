const API_URL = "https://jsonplaceholder.typicode.com/users/";

var t = window.TrelloPowerUp.iframe();

$(document).ready(function () {
  fetchMembers();
});

function fetchMembers() {
  $.ajax({
    url: API_URL,
    type: "GET",
    success: function (data) {
      console.log(data);
      populateMembers(data);
    },
    error: function (error) {
      console.error("Error fetching members", error);
    },
  });
}

function populateMembers(accounts) {
  t.get("card", "shared", "account").then(function (account) {
    let accountIds = account?.map((ms) => ms.accountId);

    const accountsList = $("#accounts");
    accounts?.forEach(function (account) {
      console.log(account.id)
      if (!accountIds?.includes(String(account.id))) {
        const option = `<option value="${account.id}">${account.name}</option>`;
        accountsList.append(option);
      }
    });
  });
}

$("#account").submit(function (event) {
  event.preventDefault();

  const selectedAccountId = $("#accounts").val();
  const selectedAccountName = $("#accounts option:selected").text();
  if(!selectedAccountName) {
    return
  }
  console.log(selectedAccountId, selectedAccountName);
  t.get("card", "shared", "account", {})
    .then(function (account) {
      
      // Now save it back
      return t.set("card", "shared", "account", {accountId: selectedAccountId, accountName: selectedAccountName});
    })
    .then(() => {
      console.log("New account stored.");
      return t.closePopup();
    });
  // t.closePopup();
});
