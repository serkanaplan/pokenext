import { PokemonListResponse, PokemonDetails } from './types';

const BASE_URL = process.env.NEXT_PUBLIC_POKEMON_API_URL || 'https://pokeapi.co/api/v2';

async function fetchWithRetry(url: string, retries = 3, timeout = 10000): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        if (retries > 0) {
            console.log(`Retrying... Attempts left: ${retries - 1}`);
            return fetchWithRetry(url, retries - 1, timeout);
        }
        throw error;
    }
}

export async function getPokemonList(page: number, limit: number = 20): Promise<PokemonListResponse> {
    const offset = (page - 1) * limit;
    const response = await fetchWithRetry(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
    return response.json();
}

export async function getPokemonDetails(url: string): Promise<PokemonDetails> {
    const response = await fetchWithRetry(url);
    return response.json();
}