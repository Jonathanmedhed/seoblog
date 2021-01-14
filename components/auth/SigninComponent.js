import { useState, useEffect } from 'react'
import Router from 'next/router'
import { signin, authenticate, isAuth } from '../../actions/auth'
import Link from 'next/link'
import LoginGoogle from './LoginGoogle'

const SigninComponent = () => {
	const [values, setValues] = useState({
		email: '',
		password: '',
		error: '',
		loading: false,
		message: '',
		showForm: true,
	})

	const { email, password, error, loading, message, showForm } = values

	useEffect(() => {
		isAuth() && Router.push('/')
	}, [])

	const handleSubmit = (e) => {
		e.preventDefault()
		//console.table({ name, email, password, error, loading, message, showForm })
		setValues({ ...values, loading: false, error: false })
		const user = { email, password }

		signin(user).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error, loading: false })
			} else {
				// save user token to cookie
				// save user info to localstorage
				// authenticate user
				authenticate(data, () => {
					if (isAuth() && isAuth().role === 1) {
						Router.push('/admin')
					} else {
						Router.push('/user')
					}
				})
			}
		})
	}

	const handleChange = (name) => (e) => {
		setValues({ ...values, error: false, [name]: e.target.value })
	}

	const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '')
	const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '')
	const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '')

	const signinForm = () => {
		return (
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<input
						value={email}
						onChange={handleChange('email')}
						type="email"
						className="form-control"
						placeholder="Enter your email"
					></input>
				</div>

				<div className="form-group">
					<input
						value={password}
						onChange={handleChange('password')}
						type="password"
						className="form-control"
						placeholder="Enter a password"
					></input>
				</div>

				<div>
					<button className="btn btn-primary">Signin</button>
				</div>
			</form>
		)
	}

	return (
		<>
			{showError()}
			{showLoading()}
			{showMessage()}
			<LoginGoogle />
			{showForm && signinForm()}
			<br />
			<Link href="/auth/password/forgot">
				<a className="btn btn-outline-danger btn-sm">Forgot password</a>
			</Link>
		</>
	)
}

export default SigninComponent
