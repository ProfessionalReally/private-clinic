import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';

type PhoneMaskInputProps = {
	inputRef?: (ref: HTMLInputElement | null) => void;
	name: string;
	onChange: (event: { target: { name: string; value: string } }) => void;
};

export const PhoneMaskInput = forwardRef<HTMLInputElement, PhoneMaskInputProps>(
	function PhoneMaskInput(props, ref) {
		const { name, onChange, ...other } = props;

		return (
			<IMaskInput
				{...other}
				definitions={{ '0': /[0-9]/ }}
				inputRef={ref}
				mask='+7 (000) 000-00-00'
				onAccept={(value) => onChange({ target: { name, value } })}
				overwrite
			/>
		);
	},
);
