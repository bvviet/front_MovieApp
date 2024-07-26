import { useForm } from "react-hook-form";
import axios from "axios";
import { Backdrop, Box, Button, Modal, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import logo from "../../../public/logo.png";

const Register = ({ isOpen, onClose, onSwitchToLogin }) => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/auth/sigUp", data);
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
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
            Đăng ký tài khoản VMovie
          </p>

          <p className="w-[240px] text-center text-sm text-[#f33a58] sm:w-[370px]">
            Mỗi người nên sử dụng riêng một tài khoản, tài khoản nhiều người sử
            dụng chung sẽ bị khóa.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "20px" }}>
            <Stack spacing={2}>
              <CustomTextField
                id="outlined-basic-1"
                label="Tên tài khoản"
                variant="outlined"
                {...register("userName", {
                  required: "Tên không được để trống",
                  minLength: {
                    value: 2,
                    message: "Tên bắt buộc phải lớn hơn 2 kí tự",
                  },
                })}
                error={!!errors.userName}
                helperText={errors.userName ? errors.userName.message : null}
              />
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
                Đăng Ký
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
              Bạn đã có tài khoản?
              <p
                className="cursor-pointer text-[#f33a58]"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  onSwitchToLogin();
                }}
              >
                Đăng nhập
              </p>
            </div>

            <p className="cursor-pointer text-[#f33a58] underline decoration-solid">
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

export default Register;
