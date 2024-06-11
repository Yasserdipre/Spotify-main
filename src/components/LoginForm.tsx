import { useState } from "react";
import axios from "axios";
import { signIn } from 'auth-astro/client';

const LoginForm = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true); // Estado para controlar si es el formulario de login o registro
  const [errorLogin, setErrorLogin] = useState("") 

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/auth/login", {  email: email, password: password })
      if (response.status === 200) {
        console.log("ok")
        await signIn('credentials', {redirect: false, id: response.data.id, name: response.data.name, email: response.data.email, password: response.data.password})
        window.location.href = '/';
        setErrorLogin("")
      }
      else {
        console.error("Credenciales Incorrecta")
      }
  } catch (error) {
      console.error("Error Credenciales Incorrecta:", error);
      setErrorLogin("Email o Contraseña Incorrecta")  
  }
  };

  const handleRegister = async () => {
    try {
        const response = await axios.post("/api/auth/register", { name: user, email, password })
        if (response.status === 201) {
          console.log("ok")
          await signIn('credentials', {redirect: false, id: response.data.id, name: response.data.name, email: response.data.email, password: response.data.password})
          window.location.href = '/';
        }
        else {
          console.error("Credenciales Incorrecta")
        }
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        setErrorLogin("Este usuario ya existe")  
    }
}

  const handleToggleForm = () => {
    setIsLoginForm(!isLoginForm);
    setErrorLogin("")
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

      {errorLogin && (
          <div className="flex justify-center w-full">
            <div className="bg-red-700 w-[100%] text-white  mb-5 rounded-sm text-center p-2 mt-2">
              {errorLogin}
            </div>
          </div>
        )}

      <div className="flex flex-col items-center withot-Google-styles">
        <form className="flex flex-col w-full max-w-sm">
          {!isLoginForm && (
            <input
              type="text"
              placeholder="Usuario"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
              className="p-2 mt-2  bg-zinc-700 rounded-sm"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 mt-2 bg-zinc-700  rounded-sm"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-2 mt-2 bg-zinc-700 rounded-sm"
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
