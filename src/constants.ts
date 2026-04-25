import { MusicTrack } from './types';

export const DUMMY_TRACKS: MusicTrack[] = [
  {
    id: 'track-1',
    title: 'VOID_PROTOCOL_v1',
    artist: 'GEN_AI_X',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    coverUrl: 'https://picsum.photos/seed/glitch1/400/400'
  },
  {
    id: 'track-2',
    title: 'NEURAL_STORM_EXE',
    artist: 'CYBER_CORE',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    coverUrl: 'https://picsum.photos/seed/glitch2/400/400'
  },
  {
    id: 'track-3',
    title: 'RECURSION_DEPTH',
    artist: 'DATA_VOID',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    coverUrl: 'https://picsum.photos/seed/glitch3/400/400'
  }
];

export const GRID_SIZE = 20;
export const INITIAL_SPEED = 150;
