function validate() {
  let serialNum = document.getElementById("snum").value;
  let pwd = document.getElementById("password").value;
  if (serialNum == "SE000000" && pwd == "ADA123456") {
    alert("login succesfully");
    location.pathname = "https://turmunkh07.github.io/ada"
  } else {
    alert("login failed");
  }
}
