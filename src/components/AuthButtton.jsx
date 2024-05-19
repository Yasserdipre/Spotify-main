import { signOut } from "auth-astro/client";
import { useState } from "react";

function SignOutButton({ session, rol }) {
    let letter = session?.user?.name?.charAt(0);
    if (letter && isNaN(parseInt(letter))) {
      letter = letter.toUpperCase();
    }
  
    const [isCollapsed, setIsCollapsed] = useState(true);
  
    const handleSignOut = async () => {
      try {
        await signOut();
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    };
  
    return (
      <div className="relative z-10 w-64">
        <button 
          className="bg-zinc-900 rounded-full w-14 h-14 flex items-center justify-center absolute right-0"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <span className="text-center text-3xl w-full h-full pt-3">{letter}</span>
        </button>
        {!isCollapsed && (
          <div className="absolute bg-zinc-900 mt-16 w-full rounded-md text-center px-0 mx-0 z-20">
            <a href="/personal/account" className="w-full h-full">
            <button className="hover:bg-zinc-800 w-full rounded-md py-2">Cuenta</button>
            </a>

            <a href="/personal/perfil" className="w-full h-full">
            <button className="hover:bg-zinc-800 w-full rounded-md py-2">Perfil</button>
            </a>

            {rol === "admin" && (
              <a href="/upload" className="w-full h-full">
              <button className="hover:bg-zinc-800 w-full rounded-md py-2">Subir Música</button>
              </a>
            )}

            
            
            <button onClick={handleSignOut} className="hover:bg-zinc-800 w-full rounded-md py-2">Cerrar Sesión</button>
          </div>
        )}
      </div>
    );
  }
  
  export default SignOutButton;