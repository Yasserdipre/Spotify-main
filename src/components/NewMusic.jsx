import React, { useState } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

const UploadMusicForm = () => {
  const [formType, setFormType] = useState("");
  

  const toggleFormType = (type) => {
    setFormType((prevType) => (prevType === type ? "" : type));
  };

  const renderForm = () => {
    switch (formType) {
      case "artist":
        return <ArtistForm />;
      case "album":
        return <AlbumForm />;
      case "song":
        return <SongForm />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h1 className="text-center mt-10 mb-5">Subir Música</h1>
      <div className="flex justify-center w-full">
        <div className="inline-grid grid-cols-1 gap-4 w-96 mb-16">
          <button
            className="bg-black hover:bg-black/40 p-5"
            onClick={() => toggleFormType("artist")}
          >
            Agregar Artista
          </button>
          <button
            className="bg-slate-700 hover:bg-slate-700/40 p-5"
            onClick={() => toggleFormType("album")}
          >
            Agregar Álbum
          </button>
          <button
            className="bg-neutral-800 hover:bg-neutral-800/40 p-5"
            onClick={() => toggleFormType("song")}
          >
            Agregar Canción
          </button>
        </div>
      </div>
      {renderForm()}
    </div>
  );
};

const ArtistForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    const formData = new FormData();
    formData.append(
      "artistName",
      document.getElementsByName("artistName")[0].value
    );
    formData.append(
      "artistImage",
      document.getElementsByName("artistImage")[0].value
    );
    formData.append(
      "genreArtist",
      document.getElementsByName("genreArtist")[0].value
    );
    console.log(formData.get("artistName"));

    try {
      const response = await axios.post("/api/create-artist", formData);
      console.log("Artista subido con éxito", response);
      setSuccessMessage("Artista creado correctamente");
      setErrorMessage("");
    } catch (error) {
      console.error("Error subiendo artista:", error);
      if (error.response && error.response.status === 400) {
        setErrorMessage("El artista ya existe");
      } else {
        setErrorMessage("Error al subir el artista");
      }
      setSuccessMessage("");
    }
  };

  return (
    <>
      <form>
        {errorMessage && (
          <div className="flex justify-center w-full">
            <div className="bg-red-700 w-[49%] text-white  mb-5 rounded-sm text-center p-2 mt-2">
              {errorMessage}
            </div>
          </div>
        )}

        {successMessage && (
          <div className="flex justify-center w-full">
            <div className="bg-green-500 w-[49%] text-white mb-5 rounded-sm text-center p-2 mt-2">
              {successMessage}
            </div>
          </div>
        )}

        <div className="flex justify-center w-full">
          <div className="inline-grid grid-cols-4 gap-4 w-[49%]">
            <label className="mt-2">Nombre del Artista:</label>
            <input
              name="artistName"
              className="py-2 bg-zinc-600 rounded-md pl-1"
              type="text"
              required
            />
            <label className="mt-2">Imagen del Artista:</label>
            <input
              name="artistImage"
              className="py-2 bg-zinc-600 rounded-md pl-1"
              type="text"
              required
            />
            <label className="mt-2">Género:</label>
            <input
              name="genreArtist"
              className="py-2 bg-zinc-600 rounded-md pl-1"
              type="text"
              required
            />
          </div>
        </div>
        <div className="flex justify-center w-full">
        {!loading && (
          <button
            type="button"
            className="text-center w-[48rem] rounded-sm mt-5 p-5 bg-stone-400 hover:bg-stone-400/40"
            onClick={handleSubmit}
          >
            Crear Artista
          </button>
          )}
          {loading && <LoadingSpinner size= "w-16 h-16" />}
        </div>
      </form>
    </>
  );
};

