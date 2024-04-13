/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Row } from "antd";

import PHForm from "../components/Form/PHForm";
import PHInput from "../components/Form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useChangePassswordMutation } from "../redux/features/admin/userManagement.api";
import { TResponse } from "../types";
import { useAppDispatch } from "../redux/features/hooks";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/features/auth/authSlice";

const ChangePassword = () => {
	const [ChangePasssword] = useChangePassswordMutation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const res = (await ChangePasssword(data)) as TResponse<any>;
		console.log(res?.data?.success);
		if (res?.data?.success) {
			dispatch(logout());
			// return <Navigate to="/login" replace />
			navigate("/login");
		}
	};

	return (
		<Row justify="center" align="middle" style={{ height: "100vh" }}>
			<Col span={5} style={{ backgroundColor: "#FAF9F8" }}>
				<Card
					title="Change Password"
					headStyle={{ fontWeight: 700 }}
					style={{ width: 400 }}
				>
					<PHForm onSubmit={onSubmit}>
						<PHInput
							type="text"
							name="oldPassword"
							label="Previous Password: "
						/>
						<PHInput
							type="text"
							name="newPassword"
							label="New Password: "
						/>
						<Button type="primary" htmlType="submit">
							Login
						</Button>
					</PHForm>
				</Card>
			</Col>
		</Row>
	);
};

export default ChangePassword;
