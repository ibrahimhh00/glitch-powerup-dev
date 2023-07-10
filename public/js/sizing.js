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

function populateMembers(members) {
  const membersList = $("#members");
  members.forEach(function (member) {
    const option = `<option value="${member.id}">${member.name}</option>`;
    membersList.append(option);
  });
}

$("#estimate").submit(function (event) {
  event.preventDefault();

  const selectedMemberId = $("#members").val();
  const sizing = $("#estimation-size").val();
  const selectedMemberName = $("#members option:selected").text();
  console.log(selectedMemberId, sizing);
  t.set("card", "shared", "memberSizing", {
    memberId: selectedMemberId,
    memberName: selectedMemberName,
    sizing: sizing,
  })
    .then(() => {
      return t.get("card", "shared", "memberSizing");
    })
    .then((data) => {
      console.log("Retrieved data: ", data);
    })
    .catch((error) => console.log("Error occurred: ", error));
  console.log("saved");
  // t.closePopup();
});
