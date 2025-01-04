import roomData from '@/data/ruang.json';

// Fungsi untuk mencari ruangan berdasarkan query
export const searchRoom = (query: string) => {
  const parseQuery = (input: string): string => {
    const words = input.toLowerCase().split(' ');
    const keywordIndex = words.findIndex(word =>
      word === 'ruang' || word === 'kelas' || word === 'laboratorium'
    );
    if (keywordIndex !== -1 && keywordIndex + 1 < words.length) {
      return words.slice(keywordIndex + 1).join(' ');
    }
    return '';
  };

  const searchTerm = parseQuery(query);

  for (const floor of roomData.floors) {
    const room = floor.rooms.find(
      room =>
        room.name.toLowerCase().includes(searchTerm) ||
        room.id.toLowerCase().includes(searchTerm)
    );
    if (room) {
      return {
        name: room.name,
        floorName: `Lantai ${floor.floorNumber}`,
        description: room.description
      }; // Mengembalikan objek
    }
  }

  return null; // Mengembalikan null jika tidak ditemukan
};