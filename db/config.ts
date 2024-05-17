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
    name: column.text(),
    email: column.text(),
    image: column.text(),
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


export default defineDb({
  tables: {Songs, Albumns, Artists, Users, Sessions, VerificationTokens},
})

