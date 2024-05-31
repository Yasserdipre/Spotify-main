import React, { useState } from "react";
import { Lock } from "@/icons/Lock";
import { UserImg } from "@/icons/User";
import { MailEdit } from "@/icons/Mail";
import { ImageEdit } from "@/icons/Image";
import { Next } from "@/icons/Next";
import { Back } from "@/icons/Back";

const AccountSettings = () => {
  const [activeSection, setActiveSection] = useState("");

  const handleBack = () => {
    setActiveSection("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Manejar la lógica de envío aquí
    console.log("Formulario enviado");
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
          <input
            type="password"
            placeholder="Contraseña Actual"
            required
            className="w-full p-2 bg-zinc-700 rounded-sm"
          />
          <input
            type="password"
            placeholder="Confirme Contraseña"
            required
            className="w-full p-2 bg-zinc-700 rounded-sm"
          />
          <input
            type="password"
            placeholder="Nueva Contraseña"
            required
            className="w-full p-2 bg-zinc-700 rounded-sm"
          />
          <button
            type="button"
            className="w-full bg-slate-700 hover:bg-black text-white py-2 rounded"
          >
            Enviar
          </button>
        </form>
      )}

      {activeSection === "username" && (
        <form className="space-y-4 px-2">
          <input
            type="text"
            placeholder="Nuevo Usuario"
            required
            className="w-full p-2 bg-zinc-700 rounded-sm"
          />
          <input
            type="password"
            placeholder="Confirme con la Contraseña"
            required
            autoComplete="off"
            className="w-full p-2 bg-zinc-700 rounded-sm"
          />
          <button
            type="submit"
            className="w-full bg-slate-700 hover:bg-black text-white py-2 rounded"
          >
            Enviar
          </button>
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
          <button
            type="button"
            className="w-full bg-slate-700 hover:bg-black text-white py-2 rounded"
          >
            Enviar
          </button>
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
          <button
            type="button"
            className="w-full bg-slate-700 hover:bg-black text-white py-2 rounded"
          >
            Enviar
          </button>
        </form>
      )}
    </div>
  );
};

export default AccountSettings;
