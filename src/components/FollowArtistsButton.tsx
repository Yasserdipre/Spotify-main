import React, { useState, useEffect } from "react"
import axios from "axios";

interface FollowArtistsProps {
    state: boolean;
  }
  
  const FollowArtistsButton: React.FC<FollowArtistsProps> = ({ state, session }) => {
    const [bibliotecaStatus, setBibliotecaStatus] = useState(state)
    useEffect(() => {
        setBibliotecaStatus(state);
      }, [state]);

      const handleClick = async (operation: string) => {
        setBibliotecaStatus(!bibliotecaStatus);
        // Obtener la URL actual del navegador
        const currentUrl = window.location.href;
        const parsedUrl = new URL(currentUrl);
        const pathname = parsedUrl.pathname;
        const segments = pathname.split("/");
        const id = segments.pop();
    
        try {
            // Realizar la solicitud POST con song.artistId como parámetro
            await axios.post('/api/set-artists-biblioteca', { artistId: id, operation: operation, session: session });
          } catch (error) {
            console.error('Error al enviar la solicitud POST:', error);
          }
      };

    return (
        <>
        
        {bibliotecaStatus ? (
      <button type="button" className="ml-5 border py-1 px-4 rounded-3xl text-base border-gray-100/[.25] hover:border-gray-100 hover:text-lg" onClick={()=> {handleClick("create")}}>Seguir</button>
    ) : (
        <button type="button" className="ml-5 border py-1 px-4 rounded-3xl text-base border-gray-100/[.25] hover:border-gray-100 hover:text-lg" onClick={()=> {handleClick("delete")} }>Siguiendo</button>
    )}
        
        </>
    )
}


export default FollowArtistsButton

