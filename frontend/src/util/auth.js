export function isAuth() {
  const userdata = localStorage.getItem("user-data");
  if (userdata === null || userdata === undefined || userdata === "") {
    return false;
  }
  return true;
}
