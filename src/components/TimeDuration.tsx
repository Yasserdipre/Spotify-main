const duration = (songs) =>{
    let totalMinutos = 0;
    let totalSegundos = 0;
  
    // Iterar sobre cada canción y sumar sus duraciones
    songs.forEach(song => {
      const [minutos, segundos] = song.duration.split(':').map(Number);
      totalMinutos += minutos;
      totalSegundos += segundos;
    });
  
    // Convertir los segundos adicionales a minutos si son más de 60
    totalMinutos += Math.floor(totalSegundos / 60);
    totalSegundos = totalSegundos % 60;
  
    // Redondear hacia arriba si la duración total supera los 15 minutos y 30 segundos
    if (totalMinutos > 15 || (totalMinutos === 15 && totalSegundos >= 30)) {
      totalMinutos += 1; // Incrementar en 1
      totalSegundos = 0;
    }
  
    if (totalMinutos >= 60) {
      const horas = Math.floor(totalMinutos / 60);
      totalMinutos = totalMinutos % 60;
      return `${horas} h ${totalMinutos} min`;
    }
  
    return `${totalMinutos} min`;
  }
  
  export default duration;
  