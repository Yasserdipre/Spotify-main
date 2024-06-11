import { defineDb, column, defineTable } from 'astro:db';

const Artists = defineTable ({
  columns: {
      id: column.text({primaryKey: true}),
      name: column.text(),
      image: column.text(),
      listeners: column.number({optional:true}),
      genre: column.json({optional:true}),
      tipo: column.text()
  }
})

const Albumns = defineTable ({
    columns: {
        id: column.text({primaryKey: true}),
        title: column.text(),
        color: column.json(),
        cover: column.text(),
        artists: column.json(),
        artistId: column.text({references: () => Artists.columns.id}),
        tipo: column.text(),
        genre: column.text()
    }
})

const Songs = defineTable ({
  columns: {
      id: column.text({primaryKey: true}),
      albumId: column.text({references: () => Albumns.columns.id, optional:true}),
      title: column.text(),
      image: column.text(),
      artists: column.json(),
      album: column.text(),
      duration: column.text(),
      artistId: column.text(),
      tipo: column.text()
  }
})

const Users = defineTable ({
  columns: {
    id: column.text({primaryKey: true}),
    password: column.text({optional:true}),
    name: column.text(),
    email: column.text(),
    image: column.text({optional:true}),
    rol: column.text({optional: true})
  }
})


const Sessions = defineTable({
  columns:{
    sessionToken: column.text(),
    userId: column.text({references: () => Users.columns.id}),
    expires: column.text()
  }
})

const VerificationTokens = defineTable({
  columns: {
    identifier: column.text(),
    iat: column.text(),
    expires: column.number()
  }
})

const AlbumnBiblioteca = defineTable({
  columns: {
    id: column.text({primaryKey: true}),
    albumnId: column.text({references: () => Albumns.columns.id}),
    artistId: column.text({references: () => Artists.columns.id}),
    userId: column.text({references: () => Users.columns.id})

  }
})

const ArtistsBiblioteca = defineTable({
  columns: {
    id: column.text({primaryKey: true}),
    artistId: column.text({references: () => Artists.columns.id}),
    name: column.text(),
    userId: column.text({references: () => Users.columns.id})
  }
})

const SongBiblioteca = defineTable({
  columns: {
    id: column.text({primaryKey: true}),
    albumnId: column.text({references: () => Albumns.columns.id}),
    artistId: column.text({references: () => Artists.columns.id}),
    songId: column.text({references: () => Songs.columns.id}),
    userId: column.text({references: () => Users.columns.id})
  }
})



export default defineDb({
  tables: {Songs, Albumns, Artists, Users, Sessions, VerificationTokens, AlbumnBiblioteca, ArtistsBiblioteca, SongBiblioteca},
})

