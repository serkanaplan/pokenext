import PokemonPage from './pokemon/[page]/page';

export default function Home() {
  return (
    <div>
    <PokemonPage params={{ page: '1' }}/>
    </div>
  );
}