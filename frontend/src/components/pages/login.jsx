import {
  Box,
  Button,
  Divider,
  Grid2,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import auth from "../../../api/auth";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    console.log("handle login");
    auth(email, password)
      .then(function (response) {
        console.log(response);
        alert("Đăng nhập thành công ");
        const data = response.data;
        console.log(data);
        if (data) {
          let token = data.accessToken;
          localStorage.setItem("user-data", JSON.stringify(token));
          // navigate("/");
        } else {
          localStorage.removeItem("user-data");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Thông tin đăng nhập không chính xác");
      });

    e.preventDefault();

    // return userData;
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <Box
        id="login-form"
        component={"form"}
        sx={{
          display: "flex",
          boxShadow: 3,
          textAlign: "center",
          borderRadius: "8px",
          padding: "10px",
          flexDirection: "column",
          margin: "10%",
          height: "400px",
          border: "15px",
          width: "400px",
        }}
      >
        <Box>
          <Typography variant="h5" component="h1" gutterBottom>
            Đăng nhập
          </Typography>
        </Box>
        <TextField
          label="Tài khoản"
          placeholder="Tài khoản người dùng "
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          sx={{
            marginTop: "20px",
          }}
        />

        <TextField
          label="Mật khẩu"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nhập mật khẩu"
          fullWidth
          sx={{
            marginTop: "20px",
          }}
        />
        <Box
          sx={{ justifyContent: "flex-end", display: "flex", margin: "2px" }}
        ></Box>

        <Box>
          <Button
            variant="contained"
            fullWidth
            sx={{ marginTop: "20px", marginBottom: "20px" }}
            onClick={handleSubmit}
          >
            Đăng nhập
          </Button>

          <Divider />

          <Box
            sx={{ justifyContent: "center", display: "flex", margin: "20px" }}
          >
            <Typography variant="body2">
              Bạn chưa có tài khoản?{" "}
              <NavLink to="/register" style={{ textDecoration: "none" }}>
                Đăng ký ngay!
              </NavLink>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default LoginPage;
