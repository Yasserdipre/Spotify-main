import React, { useState } from "react";
import { Lock } from "@/icons/Lock";
import { UserImg } from "@/icons/User";
import { MailEdit } from "@/icons/Mail";
import { ImageEdit } from "@/icons/Image";
import { Next } from "@/icons/Next";
import { Back } from "@/icons/Back";
import LoadingSpinner from "./LoadingSpinner";
import axios from "axios";

const AccountSettings = ({session} : {session : any}) => {
  const [activeSection, setActiveSection] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(session.user)

  const handleBack = () => {
    setActiveSection("");
  };

  const handleSubmit = async (process : any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    const formData = new FormData();
    if (process === "passChange") {
      formData.append(
        "oldPassword",
        document.getElementById("oldpassChange")?.value
      );
      formData.append(
        "newPassword",
        document.getElementById("newpassChange")?.value
      );
      formData.append(
        "session",
        JSON.stringify(session.user)
      )
      formData.append(
        "process",
        "changePassword"
      )

    }
    else if (process === "userChange") {
      formData.append(
        "newUser",
        document.getElementById("newUser")?.value
      );
      formData.append(
        "oldPassword",
        document.getElementById("oldPassword")?.value
      );
      formData.append(
        "session",
        JSON.stringify(session.user)
      )
      formData.append(
        "process",
        "userChange"
      )
    }
    else if (process === "emailChange") {
      console.log("Cambio de email")
    }
    else if (process === "imageChange") {
      console.log("Cambio de imagen")
    }
    try {
      const response = await axios.post("/api/auth/update-password", formData);
      console.log("Peticion Realizada", response);
      setSuccessMessage("Cambiado correctamente");
      setErrorMessage("");
    } catch (error) {
      console.error("Error haciendo petición:", error);
      if (error.response && error.response.status === 400) {
        setErrorMessage("Contraseña incorrecta");
      } else {
        setErrorMessage("Error al cambiar los datos");
      }
      setSuccessMessage("");
    }
  };

  return (
    <div className="w-[50%] mt-5 mx-auto py-4 pb-5 border-2 border-black rounded-md ">
      <h2 className="text-2xl font-bold mb-4 ml-3">Cuenta</h2>

      {activeSection && (
        <button onClick={handleBack} className="text-blue-500 mb-4 flex ml-1">
          <Back/> {"\u200B"}
          
        </button>
      )}

      {!activeSection && (
        <div className="space-y-1">
        <div>
          <div
            onClick={() => setActiveSection("password")}
            className="w-full text-white accnt-color px-2 py-2 text-left flex justify-between items-center cursor-pointer"
          >
            <div className="flex items-center">
              <Lock className="mr-2" />
              Cambiar Contraseña
            </div>
            <Next />
          </div>
        </div>
      
        <div>
          <div
            onClick={() => setActiveSection("username")}
            className="w-full text-white hover:bg-gray-600 px-2 py-2 text-left flex justify-between items-center cursor-pointer"
          >
            <div className="flex items-center">
              <UserImg className="mr-2" />
              Cambiar Usuario
            </div>
            <Next />
          </div>
        </div>
      
        <div>
          <div
            onClick={() => setActiveSection("email")}
            className="w-full text-white hover:bg-gray-600 px-2 py-2 text-left flex justify-between items-center cursor-pointer"
          >
            <div className="flex items-center">
              <MailEdit className="mr-2" />
              Cambiar Correo
            </div>
            <Next />
          </div>
        </div>
      
        <div>
          <div
            onClick={() => setActiveSection("image")}
            className="w-full text-white hover:bg-gray-600 px-2 py-2 text-left flex justify-between items-center cursor-pointer"
          >
            <div className="flex items-center">
              <ImageEdit className="mr-2" />
              Cambiar Imagen
            </div>
            <Next />
          </div>
        </div>
      </div>
      
      )}

      {activeSection === "password" && (
        <form className="space-y-4 px-2">
          {errorMessage && (
          <div className="flex justify-center w-full">
            <div className="bg-red-700 w-[100%] text-white  mb-5 rounded-sm text-center p-2 mt-2">
              {errorMessage}
            </div>
          </div>
        )}

        {successMessage && (
          <div className="flex justify-center w-full">
            <div className="bg-green-500 w-[100%] text-white mb-5 rounded-sm text-center p-2 mt-2">
              {successMessage}
            </div>
          </div>
        )}
          <input
            type="password"
            id="oldpassChange"
            placeholder="Contraseña Actual"
            required
            className="w-full p-2 bg-zinc-700 rounded-sm"
          />
          <input
            type="password"
            id="oldpassChangeSecond"
            placeholder="Confirme Contraseña"
            required
            className="w-full p-2 bg-zinc-700 rounded-sm"
          />
          <input
            type="password"
            id="newpassChange"
            placeholder="Nueva Contraseña"
            required
            className="w-full p-2 bg-zinc-700 rounded-sm"
          />
          
          <div className="flex justify-center">
          {!loading && (
          <button
            type="button"
            className="w-full bg-slate-700 hover:bg-black text-white py-2 rounded"
            onClick={() => handleSubmit("passChange")}
          >
            Enviar
          </button>
          )}

          {loading && <LoadingSpinner  size= "w-8 h-8"/>}
          </div>
        </form>
      )}

      {activeSection === "username" && (
        <form className="space-y-4 px-2">
          {errorMessage && (
          <div className="flex justify-center w-full">
            <div className="bg-red-700 w-[100%] text-white  mb-5 rounded-sm text-center p-2 mt-2">
              {errorMessage}
            </div>
          </div>
        )}

        {successMessage && (
          <div className="flex justify-center w-full">
            <div className="bg-green-500 w-[100%] text-white mb-5 rounded-sm text-center p-2 mt-2">
              {successMessage}
            </div>
          </div>
        )}
          <input
            type="text"
            id="newUser"
            placeholder="Nuevo Usuario"
            required
            className="w-full p-2 bg-zinc-700 rounded-sm"
          />
          <input
            type="password"
            id="oldPassword"
            placeholder="Confirme con la Contraseña"
            required
            autoComplete="off"
            className="w-full p-2 bg-zinc-700 rounded-sm"
          />
          <div className="flex justify-center">
          {!loading && (
          <button
            type="submit"
            className="w-full bg-slate-700 hover:bg-black text-white py-2 rounded"
            onClick={() => handleSubmit("userChange")}
          >
            Enviar
          </button>
          )}

          {loading && <LoadingSpinner  size= "w-8 h-8"/>}
          </div>
        </form>
      )}

      {activeSection === "email" && (
        <form className="space-y-4 px-2">
          <input
            type="email"
            placeholder="Nuevo Correo"
            required
            className="w-full p-2 bg-zinc-700 rounded-sm"
          />
          <input
            type="password"
            placeholder="Confirme con la Contraseña"
            autoComplete="off"
            required
            className="w-full p-2 bg-zinc-700 rounded-sm"
          />
          <div className="flex justify-center">
          {!loading && (
          <button
            type="button"
            className="w-full bg-slate-700 hover:bg-black text-white py-2 rounded"
            onClick={() => handleSubmit("emailChange")}
          >
            Enviar
          </button>
          )}

          {loading && <LoadingSpinner  size= "w-8 h-8"/>}
          </div>
        </form>
      )}

      {activeSection === "image" && (
        <form className="space-y-4 px-2">
          <input
            type="url"
            placeholder="Nueva URL de Imagen"
            required
            className="w-full p-2 bg-zinc-700 rounded-sm"
          />
          <input
            type="password"
            placeholder="Confirme con la Contraseña"
            autoComplete="off"
            required
            className="w-full p-2 bg-zinc-700 rounded-sm"
          />
          <div className="flex justify-center">
          {!loading && (
          <button
            type="button"
            className="w-full bg-slate-700 hover:bg-black text-white py-2 rounded"
            onClick={() => handleSubmit("imageChange")}
          >
            Enviar
          </button>
          )}

          {loading && <LoadingSpinner  size= "w-8 h-8"/>}
          </div>
        </form>
      )}
    </div>
  );
};

export default AccountSettings;
