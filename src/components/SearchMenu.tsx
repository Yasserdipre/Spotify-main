// SearchMenu.js
import React, { useState, useEffect } from "react";
import { usePlayerStore } from '@/store/playerStore';
import SongSearch from "./SongSearch";
import AlbumSearch from "./AlbumSearch";

const SearchMenu = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const { setCurrentMusic, setIsPlaying, currentMusic } = usePlayerStore(state => state);


    const handleSearch = async () => {
        if (searchQuery.trim() === "") {
            setSearchResults([]);
            return;
        }

        try {
            const response = await fetch(`/api/get-songs?title=${searchQuery}`);
            const data = await response.json();


            if (Array.isArray(data)) {
                setSearchResults(data);
            } else {
                setSearchResults([]);
                console.log(data);
            }
        } catch (error) {
            console.error("Error searching songs:", error);
        }
    };

    const handleChange = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        handleSearch();
    }, [searchQuery]); // Ejecutar handleSearch cada vez que searchQuery cambie

    return (
        <>  
            <div className="ml-44 mt-3">
                <input
                    type="text"
                    name="search"
                    value={searchQuery}
                    onChange={handleChange}
                    className="text-white py-2 pl-2 rounded-2xl bg-zinc-700"
                    placeholder="Buscar"
                />
            </div>
            <SongSearch
                searchResults={searchResults}
                setCurrentMusic={setCurrentMusic}
                setIsPlaying={setIsPlaying}
                currentMusic={currentMusic}
                searchQuery={searchQuery}
            />
            <AlbumSearch searchQuery={searchQuery}
                         setCurrentMusic={setCurrentMusic}
                         setIsPlaying={setIsPlaying} />
        </>
    );
};

export default SearchMenu;


