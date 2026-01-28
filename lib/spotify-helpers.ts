
// Helper functions til at arbejde med Spotify API data struktur

import type { Track, Artist, Album, Playlist } from './mockData';

/**
 * Get primary artist name from track
 */
export function getTrackArtist(track: Track): string {
  if (!track.artists || track.artists.length === 0) return 'Unknown Artist';
  return track.artists[0].name;
}

/**
 * Get all artist names from track (comma separated)
 */
export function getTrackArtists(track: Track): string {
  if (!track.artists || track.artists.length === 0) return 'Unknown Artist';
  return track.artists.map(a => a.name).join(', ');
}

/**
 * Get album name from track
 */
export function getTrackAlbum(track: Track): string {
  return track.album?.name || 'Unknown Album';
}

/**
 * Get album image URL from track
 */
export function getTrackImage(track: Track): string {
  if (!track.album?.images || track.album.images.length === 0) {
    return '';
  }
  return track.album.images[0].url;
}

/**
 * Get artist image URL
 */
export function getArtistImage(artist: Artist): string {
  if (!artist.images || artist.images.length === 0) {
    return '';
  }
  return artist.images[0].url;
}

/**
 * Get album image URL
 */
export function getAlbumImage(album: Album): string {
  if (!album.images || album.images.length === 0) {
    return '';
  }
  return album.images[0].url;
}

/**
 * Get playlist image URL
 */
export function getPlaylistImage(playlist: Playlist): string {
  if (!playlist.images || playlist.images.length === 0) {
    return '';
  }
  return playlist.images[0].url;
}

/**
 * Get primary artist from album
 */
export function getAlbumArtist(album: Album): string {
  if (!album.artists || album.artists.length === 0) return 'Unknown Artist';
  return album.artists[0].name;
}

/**
 * Get all artists from album (comma separated)
 */
export function getAlbumArtists(album: Album): string {
  if (!album.artists || album.artists.length === 0) return 'Unknown Artist';
  return album.artists.map(a => a.name).join(', ');
}

/**
 * Format duration from milliseconds to mm:ss
 * For Spotify API data (duration_ms)
 */
export function formatDuration(duration_ms: number): string {
  const totalSeconds = Math.floor(duration_ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Format followers count (e.g., 95000000 → "95M")
 */
export function formatFollowers(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

/**
 * Get year from release date (e.g., "2020-03-20" → 2020)
 */
export function getAlbumYear(album: Album): number {
  if (!album.release_date) return new Date().getFullYear();
  return parseInt(album.release_date.split('-')[0], 10);
}

/**
 * Get tracks from playlist
 */
export function getPlaylistTracks(playlist: Playlist): Track[] {
  if (!playlist.tracks?.items) return [];
  return playlist.tracks.items.map(item => item.track);
}

/**
 * Get playlist track count
 */
export function getPlaylistTrackCount(playlist: Playlist): number {
  return playlist.tracks?.total || 0;
}