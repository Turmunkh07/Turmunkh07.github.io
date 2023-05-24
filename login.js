function validate() {
  let username = document.getElementById("username").value;
  let pwd = document.getElementById("password").value;
  if (username == "SE000000" && pwd == "ADA123456") {
    alert("login succesfully");
    location.replace('/ada')
  } else {
    alert("login failed");
  }
}
