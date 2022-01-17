const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const selectInput = document.getElementById("select");
const colorInput = document.getElementById("color");
const container = document.getElementById("excelDataTable");

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
};

const getOnClick = () => {
  $.ajax({
    url: "http://localhost:8080/api/users",
    dataType: "json",
    type: "GET",
    success: (res) => {
      let arr = res.users;
      CreateTableFromJSON(arr);
    },
  });
};

getOnClick();
