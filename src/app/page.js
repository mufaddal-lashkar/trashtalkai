"use client"
import { MdArrowOutward } from "react-icons/md";
import { Button } from '@/components/ui/button';
import Link from "next/link";

export default function Home() {

  const bots = [
    {
      title: "Shaadi Ka Hisab Kitab - The Ultimate Dowry Calculator",
      href: "/chatbot/shaadi-ka-hisab-kitab",
      description:
        `A hilariously exaggerated dowry calculator that roasts your "market value" while reminding you dowry is illegal!`,
      // img: "../../../public/shaadi-ka-hisab-kitab.webp"
      img: "https://www.pexels.com/photo/a-beautiful-bride-wearing-traditional-clothes-7651454/"
    },
    {
      title: "Naukri Predictor – Job Destiny Bot",
      href: "/chatbot/naukri-predictor",
      description:
        "Berozgar ya CEO? Batao aur jaan lo apni career ki bhavishya-vaani!",
    },
    {
      title: "Babu Bhaiya Investment Advisor",
      href: "/chatbot/investment-advisor",
      description:
        "Stock upar jayega ya neeche? Babu Bhaiya ki bhavishyavani suno!",
    },
    {
      title: "Rishta Scanner – Marriage Potential Analyzer",
      href: "/chatbot/rishta-scanner",
      description: "Aapke rishtay ka kya future hai? Aunty ki nazar se dekho!",
    },
    {
      title: "Tinder GPT – Pickup Line Generator",
      href: "/chatbot/tinder-gpt",
      description:
        "Lines aisi jo match pakka karwa de… ya block bhi!",
    },
    {
      title: "Maa Ka Pyaar Meter",
      href: "/chatbot/maa-ka-pyaar-meter",
      description:
        "Maa ki nazron mein tumhara score kya hai? Jaan lo!",
    },
    {
      title: "Berozgari Calculator – Struggle Level AI",
      href: "/chatbot/berozgari-calculator",
      description:
        "Aapke berozgar hone ki percentage? Batao aur ro lo!",
    },
    {
      title: "Jugaad Finder – Desi Hack Generator",
      href: "/chatbot/jugaad-finder",
      description:
        "Problem ho toh jugaad bhi hoga! AI se jugaad lo!",
    },
    {
      title: "Kitna Paka Raha Hai? – Boring Talk Detector",
      href: "/chatbot/boring-talk-detector",
      description:
        "Bakwaas ki limit check karna ho toh AI se poocho!",
    }
  ]

  return (
    <div className=" min-h-screen max-h-max flex flex-col py-32">
      <header>
        <title>TrashTalk AI</title>
        <link rel="icon" href="/favicon.ico" />
      </header>

      <main className="flex-grow flex flex-col items-center justify-center">
        <section className="text-center mb-10">
          <h1 className='text-4xl font-bold mb-4'>TrashTalk AI</h1>
          <h2 className="text-3xl font-bold mb-4">AI That Roasts, Predicts, and Entertains</h2>
          <div className="text-6xl mb-4">🤖</div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {bots.map((bot, index) => (
            <div key={index} className="bg-white p-4 rounded-lg transition-transform transform hover:scale-105 cursor-pointer flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold neonBlue">{bot.title}</h3>
                <p className="text-gray-400">{bot.description}</p>
              </div>
              <div className="mt-3 flex justify-end">
                <Button asChild>
                  <Link href={bot.href}>
                    Try now <MdArrowOutward className="" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </section>
      </main>
      
    </div>
  )
}