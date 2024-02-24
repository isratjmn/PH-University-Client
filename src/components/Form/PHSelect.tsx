import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPHSelectProps = {
	label: string;
	name: string;
	options: { value: string; label: string; disabled?: boolean }[] | undefined;
	disabled?: boolean;
	size: "small" | "middle" | "large";
	mode?: "multiple" | "tags" | undefined;
};
const PHSelect = ({ label, name, options, disabled, mode }: TPHSelectProps) => {
	return (
		<div>
			<Controller
				name={name}
				render={({ field, fieldState: { error } }) => (
					<Form.Item label={label}>
						<Select
							mode={mode}
							style={{ width: "100%" }}
							{...field}
							options={options}
							size="large"
							disabled={disabled}
						/>
						{error && (
							<small style={{ color: "red" }}>
								{error?.message}
							</small>
						)}
					</Form.Item>
				)}
			/>
		</div>
	);
};

export default PHSelect;
