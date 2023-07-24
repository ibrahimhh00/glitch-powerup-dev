const API_URL = "https://uxperts-backend-staging.disruptem.com/api/v1/public/trello/accounts";

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
      populateMembers(data.data);
    },
    error: function (error) {
      console.error("Error fetching members", error);
    },
  });
}

function populateMembers(accounts) {
  t.get("card", "shared", "account").then(function (account) {
    let accountIds = account?.accountId;
  console.log(accountIds)
    const accountsList = $("#accounts");
    accounts?.forEach(function (account) {
      console.log(account.id);
      if (!(String(accountIds) === String(account.id))) {
        const option = `<option value="${account.id}">${account.name}</option>`;
        console.log(true)
        accountsList.append(option);
      }
    });
  });
}

$("#account").submit(function (event) {
  event.preventDefault();

  const selectedAccountId = $("#accounts").val();
  const selectedAccountName = $("#accounts option:selected").text();
  if (!selectedAccountName) {
    return;
  }
  console.log(selectedAccountId, selectedAccountName);
  t.get("card", "shared", "account", {})
    .then(function (account) {
      // Now save it back
      return t.set("card", "shared", "account", {
        accountId: selectedAccountId,
        accountName: selectedAccountName,
      });
    })
    .then(() => {
      console.log("New account stored.");
      return t.closePopup();
    });
  // t.closePopup();
});
