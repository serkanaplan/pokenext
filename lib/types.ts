// lib/types.ts

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<{
      name: string;
      url: string;
    }>;
  }
  
  export interface PokemonDetails {
    id: number;
    name: string;
    cries:{
        latest: string
    }
    sprites: {
      other: {
        showdown: {
            front_default: string
        }
      };
    };
    types: Array<{
      type: {
        name: string;
      };
    }>;
    stats: Array<{
      base_stat: number;
      stat: {
        name: string;
      };
    }>;
  }