import { Button, Card, Col, Row } from "antd";
import { FieldValues } from "react-hook-form";

import { useLoginMutation } from "../redux/features/auth/authAPI";
import { useAppDispatch } from "../redux/features/hooks";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utilities/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/Form/PHForm";
import PHInput from "../components/Form/PHInput";


const Login = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const defaultValues = {
		userId: "A-0001",
		password: "1234-asd-asd",
	};
	const [login] = useLoginMutation();
	const onSubmit = async (data: FieldValues) => {
		const toastId = toast.loading("Logging In.......!!!");
		try {
			const userInfo = {
				id: data.userId,
				password: data.password,
			};
			const res = await login(userInfo).unwrap();
			console.log(res);
			const user = verifyToken(res.data.accessToken) as TUser;
			dispatch(
				setUser({
					user: user,
					token: res.data.accessToken,
				})
			);
			toast.success("Logged in successfully!!", {
				id: toastId,
				duration: 2000,
			});
			if (res?.data?.needsPasswordChange) {
				navigate("/change-password");
			} else {
				navigate(`/${user?.role}/dashboard`);
			}
		} catch (error) {
			toast.error("Some Went Wrong", { id: toastId, duration: 2000 });
		}
	};

	return (
		<Row
			justify="center"
			align="middle"
			style={{ height: "100vh", width: "100%" }}
		>
			<Col xs={20} md={12} lg={10} xl={6}>
				<Card style={{ padding: "10px", width: "100%" }}>
					<PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
						<PHInput type="text" name="userId" label="User ID: " />
						<PHInput
							type="text"
							name="password"
							label="Password: "
						/>
						<Button
							type="primary"
							style={{ width: "100%" }}
							htmlType="submit"
						>
							Login
						</Button>
						<span style={{ fontSize: "14px" }}>
							Didn't Register yet!! Please{" "}
							<span
								style={{
									color: "blue",
									fontSize: "12px",
									cursor: "pointer",
								}}
								onClick={() => navigate("/signup")}
							>
								Register
							</span>
						</span>
					</PHForm>
				</Card>
			</Col>
		</Row>
	);
};

export default Login;
