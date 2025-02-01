'use client'
import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"

  

export default function Navbar () {

    const components = [
        {
          title: "Shaadi Ka Hisab Kitab - The Ultimate Dowry Calculator",
          href: "/chatbot/shaadi-ka-hisab-kitab",
          description:
            `A hilariously exaggerated dowry calculator that roasts your "market value" while reminding you dowry is illegal!`
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
        },
        // {
        //   title: "",
        //   href: "/chatbot/",
        //   description:
        //     "",
        // },
      ]

    return (
        <nav className="bg-white absolute my-10 left-1/2 transform -translate-x-1/2 px-12 p-4 flex justify-evenly items-center rounded-full">
            <NavigationMenu>
                <div className="w-full">
                <NavigationMenuList>
                    <div className="flex justify-between gap-7 w-full">
                    <NavigationMenuItem>
                        <Link href="/" legacyBehavior passHref>
                            {/* <NavigationMenuTrigger>Home</NavigationMenuTrigger>
                            <NavigationMenuContent> */}
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
                            {/* </NavigationMenuContent> */}
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Chat bots</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                {components.map((component) => (
                                    <Link className="p-2 bg-[#f4f4f5]/50 hover:bg-[#f4f4f5] cursor-pointer rounded-lg"
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                    >
                                        <div>
                                            <p>{component.title}</p>
                                            <p className="text-[#71717a] text-sm">{component.description}</p>
                                        </div>
                                    </Link>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>About us</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    </div>
                </NavigationMenuList>
                </div>
            </NavigationMenu>
        </nav>
    )
}