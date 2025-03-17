import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  Link,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Alert,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { signup } from "../../../api/auth";

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    signup(formData)
      .then((res) => {
        <Alert severity="success">
          {" "}
          Bạn đã đăng ký tài khoản thành côngc.
        </Alert>;
        const data = res.data;
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });

    e.preventDefault();

    // Simple validation
    const newErrors = {};
    if (!formData.username)
      newErrors.username = "Tên đăng nhập không được để trống!";
    if (!formData.email) newErrors.email = "Email không được để trống!";
    if (!formData.password)
      newErrors.password = "Mật khẩu không được để trống!";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp!";
    }
    if (!agreeTerms)
      newErrors.terms = "Bạn chắc chắn phải đồng ý điều khoản người dùng.";

    setErrors(newErrors);

    // If no errors, proceed with registration
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
      // Here you would call your API to register the user
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Box
        id="register-form"
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          boxShadow: 3,
          textAlign: "center",
          padding: "24px",
          flexDirection: "column",
          maxHeight: "600px",
          margin: "10%",
          borderRadius: "8px",
          width: "400px",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Đăng Ký
        </Typography>

        <TextField
          label="Tên tài khoản"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.username}
          helperText={errors.username}
        />

        <TextField
          label="Địa chỉ email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email}
        />

        <TextField
          label="Mật khẩu"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password}
        />

        <TextField
          label="Xác nhận mật khẩu"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
          }
          label="Tôi đồng ý với điều khoản trên"
        />
        {errors.terms && <FormHelperText error>{errors.terms}</FormHelperText>}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
        >
          Xác Nhận Đăng Ký
        </Button>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="body2">
            Bạn đã có tài khoản?{" "}
            <NavLink to="/login" style={{ textDecoration: "none" }}>
              Đăng nhập ngay!
            </NavLink>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default RegisterPage;
