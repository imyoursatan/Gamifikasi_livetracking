import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css';

const RegisterForm = ({ onRegisterSuccess }) => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [showSuccessPopup, setShowSuccessPopup] = useState(false);
	const [showInvalidEmailMessage, setShowInvalidEmailMessage] = useState(false);
	const [showRequiredFieldsMessage, setShowRequiredFieldsMessage] =
		useState(false);

	const handleRegister = async () => {
		if (email === '' || username === '' || password === '') {
			setShowRequiredFieldsMessage(true);
			return;
		}

		if (!email.endsWith('@gmail.com')) {
			setShowInvalidEmailMessage(true);
			return;
		}

		try {
			const response = await axios.post('http://localhost:3001/api/register', {
				email,
				username,
				password,
			});

			console.log(response.data);

			setShowSuccessPopup(true);

			setEmail('');
			setUsername('');
			setPassword('');

			setTimeout(() => {
				setShowSuccessPopup(false);
				navigate('/login');
				onRegisterSuccess();
			}, 2000);
		} catch (error) {
			console.error('Registrasi gagal:', error.message);
		}
	};

	return (
		<div className="register-container">
			<div className="register-box">
				<h2 className="register-title">REGISTER</h2>
				<div className="input-group1">
					<label>Email</label>
					<input
						type="email"
						placeholder=""
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					{showInvalidEmailMessage && (
						<p className="error-message">
							Invalid email. Please use a Gmail account.
						</p>
					)}
				</div>
				{showRequiredFieldsMessage && (
					<p className="error-message">
						All fields are required. Please fill in all the fields.
					</p>
				)}
				<div className="input-group2">
					<label>Username</label>
					<input
						type="text"
						placeholder=""
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className="input-group3">
					<label>Password</label>
					<input
						type="password"
						placeholder=""
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="button-group1">
					<button className="create-account-button" onClick={handleRegister}>
						Create Account
					</button>
				</div>
				{showSuccessPopup && (
					<div className="success-popup" id="successPopup">
						<p>Your account has been created!</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default RegisterForm;
