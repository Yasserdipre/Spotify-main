import { defineDb, column, defineTable } from 'astro:db';


const Albumns = defineTable ({
    columns: {
        id: column.text({primaryKey: true}),
        title: column.text(),
        color: column.json(),
        cover: column.text(),
        artists: column.json(),
        artistId: column.text(),
        tipo: column.text()
    }
})

const Songs = defineTable ({
  columns: {
      id: column.text({primaryKey: true}),
      albumId: column.text({references: () => Albumns.columns.id}),
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
  tables: {Songs, Albumns},
})

