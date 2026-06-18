export interface Player {
  id: string;
  name: string;
  platform: PlayerPlatform;
  game: string;
  joined: boolean;
  logo: {
    color: string;
    char: string;
  }
}

export enum PlayerPlatform {
  PARTY = 'Party',
  MATCHES = 'Matches',
  STREAM = 'Stream',
}
