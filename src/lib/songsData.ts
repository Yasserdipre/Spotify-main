import { colors } from "./color";
import type { Albumn } from "./dataType";
const ImgURL = {
  RomeoSantos:{
    FormulaVol1: {
      image: "https://i.discogs.com/mvKDxiuJX_n7pTHBaaobYu5vxtX08L8NyoDEX4xxUdc/rs:fit/g:sm/q:90/h:220/w:220/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTU3MzEx/MzEtMTQwMTEyOTkz/MS05Mzc3LmpwZWc.jpeg"
    }
  },
  LinkinPark:{
    HybridTheory: {
      image: "https://www.sopitas.com/wp-content/uploads/2020/10/hybrid-theory.jpeg"
    }
  },
  UrbanNocturne:{
    MidnightTales:{
      image: "https://vinyl.lofirecords.com/cdn/shop/files/2amsynth-vinyl.png?v=1693312187"
    }
  },
  Tenno:{
    StudySession:{
      image: "https://f4.bcbits.com/img/a1435058381_65.jpg"
    }
  },
  Raimu:{
    BlueNoteStudyTime: {
      image: "https://f4.bcbits.com/img/a1962013209_16.jpg"
    }
  },
  LoFiDreamer:{
    ChillLoFiMusic:{
      image: "https://f4.bcbits.com/img/a2793859494_16.jpg"
    }
  }
}



