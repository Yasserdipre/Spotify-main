// PlaylistItemList.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useStore } from '@/store/bibliotecaStore';
import PlaylistItem from './SideMenuCard';

type Album = {
  id: string;
  cover: string;
  title: string;
  artists: {
    principal: string;
  };
  color: string;
};

interface Props {
  albums: Album[];
}

const ListItemList: React.FC<Props> = ({ albums, session }) => {
  const { shouldUpdate, setShouldUpdate } = useStore();
  const [albumData, setAlbumData] = useState<Album[]>(albums);
  const sessionQuery = encodeURIComponent(JSON.stringify(session));

  useEffect(() => {
    if (shouldUpdate) {
        console.log("bobo")
      axios.get(`/api/get-biblioteca-data?id=${encodeURIComponent("1")}&session=${sessionQuery}`) // Cambia '/api/albums' por la URL de tu API real
        .then((response) => {
            console.log("esta: ", response.data.albumns)
          setAlbumData(response.data.albumns);
          setShouldUpdate(false);
        })
        .catch((error) => {
          console.error('Error fetching album data:', error);
          setShouldUpdate(false);
        });
    }
  }, [shouldUpdate]);

  return (
    <>
      {albumData.map((album) => (
        <PlaylistItem key={album.id} initialAlbumData={album}/>
      ))}
    </>
  );
};

export default ListItemList;
