function validate() {
  let username = document.getElementById("username").value;
  let pwd = document.getElementById("password").value;
  if (username == "admin" && pwd == "user") {
    alert("login succesfully");
    location.replace('index.html');
  } else {
    alert("login failed");
  }
}