const AlbumForm = () => {
  const [artistValue, setArtistValue] = useState("");
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedArtist(selectedValue); 
  }
  

  const handleArtistChange = async (event) => {
    const artistName = event.target.value;
    setArtistValue(artistName); // Actualizar el estado con el nuevo valor del artista

    try {
      const response = await axios.get(`/api/get-artists?title=${artistName}`);
      console.log("Respuesta de la API:", response.data);
      setArtists(response.data);
      
    } catch (error) {
      console.error("Error al obtener el artista:", error);
      
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    const formData = new FormData();
    formData.append(
      "albumTitle",
      document.getElementsByName("albumTitle")[0].value
    );
    formData.append(
      "albumCover",
      document.getElementsByName("albumCover")[0].value
    ); 
    formData.append(
      "albumArtist",
      selectedArtist
    );
    formData.append(
      "albumGenre",
      document.getElementsByName("albumGenre")[0].value
    );
    console.log(formData.get("albumArtist"));
    try {
      const response = await axios.post("/api/create-album", formData);
      console.log("Álbum subido con éxito", response);
      setSuccessMessage("Album creado correctamente");
      setErrorMessage("");
    } catch (error) {
      console.error("Error subiendo álbum:", error);
      if (error.response && error.response.status === 400) {
        setErrorMessage("El album ya existe");
      } else {
        setErrorMessage("Error al crear el Album");
      }
      setSuccessMessage("");
    }
  };

  return (
    <>
      <form>
      {errorMessage && (
          <div className="flex justify-center w-full">
            <div className="bg-red-700 w-[49%] text-white  mb-5 rounded-sm text-center p-2 mt-2">
              {errorMessage}
            </div>
          </div>
        )}

        {successMessage && (
          <div className="flex justify-center w-full">
            <div className="bg-green-500 w-[49%] text-white mb-5 rounded-sm text-center p-2 mt-2">
              {successMessage}
            </div>
          </div>
        )}
        <div className="flex justify-center w-full">
          <div className="inline-grid grid-cols-4 gap-4 w-[49%]">
            <label className="mt-2">Título del Álbum:</label>
            <input
              name="albumTitle"
              className="py-2 bg-zinc-600 rounded-md pl-1"
              type="text"
              required
            />
            <label className="mt-2">Portada del Album:</label>
            <input
              name="albumCover"
              className="py-2 bg-zinc-600 rounded-md pl-1"
              type="text"
              required
            />
            <label className="mt-2">Artista:</label>
            <input
              name="albumArtistPrev"
              className="py-2 bg-zinc-600 rounded-md pl-1"
              type="text"
              onChange={handleArtistChange}
              value={artistValue}
              
            />
            <label className="mt-2">Género del Album:</label>
            <input
              name="albumGenre"
              className="py-2 bg-zinc-600 rounded-md pl-1"
              type="text"
              required
            />
          </div>
        </div>
        <div className="flex justify-center w-full mt-3">
          <div className="inline-grid grid-cols-2 gap-4 w-[49%]">
            <div className="flex justify-end">
              <select name="albumArtist" onChange={handleSelectChange}  className="py-3 bg-zinc-600 rounded-md pl-1 w-[11.05rem]" required>
                <option>Seleccione</option>
              {artists.map((artist, index) => (
                  <option key={index} value={artist.name}>
                    {artist.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-center w-full">
        {!loading && (
          <button
            type="button"
            className="text-center w-[48rem] rounded-sm mt-5 p-5 bg-stone-400 hover:bg-stone-400/40"
            onClick={handleSubmit}
          >
            Crear Album
          </button>
          )}
          {loading && <LoadingSpinner/>}
        </div>
      </form>
    </>
  );
};

const SongForm = () => {
  const [selectedArtist, setSelectedArtist] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState("");
  const [artistValue, setArtistValue] = useState("");
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSelectChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedArtist(selectedValue);

    if (selectedValue !== "Seleccione") {
      try {
        const response = await axios.get(`/api/get-albums?artist=${selectedValue}`);
        console.log("Respuesta de la API de álbumes:", response.data);
        setAlbums(response.data);
      } catch (error) {
        console.error("Error al obtener los álbumes:", error);
      }
    } else {
      setAlbums([]);
    }
  }

  const handleAlbumSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedAlbum(selectedValue); 
  }

  const handleArtistChange = async (event) => {
    const artistName = event.target.value;
    setArtistValue(artistName);

    try {
      const response = await axios.get(`/api/get-artists?title=${artistName}`);
      console.log("Respuesta de la API:", response.data);
      setArtists(response.data);
    } catch (error) {
      console.error("Error al obtener el artista:", error);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("url", document.getElementsByName("url")[0].value);
    formData.append("titleSong", document.getElementsByName("titleSong")[0].value);
    formData.append("imageSong", document.getElementsByName("imageSong")[0].value);
    formData.append("artistsSong", selectedArtist);
    formData.append("albumSong", document.getElementsByName("albumSong")[0].value);
    //formData.append("file", document.getElementById("file").files[0]);

    try {
      const response = await axios.post("/api/upload", formData);
      console.log("Canción subida con éxito", response);
      setSuccessMessage("Canción insertada correctamente");
      setErrorMessage("");
    } catch (error) {
      console.error("Error subiendo canción:", error);
      if (error.response && error.response.status === 400) {
        setErrorMessage("La Canción ya existe");
      } else {
        setErrorMessage("Error al insertar la Canción");
      }
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form>
        {errorMessage && (
          <div className="flex justify-center w-full">
            <div className="bg-red-700 w-[49%] text-white  mb-5 rounded-sm text-center p-2 mt-2">
              {errorMessage}
            </div>
          </div>
        )}

        {successMessage && (
          <div className="flex justify-center w-full">
            <div className="bg-green-500 w-[49%] text-white mb-5 rounded-sm text-center p-2 mt-2">
              {successMessage}
            </div>
          </div>
        )}
        <div className="flex justify-center w-full">
          <div className="inline-grid grid-cols-4 gap-4 w-[49%]">
            
            <label className="mt-2">Título de la Canción:</label>
            <input
              name="titleSong"
              className="py-2 bg-zinc-600 rounded-md pl-1"
              type="text"
              required
            />
            <label className="mt-2">Imagen de la Canción:</label>
            <input
              name="imageSong"
              className="py-2 bg-zinc-600 rounded-md pl-1"
              type="text"
              required
            />
            <label className="mt-2">Artistas:</label>
            <input
              name="artistsSong"
              className="py-2 bg-zinc-600 rounded-md pl-1"
              type="text"
              onChange={handleArtistChange}
              required
            />
            <label className="mt-2">Álbum:</label>
            <select 
              name="albumSong" 
              onChange={handleAlbumSelectChange} 
              className="py-3 bg-zinc-600 rounded-md pl-1 w-[11.1rem]" 
              required
            >
              {albums.map((album, index) => (
                <option key={index} value={album.title}>
                  {album.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-center w-full mt-3">
          <div className="inline-grid grid-cols-2 gap-4 w-[69%]">
            <div className="flex justify-end">
              <select 
                className="py-3 bg-zinc-600 rounded-md pl-1 w-[11.1rem]" 
                onChange={handleSelectChange}
              >
                <option>Seleccione</option>
                {artists.map((artist, index) => (
                  <option key={index} value={artist.name}>
                    {artist.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full mt-3">
          <div className="inline-grid grid-cols-1 gap-4 w-[69%]">
            <div className="flex justify-center">
            <label className="mt-2 ml-4">URL de la Canción:</label>
            <input
              name="url"
              className="py-2 ml-11 w-[55%] bg-zinc-600 rounded-md pl-1"
              type="text"
              required
            />
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full">
          {!loading && (
            <button
              type="button"
              className="text-center w-[48rem] rounded-sm mt-5 p-5 bg-stone-400 hover:bg-stone-400/40"
              onClick={handleSubmit}
            >
              Crear Canción
            </button>
          )}
          {loading && <LoadingSpinner />}
        </div>
      </form>
    </>
  );
};


export default UploadMusicForm;
