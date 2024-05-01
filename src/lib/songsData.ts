import { colors } from "./color";

export const AlbumnData = [
    {
      id: "",
      title: "Hybrid Theory",
      color: colors.yellow,
      cover:
        "https://www.sopitas.com/wp-content/uploads/2020/10/hybrid-theory.jpeg",
      artists: {
        principal: "Linkin Park"
    },
      artistId: "",
      tipo: "Album",
    },
    {
      id: "",
      title: "Midnight Tales",
      color: colors.green,
      cover:
        "https://vinyl.lofirecords.com/cdn/shop/files/2amsynth-vinyl.png?v=1693312187",
      artists: {
        principal: "Urban Nocturne"
    },
      artistId: "",
      tipo: "Album",
    },
    {
      id: "",
      title: "Study Session",
      color: colors.rose,
      cover: "https://f4.bcbits.com/img/a1435058381_65.jpg",
      artists: {
        principal: "Tenno"
    },
      artistId: "",
      tipo: "Album",
    },
    {
      id: "",
      title: "Blue Note Study Time",
      color: colors.blue,
      cover: "https://f4.bcbits.com/img/a1962013209_16.jpg",
      artists: {
        principal: "Raimu"
    },
      artistId: "",
      tipo: "Album",
    },
    {
      id: "",
      title: "Chill Lo-Fi Music",
      color: colors.purple,
      cover: "https://f4.bcbits.com/img/a2793859494_16.jpg",
      artists: {
        principal: "LoFi Dreamer"
    },
      artistId: "",
      tipo: "Album",
    },
    
  ];
  

  export interface Song {
    id: string;
    albumId: string;
    title: string;
    image: string;
    artists: {[key: string]: string };
    album: string;
    duration: string;
    tipo: string;
  }

  export const SongsData: Song[] = [
    {
      id: "",
      albumId: "",
      title: "Papercut",
      image: `https://www.sopitas.com/wp-content/uploads/2020/10/hybrid-theory.jpeg`,
      artists: {
        principal: "Linkin Park"
      },
      album: "Hybrid Theory",
      duration: "3:12",
      tipo: 'Cancion'
    },
    {
      id: "",
      albumId: "",
      title: "One Step Closer",
      image: `https://www.sopitas.com/wp-content/uploads/2020/10/hybrid-theory.jpeg`,
      artists: {
        principal: "Linkin Park"
      },
      album: "Hybrid Theory",
      duration: "2:37",
      tipo: 'Cancion'
    },
    {
      id: "",
      albumId: "",
      title: "With You",
      image: `https://www.sopitas.com/wp-content/uploads/2020/10/hybrid-theory.jpeg`,
      artists: {
        principal: "Linkin Park"
      },
      album: "Hybrid Theory",
      duration: "3:24",
      tipo: 'Cancion'
    },
    {
      id: "",
      albumId: "",
      title: "Crawling",
      image: `https://www.sopitas.com/wp-content/uploads/2020/10/hybrid-theory.jpeg`,
      artists: {
        principal: "Linkin Park"
      },
      album: "Hybrid Theory",
      duration: "3:28",
      tipo: 'Cancion'
    },
    {
      id: "",
      albumId: "",
      title: "By Myself",
      image: `https://www.sopitas.com/wp-content/uploads/2020/10/hybrid-theory.jpeg`,
      artists: {
        principal: "Linkin Park"
      },
      album: "Hybrid Theory",
      duration: "3:10",
      tipo: 'Cancion'
    },
    {
      id: "",
      albumId: "",
      title: "Silent Rain",
      image: `https://vinyl.lofirecords.com/cdn/shop/files/2amsynth-vinyl.png?v=1693312187`,
      artists: {
        principal: "Urban Nocturne"
      },
      album: "Midnight Tales",
      duration: "3:40",
      tipo: 'Cancion'
    },
    {
      id: "",
      albumId: "",
      title: "Lost Pages",
      image: `https://vinyl.lofirecords.com/cdn/shop/files/2amsynth-vinyl.png?v=1693312187`,
      artists: {
        principal: "Urban Nocturne"
      },
      album: "Midnight Tales",
      duration: "3:20",
      tipo: 'Cancion'
    },
    {
      id: "",
      albumId: "",
      title: "Midnight Tales",
      image: `https://vinyl.lofirecords.com/cdn/shop/files/2amsynth-vinyl.png?v=1693312187`,
      artists: {
        principal: "Urban Nocturne"
      },
      album: "Midnight Tales",
      duration: "3:50",
      tipo: 'Cancion'
    },
    {
      id: "",
      albumId: "",
      title: "City Lights",
      image: `https://vinyl.lofirecords.com/cdn/shop/files/2amsynth-vinyl.png?v=1693312187`,
      artists: {
        principal: "Urban Nocturne"
      },
      album: "Midnight Tales",
      duration: "3:30",
      tipo: 'Cancion'
    },
    {
      id: "",
      albumId: "",
      title: "Night Drive",
      image: `https://vinyl.lofirecords.com/cdn/shop/files/2amsynth-vinyl.png?v=1693312187`,
      artists: {
        principal: "Urban Nocturne"
      },
      album: "Midnight Tales",
      duration: "4:20",
      tipo: 'Cancion'
    },
    {
      id: "",
      albumId: "",
      title: "Lunar",
      image: `https://f4.bcbits.com/img/a1435058381_65.jpg`,
      artists: {
        principal: "Tenno"
      },
      album: "Study Session",
      duration: "3:40",
      tipo: 'Cancion'
    },
    {
      id: "",
      albumId: "",
      title: "Go go go!",
      image: `https://f4.bcbits.com/img/a1435058381_65.jpg`,
      artists: {
        principal: "Tenno"
      },
      album: "Study Session",
      duration: "3:20",
      tipo: 'Cancion'
    },
    {
      id: "",
      albumId: "",
      title: "Keep focus!",
      image: `https://f4.bcbits.com/img/a1435058381_65.jpg`,
      artists: {
        principal: "Tenno"
      },
      album: "Study Session",
      duration: "2:40",
      tipo: 'Cancion'
    },
    {
      id: "",
      albumId: "",
      title: "JavaScript is the way",
      image: `https://f4.bcbits.com/img/a1435058381_65.jpg`,
      artists: {
        principal: "Tenno"
      },
      album: "Study Session",
      duration: "3:10",
      tipo: 'Cancion'
    },
    {
      id: "",
      albumId: "",
      title: "No more TypeScript for me",
      image: `https://f4.bcbits.com/img/a1435058381_65.jpg`,
      artists: {
        principal: "Tenno"
      },
      album: "Study Session",
      duration: "2:10",
      tipo: 'Cancion'
    },
    {
      id: "",
      albumId: "",
      title: "Lunar",
      image: "https://f4.bcbits.com/img/a1962013209_16.jpg",
      artists: {
        principal: "Raimu"
      },
      album: "Blue Note Study Time",
      duration: "3:40",
      tipo: 'Cancion'
    },
    {
      id: "",
      albumId: "",
      title: "Go go go!",
      image: "https://f4.bcbits.com/img/a1962013209_16.jpg",
      artists: {
        principal: "Raimu"
      },
      album: "Blue Note Study Time",
      duration: "3:20",
      tipo: 'Cancion'
    },
    {
      id: "",
      albumId: "",
      title: "Keep focus!",
      image: "https://f4.bcbits.com/img/a1962013209_16.jpg",
      artists: {
        principal: "Raimu"
      },
      album: "Blue Note Study Time",
      duration: "2:40",
      tipo: 'Cancion'
    },
    {
      id: "",
      albumId: "",
      title: "JavaScript is the way",
      image: "https://f4.bcbits.com/img/a1962013209_16.jpg",
      artists: {
        principal: "Raimu"
      },
      album: "Blue Note Study Time",
      duration: "3:10",
      tipo: 'Cancion'
    },
    {
      id: "",
      albumId: "",
      title: "No more TypeScript for me",
      image: "https://f4.bcbits.com/img/a1962013209_16.jpg",
      artists: {
        principal: "Raimu"
      },
      album: "Blue Note Study Time",
      duration: "2:10",
      tipo: 'Cancion'
    },
    {
      id: "",
      albumId: "",
      title: "Moonlit Walk",
      image: "https://f4.bcbits.com/img/a2793859494_16.jpg",
      artists: {
        principal: "LoFi Dreamer"
      },
      album: "Chill Lo-Fi Music",
      duration: "3:12",
      tipo: 'Cancion'
    },
    {
      id: "",
      albumId: "",
      title: "Coffee Daze",
      image: "https://f4.bcbits.com/img/a2793859494_16.jpg",
      artists: {
        principal: "LoFi Dreamer"
      },
      album: "Chill Lo-Fi Music",
      duration: "4:07",
      tipo: 'Cancion'
    },
    {
      id: "",
      albumId: "",
      title: "Skyline Serenade",
      image: "https://f4.bcbits.com/img/a2793859494_16.jpg",
      artists: {
        principal: "LoFi Dreamer"
      },
      album: "Chill Lo-Fi Music",
      duration: "3:50",
      tipo: 'Cancion'
    },
    {
      id: "",
      albumId: "",
      title: "Urban Echoes",
      image: "https://f4.bcbits.com/img/a2793859494_16.jpg",
      artists: {
        principal: "LoFi Dreamer"
      },
      album: "Chill Lo-Fi Music",
      duration: "3:30",
      tipo: 'Cancion'
    },
    {
      id: "",
      albumId: "",
      title: "Night's End",
      image: "https://f4.bcbits.com/img/a2793859494_16.jpg",
      artists: {
        principal: "LoFi Dreamer"
      },
      album: "Chill Lo-Fi Music",
      duration: "4:20",
      tipo: 'Cancion'
    }
]
