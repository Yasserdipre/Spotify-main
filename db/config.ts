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
        tipo: column.text()
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
      artitsId: column.text({optional:true}),
      tipo: column.text()
  }
})


export default defineDb({
  tables: {Songs, Albumns, Artists},
})

