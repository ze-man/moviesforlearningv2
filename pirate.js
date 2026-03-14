// Public torrent APIs (1337x, YTS, RARBG proxies)
const TORRENT_APIS = {
    yts: 'https://yts.mx/api/v2/list_movies.json?query_term=',
    '1337x': 'https://1337x.to/search/{{title}}/1/',
    rarbg: 'https://rarbgproxied.org/torrents.php?search='
};

async function getTorrents(title) {
    const torrents = [];
    
    // YTS (best quality)
    try {
        const res = await fetch(`${TORRENT_APIS.yts}${encodeURIComponent(title)}`);
        const data = await res.json();
        data.data.movies?.forEach(m => {
            torrents.push({
                quality: m.torrents[0].quality,
                magnet: m.torrents[0].url,
                size: m.torrents[0].size,
                seeds: m.torrents[0].seeds
            });
        });
    } catch(e) {}
    
    // 1337x magnets (backup)
    // Parse HTML or use proxy API for magnets
    
    return torrents.sort((a,b) => b.seeds - a.seeds); // Best first
}

// Fake streaming (WebTorrent for browser playback)
async function streamTorrent(magnet) {
    // Use WebTorrent CDN for in-browser streaming
    const WebTorrent = await import('https://cdn.skypack.dev/webtorrent');
    const client = new WebTorrent();
    const torrent = client.add(magnet);
    
    torrent.on('torment', file => {
        if (file.name.endsWith('.mp4')) {
            file.renderTo(document.getElementById('player'));
        }
    });
}
