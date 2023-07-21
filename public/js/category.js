const API_URL = "https://jsonplaceholder.typicode.com/users/";

var t = window.TrelloPowerUp.iframe();

$(document).ready(function () {
  fetchCategories();
});

function fetchCategories() {
  $.ajax({
    url: API_URL,
    type: "GET",
    success: function (data) {
      console.log(data);
      populateCategories(data);
    },
    error: function (error) {
      console.error("Error fetching members", error);
    },
  });
}

function populateCategories(categories) {
  t.get("card", "shared", "category").then(function (category) {
    let categoryIds = category?.categoryId;
  console.log(categoryIds)
    const categoriesList = $("#categories");
    categories?.forEach(function (category) {
      console.log(category.id);
      if (!(String(categoryIds) === String(category.id))) {
        const option = `<option value="${category.id}">${category.name}</option>`;
        console.log(true)
        categoriesList.append(option);
      }
    });
  });
}

$("#category").submit(function (event) {
  event.preventDefault();

  const selectedCategoryId = $("#categories").val();
  const selectedCategoryName = $("#categories option:selected").text();
  if (!selectedCategoryName) {
    return;
  }
  console.log(selectedCategoryId, selectedCategoryName);
  t.get("card", "shared", "category", {})
    .then(function (category) {
      // Now save it back
      return t.set("card", "shared", "category", {
        categoryId: selectedCategoryId,
        categoryName: selectedCategoryName,
      });
    })
    .then(() => {
      console.log("New category stored.");
      return t.closePopup();
    });
  // t.closePopup();
});
