import { useForm } from "react-hook-form";
import axios from "axios";
import { Backdrop, Box, Button, Modal, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import logo from "../../../public/logo.png";
import { useEffect } from "react";

const Login = ({ handleOpenLogin, onCloseLogin, onSwitchToRegister }) => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/auth/login", data);
      localStorage.setItem("token", res.data.token);
      // Chuyển hướng người dùng đến trang xác thực của TMDB
      window.location.href = `https://www.themoviedb.org/authenticate/${res.data.token}?redirect_to=http://localhost:5173/`;
    } catch (error) {
      console.log(error);
    }
  };

  const CallbackPage = () => {
    useEffect(() => {
      const fetchSession = async () => {
        const requestToken = localStorage.getItem("token");
        if (requestToken) {
          try {
            const sessionRes = await axios.post(
              "https://api.themoviedb.org/3/authentication/session/new",
              { request_token: requestToken },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MGZiNGQ3Mjk1NGQ5ZWU2NDBkNjdhNjM3MjQzZDRiNyIsIm5iZiI6MTcyMTAzOTk4OS40MzkxNDIsInN1YiI6IjY2OTRmYjdlZmY3M2RhMWRjZWFkNjljZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QB9xg_iDHK5PYkwZX_1XT4wPjUOxyiq60BF2fw9b1Ak`,
                },
              },
            );
            const sessionId = sessionRes.data.session_id;
            localStorage.setItem("session_id", sessionId);
            // Chuyển hướng hoặc thực hiện hành động khác sau khi tạo session ID
          } catch (error) {
            console.log(error);
          }
        }
      };

      fetchSession();
    }, []);
  };
  CallbackPage();
  return (
    <Modal
      open={handleOpenLogin}
      onClose={onCloseLogin}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Box sx={style}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ marginTop: "0" }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <img src={logo} alt="" style={{ width: "40px" }} />
          </Typography>
          <p
            className="my-4 text-[16px] font-bold sm:text-[1.8rem]"
            id="modal-modal-description"
          >
            Đăng nhập vào VMovie
          </p>

          <p className="w-[240px] text-center text-sm text-red-400 sm:w-[370px]">
            Mỗi người nên sử dụng riêng một tài khoản, tài khoản nhiều người sử
            dụng chung sẽ bị khóa.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "20px" }}>
            <Stack spacing={2}>
              <CustomTextField
                type="email"
                id="outlined-basic-2"
                label="Email"
                variant="outlined"
                {...register("email", {
                  required: "Email không được để trống",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Email không hợp lệ",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : null}
              />
              <CustomTextField
                id="outlined-basic-3"
                label="Mật khẩu"
                type="password"
                variant="outlined"
                {...register("password", {
                  required: "Mật khẩu không được để trống",
                  minLength: {
                    value: 6,
                    message: "Mật khẩu bắt buộc phải lớn hơn 6 kí tự",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : null}
              />
            </Stack>
            <Stack sx={{ marginTop: "20px", width: "100%" }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  fontSize: "12px",
                  borderRadius: "999px",
                  padding: "10px",
                }}
              >
                Đăng Nhập
              </Button>
            </Stack>
          </form>

          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={"8px"}
            sx={{ marginTop: "20px" }}
          >
            <div className="flex gap-2">
              Bạn chưa có tài khoản?
              <p
                className="cursor-pointer text-red-400"
                onClick={(e) => {
                  e.preventDefault();
                  onCloseLogin();
                  onSwitchToRegister();
                }}
              >
                Đăng Ký
              </p>
            </div>

            <p className="cursor-pointer text-red-400 underline decoration-solid">
              Quên mật khẩu?
            </p>

            <p className="w-[260px] text-center text-[13px] text-[#666] sm:w-[370px]">
              Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với
              điều khoản sử dụng của chúng tôi.
            </p>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%", // Thay đổi kích thước thành % để phù hợp với màn hình nhỏ hơn
  maxWidth: "540px", // Giới hạn chiều rộng tối đa
  height: "auto", // Chiều cao tự động theo nội dung
  background: "#d8e7f5",
  boxShadow: 24,
  p: 4,
  borderRadius: "16px",
  animationDuration: ".3s",
  overflowY: "auto",
};

const CustomTextField = styled(TextField)`
  && {
    & .MuiInputLabel-root {
      font-size: 12px;
      font-weight: 500;
      color: #000;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 13px;
    }
    & .MuiOutlinedInput-root {
      border-radius: 44px;
      background-color: #fff;
      width: 100%;
      width: 370px;
    }
    & label.Mui-focused {
      color: #1dbfaf;
    }
    & .MuiInput-underline:after {
      border-bottom-color: #1dbfaf;
    }
    & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: #1dbfaf;
    }
    & .MuiInputBase-input {
      height: auto;
      padding: 10px;
    }
    & .MuiFormHelperText-root {
      color: #f33a58;
      margin-left: 8px;
      font-weight: 500;
      line-height: 1.5;
    }

    @media (max-width: 600px) {
      & .MuiInputLabel-root {
        font-size: 14px;
      }
      & .MuiOutlinedInput-root {
        width: 300px;
      }
    }
  }
`;

export default Login;
