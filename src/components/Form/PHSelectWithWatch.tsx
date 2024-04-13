/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Select } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type TPHSelectProps = {
	label: string;
	name: string;
	options: { value: string; label: string; disabled?: boolean }[] | undefined;
	disabled?: boolean;
	size: "small" | "middle" | "large";
	mode?: "multiple" | "tags" | undefined;
	onValueChange: React.Dispatch<React.SetStateAction<string>>;
};
const PHSelectWithWatch = ({
	label,
	name,
	options,
	disabled,
	mode,
	onValueChange,
}: TPHSelectProps) => {
	const { control } = useFormContext();
	const inputValue = useWatch({ control, name });
	useEffect(() => {
		onValueChange(inputValue);
	}, [inputValue]);

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

export default PHSelectWithWatch;
