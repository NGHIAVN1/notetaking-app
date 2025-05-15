import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  Alert,
  Link,
} from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import auth from "../../../api/auth";
import { isAuth } from "../../util/auth";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth()) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission first
    setLoading(true);
    setError("");

    console.log("Attempting login...");
    try {
      const response = await auth(email, password);
      console.log("Login response:", response);

      const data = response.data;
      if (data && data.accessToken) {
        // Store token directly without JSON.stringify
        localStorage.setItem("user-data", data.accessToken);
        console.log("Token stored in localStorage");
        navigate("/");
      } else {
        setError("Invalid response from server");
        localStorage.removeItem("user-data");
      }
    } catch (error) {
      console.log("Login error:", error);
      setError("Thông tin đăng nhập không chính xác");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate("/register");
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
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          boxShadow: 3,
          textAlign: "center",
          borderRadius: "8px",
          padding: "10px",
          flexDirection: "column",
          margin: "10%",
          height: "auto",
          border: "15px",
          width: "400px",
        }}
      >
        <Box>
          <Typography variant="h5" component="h1" gutterBottom>
            Đăng nhập
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          label="Tài khoản"
          placeholder="Tài khoản người dùng"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          fullWidth
          required
          sx={{
            marginTop: "20px",
          }}
        />

        <TextField
          label="Mật khẩu"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Nhập mật khẩu"
          fullWidth
          required
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
            type="submit"
            disabled={loading}
            sx={{ marginTop: "20px", marginBottom: "20px" }}
          >
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </Button>

          <Divider />

          <Box
            sx={{ justifyContent: "center", display: "flex", margin: "20px" }}
          >
            <Typography variant="body2">
              Bạn chưa có tài khoản?{" "}
              <Link
                component="button"
                onClick={handleRegisterClick}
                sx={{ textDecoration: "none" }}
              >
                Đăng ký ngay!
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default LoginPage;