export const AlbumnData: Albumn[] = [
    {
      id: "",
      title: "Hybrid Theory",
      color: colors.yellow,
      cover:ImgURL.LinkinPark.HybridTheory.image
        ,
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
      cover: ImgURL.UrbanNocturne.MidnightTales.image,
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
      cover: ImgURL.Tenno.StudySession.image,
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
      cover: ImgURL.Raimu.BlueNoteStudyTime.image,
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
      cover: ImgURL.LoFiDreamer.ChillLoFiMusic.image,
      artists: {
        principal: "LoFi Dreamer"
    },
      artistId: "",
      tipo: "Album",
    },
    {
      id: "",
      title: "Formula, Vol. 1",
      color: colors.yellow,
      cover: ImgURL.RomeoSantos.FormulaVol1.image,
      artists: {
        principal: "Romeo Santos"
      },
      artistId: "",
      tipo: "Album"
    }
    
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
      image: ImgURL.LinkinPark.HybridTheory.image,
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
      image: ImgURL.LinkinPark.HybridTheory.image,
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
      image: ImgURL.LinkinPark.HybridTheory.image,
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
      image: ImgURL.LinkinPark.HybridTheory.image,
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
      image: ImgURL.LinkinPark.HybridTheory.image,
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
      image: ImgURL.UrbanNocturne.MidnightTales.image,
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
      image: ImgURL.UrbanNocturne.MidnightTales.image,
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
      image: ImgURL.UrbanNocturne.MidnightTales.image,
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
      image: ImgURL.UrbanNocturne.MidnightTales.image,
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
      image: ImgURL.UrbanNocturne.MidnightTales.image,
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
      image: ImgURL.Tenno.StudySession.image,
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
      image: ImgURL.Tenno.StudySession.image,
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
      image: ImgURL.Tenno.StudySession.image,
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
      image: ImgURL.Tenno.StudySession.image,
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
      image: ImgURL.Tenno.StudySession.image,
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
      title: "Sun",
      image: ImgURL.Raimu.BlueNoteStudyTime.image,
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
      title: "In my way",
      image: ImgURL.Raimu.BlueNoteStudyTime.image,
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
      title: "Nocture",
      image: ImgURL.Raimu.BlueNoteStudyTime.image,
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
      title: "Beautiful Thing",
      image: ImgURL.Raimu.BlueNoteStudyTime.image,
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
      title: "Final Game",
      image: ImgURL.Raimu.BlueNoteStudyTime.image,
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
      image: ImgURL.LoFiDreamer.ChillLoFiMusic.image,
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
      image: ImgURL.LoFiDreamer.ChillLoFiMusic.image,
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
      image: ImgURL.LoFiDreamer.ChillLoFiMusic.image,
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
      image: ImgURL.LoFiDreamer.ChillLoFiMusic.image,
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
      image: ImgURL.LoFiDreamer.ChillLoFiMusic.image,
      artists: {
        principal: "LoFi Dreamer"
      },
      album: "Chill Lo-Fi Music",
      duration: "4:20",
      tipo: 'Cancion'
    },
    {
      id: "",
      albumId: "",
      title: "Intro (Fórmula)",
      image: ImgURL.RomeoSantos.FormulaVol1.image,
      artists: {
        principal: "Romeo Santos"
      },
      album: "Formula, Vol. 1",
      duration: "2:14",
      tipo: "Cancion"
    },
    {
      id: "",
      albumId: "",
      title: "La Diabla",
      image: ImgURL.RomeoSantos.FormulaVol1.image,
      artists: {
        principal: "Romeo Santos"
      },
      album: "Formula, Vol. 1",
      duration: "4:02",
      tipo: "Cancion"
    },
    {
      id: "",
      albumId: "",
      title: "Que Se Mueran",
      image: ImgURL.RomeoSantos.FormulaVol1.image,
      artists: {
        principal: "Romeo Santos"
      },
      album: "Formula, Vol. 1",
      duration: "4:14",
      tipo: "Cancion"
    },
    {
      id: "",
      albumId: "",
      title: "Llévame Contigo",
      image: ImgURL.RomeoSantos.FormulaVol1.image,
      artists: {
        principal: "Romeo Santos"
      },
      album: "Formula, Vol. 1",
      duration: "3:49",
      tipo: "Cancion"
    },
    {
      id: "",
      albumId: "",
      title: "La Diabla - Mi Santa",
      image: ImgURL.RomeoSantos.FormulaVol1.image,
      artists: {
        principal: "Romeo Santos"
      },
      album: "Formula, Vol. 1",
      duration: "5:52",
      tipo: "Cancion"
    },
    {
      id: "",
      albumId: "",
      title: "Promise",
      image: ImgURL.RomeoSantos.FormulaVol1.image,
      artists: {
        principal: "Romeo Santos"
      },
      album: "Formula, Vol. 1",
      duration: "5:32",
      tipo: "Cancion"
    },
    {
      id: "",
      albumId: "",
      title: "Magia Negra",
      image: ImgURL.RomeoSantos.FormulaVol1.image,
      artists: {
        principal: "Romeo Santos"
      },
      album: "Formula, Vol. 1",
      duration: "3:47",
      tipo: "Cancion"
    },
    {
      id: "",
      albumId: "",
      title: "Soberbio",
      image: ImgURL.RomeoSantos.FormulaVol1.image,
      artists: {
        principal: "Romeo Santos"
      },
      album: "Formula, Vol. 1",
      duration: "4:05",
      tipo: "Cancion"
    },
    {
      id: "",
      albumId: "",
      title: "Skit (La Discusión)",
      image: ImgURL.RomeoSantos.FormulaVol1.image,
      artists: {
        principal: "Romeo Santos"
      },
      album: "Formula, Vol. 1",
      duration: "1:36",
      tipo: "Cancion"
    },
    {
      id: "",
      albumId: "",
      title: "Debate De 4",
      image: ImgURL.RomeoSantos.FormulaVol1.image,
      artists: {
        principal: "Romeo Santos"
      },
      album: "Formula, Vol. 1",
      duration: "4:41",
      tipo: "Cancion"
    },
    {
      id: "",
      albumId: "",
      title: "Rival",
      image: ImgURL.RomeoSantos.FormulaVol1.image,
      artists: {
        principal: "Romeo Santos"
      },
      album: "Formula, Vol. 1",
      duration: "4:38",
      tipo: "Cancion"
    },
    {
      id: "",
      albumId: "",
      title: "La Bella Y La Bestia",
      image: ImgURL.RomeoSantos.FormulaVol1.image,
      artists: {
        principal: "Romeo Santos"
      },
      album: "Formula, Vol. 1",
      duration: "3:58",
      tipo: "Cancion"
    },
    {
      id: "",
      albumId: "",
      title: "You",
      image: ImgURL.RomeoSantos.FormulaVol1.image,
      artists: {
        principal: "Romeo Santos"
      },
      album: "Formula, Vol. 1",
      duration: "4:22",
      tipo: "Cancion"
    },
    {
      id: "",
      albumId: "",
      title: "All Aboard",
      image: ImgURL.RomeoSantos.FormulaVol1.image,
      artists: {
        principal: "Romeo Santos"
      },
      album: "Formula, Vol. 1",
      duration: "4:39",
      tipo: "Cancion"
    },
    {
      id: "",
      albumId: "",
      title: "Aleluya (Cover Audio Video)",
      image: ImgURL.RomeoSantos.FormulaVol1.image,
      artists: {
        principal: "Romeo Santos"
      },
      album: "Formula, Vol. 1",
      duration: "3:29",
      tipo: "Cancion"
    },
    {
      id: "",
      albumId: "",
      title: "Malevo",
      image: ImgURL.RomeoSantos.FormulaVol1.image,
      artists: {
        principal: "Romeo Santos"
      },
      album: "Formula, Vol. 1",
      duration: "3:38",
      tipo: "Cancion"
    },
    {
      id: "",
      albumId: "",
      title: "Vale La Pena El Placer",
      image: ImgURL.RomeoSantos.FormulaVol1.image,
      artists: {
        principal: "Romeo Santos"
      },
      album: "Formula, Vol. 1",
      duration: "3:09",
      tipo: "Cancion"
    },
    {
      id: "",
      albumId: "",
      title: "Outro",
      image: ImgURL.RomeoSantos.FormulaVol1.image,
      artists: {
        principal: "Romeo Santos"
      },
      album: "Formula, Vol. 1",
      duration: "1:59",
      tipo: "Cancion"
    },
]
