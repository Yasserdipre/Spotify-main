import { useState } from "react";
import axios from "axios";
import { signIn } from 'auth-astro/client';

const LoginForm = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true); // Estado para controlar si es el formulario de login o registro
  

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/auth/login", {  email: email, password: password })
      if (response.status === 200) {
        console.log("ok")
        await signIn('credentials', {redirect: false})
        window.location.href = '/';
      }
      else {
        console.error("Credenciales Incorrecta")
      }
  } catch (error) {
      console.error("Error al registrar usuario:", error);  
  }
  };

  const handleRegister = async () => {
    try {
        const response = await axios.post("/api/auth/register", { name: user, email, password })

    } catch (error) {
        console.error("Error al registrar usuario:", error);  
    }
}

  const handleToggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <>
      <div className="flex w-full text-white">
        <div className="mx-auto flex">
          <h4>{isLoginForm ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}</h4>
          <span className="ml-3">
            <button type="button" onClick={handleToggleForm}>
              {isLoginForm ? "Registrate" : "Iniciar sesión"}
            </button>
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <form className="flex flex-col w-full max-w-sm">
          {!isLoginForm && (
            <input
              type="text"
              placeholder="Usuario"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
              className="p-2 mt-2 text-black"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 mt-2 text-black"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-2 mt-2 text-black"
          />

            {isLoginForm ? 
            <button type="button" onClick={handleLogin} className="bg-blue-500 p-2 mt-2 text-white hover:bg-blue-500/40">Login</button> 
            : 
            <button type="button" title={isLoginForm ? "Login" : "Registrarse"} onClick={handleRegister} className="bg-blue-500 p-2 mt-2 text-white hover:bg-blue-500/40">Registrate</button>}
        </form>
      </div>
    </>
  );
};

export default LoginForm;
