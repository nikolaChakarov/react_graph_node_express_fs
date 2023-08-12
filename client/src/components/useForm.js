import { useState } from 'react';

export const useForm = ({ init, validation, onSubmit }) => {
	const [values, setValues] = useState(init);
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		setValues((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));

		setErrors((prev) => ({
			...prev,
			[e.target.name]: '',
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const errs = validation(values);
		const keys = Object.keys(errs);
		if (keys.length) {
			setErrors(errs);
			return;
		}

		onSubmit(values);
	};

	return { values, errors, setValues, handleChange, handleSubmit };
};
