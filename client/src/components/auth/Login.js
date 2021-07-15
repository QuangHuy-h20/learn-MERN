import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from '../layout/AlertMessage'
const Login = () => {

  //Context
  const { loginUser } = useContext(AuthContext);

  //Local state
  const [isLogin, setIsLogin] = useState({
    username: "",
    password: "",
  });

  const [alert, setAlert] = useState(null);

  const { username, password } = isLogin;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsLogin({
      ...isLogin,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = await loginUser(isLogin);
      if (!loginData.success) {
        setAlert({ type: "danger", message: loginData.message });
        setTimeout(() => setAlert(null), 3000)
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Form className="my-4" onSubmit={handleSubmit}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Button variant="success" type="submit">
            Login
          </Button>
        </Form.Group>
      </Form>
      <p>
        Don't have an account?
        <Link to="/register">
          <Button variant="info" size="sm" className="mx-2">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default Login;
