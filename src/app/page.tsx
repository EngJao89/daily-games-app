import Image from "next/image";
import Link from "next/link";
import { Container } from "@radix-ui/themes";

import { GameProps } from "@/utils/types/game";

async function getDalyGame(){
  try{
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`)
    return res.json();
  }catch(err){
    throw new Error("Failed to fetch data")
  }
}

export default async function Home() {
  const dalyGame: GameProps = await getDalyGame();

  return (
    <main className="w-full">
      <Container className="max-w-screen-xl mx-auto px-3">
        <h1 className="text-center font-bold text-xl mt-8 mb-5">
          Separamos um jogo exclusivo pra você
        </h1>
        <Link href={`/game/${dalyGame.id}`}>
          <section className="w-full bg-black rounded-lg">
            <Image
              src={dalyGame.image_url}
              alt={dalyGame.title}
              priority={true}
              quality={100}
              width={100}
              height={100}
            />
          </section>
        </Link>
      </Container>
    </main>
  );
}
