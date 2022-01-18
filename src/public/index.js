const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const selectInput = document.getElementById("select");
const colorInput = document.getElementById("color");
const submit = document.getElementById("submit");
const searchInput = document.getElementById("search-input");
const searchSubmit = document.getElementById("search-submit");
const removeInput = document.getElementById("remove-input");
const removeSubmit = document.getElementById("remove-submit");

const postOnClick = () => {
  const name = nameInput.value;
  const phone = phoneInput.value;
  const select = selectInput.value;
  const color = colorInput.value;
  $.ajax({
    type: "POST",
    url: "/send",
    data: { name: name, phone: phone, select: select, color: color },
    success: (data) => {
      console.log("message", data.message);
    },
    error: (jqXHR, textStatus, err) => {
      alert(`text status ${textStatus} err ${err}`);
    },
  });
  setTimeout(() => {
    getOnClick("http://localhost:8080/api/users");
  }, 500);
};

const getOnClick = (url) => {
  $.ajax({
    url: url,
    dataType: "json",
    type: "GET",
    success: (res) => {
      if (!res.users) {
        let arr = [res];
        CreateTableFromJSON(arr);
      } else {
        let arr = res.users;
        CreateTableFromJSON(arr);
      }
    },
    error: (jqXHR, textStatus, err) => {
      alert("Cannot find register");
    },
  });
};

const deleteOnClick = (url) => {
  $.ajax({
    url: url,
    type: "DELETE",
    success: (res) => {
      console.log("Element successfully removed");
    },
    error: (jqXHR, textStatus, err) => {
      alert(`text status ${textStatus} err ${err}`);
    },
  });
  setTimeout(() => {
    getOnClick("http://localhost:8080/api/users");
  }, 500);
};

getOnClick("http://localhost:8080/api/users");
submit.onclick = () => postOnClick();
searchSubmit.onclick = () =>
  getOnClick(`http://localhost:8080/api/users/${searchInput.value}`);
removeSubmit.onclick = () =>
  deleteOnClick(`http://localhost:8080/api/users/${removeInput.value}`);
