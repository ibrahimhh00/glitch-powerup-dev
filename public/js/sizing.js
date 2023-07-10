const API_URL = "https://jsonplaceholder.typicode.com/users/";

$(document).ready(function() {
  fetchMembers();
})

function fetchMembers() {
  $.ajax({
    url: API_URL,
    type: "GET",
    success: function(data) {
      console.log(data)
      populateMembers(data);
    },
    error: function(error) {
    console.error("Error fetching members", error)
    }
  });
}

function populateMembers(members) {
  const membersList = $('#members')
  members.forEach(function(member) {
    const option = `<option value="${member.id}">${member.name}</option>`;
    membersList.append(option)
  })
}