import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../auth/AuthContext";

export const LoginPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberme: false,
  });

  const { login } = useContext(AuthContext);

  useEffect(() => {
    const localEmail = localStorage.getItem("email");

    if (localEmail) {
      setForm((form) => ({ ...form, rememberme: true, email: localEmail }));
    }
  }, []);

  const onChange = ({ target }) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  const toggleCheck = () => {
    setForm({
      ...form,
      rememberme: !form.rememberme,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (form.rememberme) {
      localStorage.setItem("email", form.email);
    } else {
      localStorage.removeItem("email");
    }

    const ok = await login(form.email, form.password);
    if (!ok) {
      Swal.fire("Error", "verifique usuario y contraseña");
    }
  };
  return (
    <form
      className="login100-form validate-form flex-sb flex-w"
      onSubmit={onSubmit}
    >
      <span className="login100-form-title mb-3">Chat - Ingreso</span>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="row mb-3">
        <div className="col" onClick={toggleCheck}>
          <input
            className="input-checkbox100"
            id="ckb1"
            type="checkbox"
            name="rememberme"
            checked={form.rememberme}
            readOnly
          />
          <label className="label-checkbox100">Recordarme</label>
        </div>

        <div className="col text-right">
          <Link to="/auth/register" className="txt1">
            Crear una cuenta
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button
          className="login100-form-btn"
          disabled={!(form.email && form.password)}
          type="submit"
        >
          Ingresar
        </button>
      </div>
    </form>
  );
};
