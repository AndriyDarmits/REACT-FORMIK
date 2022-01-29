import './App.scss';
import React from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'


function App() {

  //VALIDATION

  const validationsSchema = yup.object().shape({

    name: yup.string()
      .required('Input field can not be empty'),

    password: yup.string()
      .min(8, 'too short password')
      .max(16, 'too long password')
      .required('Password field can not be empty')
      .matches(/[0-9]/, 'Password can only contain number.'),

    confirmPassword: yup.string()
      .min(8, 'too short password')
      .max(16, 'too long password')
      .required('Password confirmation field can not be empty')
      .matches(/[0-9]/, 'Password can only contain number.')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),

    email: yup.string()
      .email('Invalid email')
      .required('Email field can not be empty')

  })



  return (
    <div className="app">
      <Formik
        initialValues={{
          name: '',
          password: '',
          confirmPassword: '',
          email: '',
          confirmEmail: ''
        }}
        validateOnBlur
        onSubmit={(values) => { alert(JSON.stringify(values)) }}
        validationSchema={validationsSchema}
      >
        {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
          <div className="form__block">
          <div className="form">
            <form>
              <label htmlFor="name">Login: </label><br />
              <input
                className='input'
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              /><br />
              <label htmlFor="email">Email: </label><br />
              <input
                className='email'
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              /><br />
              <label htmlFor="password">Password: </label><br />
              <input
                className='password'
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              /><br />
              <label htmlFor="confirmPassword">Confirm password: </label><br />
              <input
                className='confirmPassword'
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
              /><br />
                <div className="error__block">
                  {touched.name && errors.name && <div className="error">{errors.name}</div>}
                  {touched.email && errors.email && <div className="error">{errors.email}</div>}
                  {touched.password && errors.password && <div className="error">{errors.password}</div>}
                  {touched.confirmPassword && errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}</div>
              <button
                disabled={!isValid && !dirty}
                onClick={handleSubmit}
                type='submit'>Відправити</button>
            </form>
          </div>
          </div>

          
        )}
      </Formik>
    </div>
  );
}

export default App;