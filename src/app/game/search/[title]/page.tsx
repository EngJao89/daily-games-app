import { GameProps } from '@/utils/types/game'
import { Container } from "@radix-ui/themes";
import { Input } from '@/components/Input'
import { GameCard } from '@/components/GameCard'

async function getData(title: string) {
  try {
    const decodeTitle = decodeURI(title)

    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&title=${decodeTitle}`)
    return res.json();
  } catch (err) {
    return null;
  }
}

export default async function Search({
  params: { title }
}: {
  params: { title: string }
}) {
  const games: GameProps[] = await getData(title);

  return (
    <main className="w-full text-black">
      <Container className="max-w-screen-xl mx-auto px-3">
        <Input />

        <h1 className="font-bold text-xl mt-8 mb-5">Veja oque encontramos na nossa base:</h1>

        {!games && (
          <p>Esse jogo não foi encontrado!...</p>
        )}

        <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {games && games.map((item) => (
            <GameCard key={item.id} data={item} />
          ))}
        </section>

      </Container>
    </main>
  )
}
