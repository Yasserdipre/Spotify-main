import React, { useState, useEffect } from "react";
import Plus from "@/icons/Plus";
import Check from "@/icons/Check";
import axios from "axios";
import { useStore } from '@/store/bibliotecaStore';

interface AddBibliotecaProps {
  state: boolean;
}

const AddBiblioteca: React.FC<AddBibliotecaProps> = ({ state, session }) => {
  const [bibliotecaStatus, setBibliotecaStatus] = useState(state);
  const { shouldUpdate, setShouldUpdate } = useStore();
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
        await axios.post('/api/set-albumn-biblioteca', { albumnId: id, operation: operation, session: session });
        setShouldUpdate(true)
      } catch (error) {
        console.error('Error al enviar la solicitud POST:', error);
      }
  };

  return (
    <>
      {bibliotecaStatus ? (
        <button
          type="button"
          className="relative top-4 left-3"
          onClick={() => {
            handleClick("create");
          }}
        >
          <Plus className="w-10 h-10"/>
        </button>
      ) : (
        <button
          type="button"
          className="relative top-4 left-3"
          onClick={() => {
            handleClick("delete");
          }}
        >
          <Check className="w-10 h-10"/>
        </button>
      )}
    </>
  );
};

export default AddBiblioteca;
