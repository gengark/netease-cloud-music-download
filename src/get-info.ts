interface ArtistInfo {
    id: number;
    name: string;
}

interface SongInfo {
    id: number;
    name: string;
    artists: ArtistInfo[];
}

const normalizeName = (name?: string) =>
    name ? name.replace(/[<>:"/\\|?*]/g, '').trim() : undefined;

async function getInfo(id: string) {
    const result = {
        song: '未知单曲',
        artists: '未知作者',
    };

    try {
        const response = await fetch(
            `https://music.163.com/api/song/detail?ids=[${id}]`,
        );
        if (!response.ok) return result;

        const data: { songs: SongInfo[] } | undefined = await response.json();
        const songData = data?.songs?.[0];
        result.song = normalizeName(songData?.name) ?? '未知单曲';
        result.artists = normalizeName(
            (songData?.artists ?? [{ name: '未知作者' }])
                .map((artist) => artist.name)
                .join(', '),
        ) as string;

        return result;
    } catch (error) {
        return result;
    }
}

export default getInfo;
