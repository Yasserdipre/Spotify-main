export type Artist = Artists
export type Data = Album | Song | Artists;
export type Albumn = Album;
export type SongProps = Song
export type SQL =  SQLiteTable[] | { [key: string]: any };



interface Album {
    id: string;
    title: string;
    color: { accent: string; dark: string };
    cover: string;
    artists: {[key: string]: string};
    artistId: string;
    tipo: string;
  }
  
  interface Song {
    id: string;
    albumId: string | null; 
    title: string;
    image: string;
    artists: {[key: string]: string};
    album: string;
    duration: string;
    tipo: string;
  }
  
  interface Artists {
    id: string;
    name: string; 
    image: string;
    listeners: number;
    genre: string;
    tipo: string;
  }
  
  
  interface SQLiteTable {
    id: SQLiteText;
    albumId: SQLiteText;
    title: SQLiteText;
    image: SQLiteText;
    artists: SQLiteCustomColumn;
    album: SQLiteText;
    duration: SQLiteText;
    artitsId: SQLiteText;
    tipo: SQLiteText;
  }
  
  interface SQLiteText {
    name: string;
    primary: boolean;
    notNull: boolean;
    default: any;
    defaultFn: any;
    onUpdateFn: any;
    hasDefault: boolean;
    isUnique: boolean;
    uniqueName: string;
    uniqueType: any;
    dataType: string;
    columnType: string;
    enumValues: any;
    config: any;
    table: any;
    length: any;
  }
  
  interface SQLiteCustomColumn {
    name: string;
    primary: boolean;
    notNull: boolean;
    default: any;
    defaultFn: any;
    onUpdateFn: any;
    hasDefault: boolean;
    isUnique: boolean;
    uniqueName: string;
    uniqueType: any;
    dataType: string;
    columnType: string;
    enumValues: any;
    config: any;
    table: any;
    sqlName: string;
    mapTo: Function;
    mapFrom: Function;
  }