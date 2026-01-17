import Image from "next/image";
import logo from "../assets/bird_2.jpg";
import landingImg from "../assets/hand-drawn-career-cushioning-concept_23-2150852768.avif";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <header className="max-w-6xl mx-auto px-4 sm:px-8 py-6 flex justify-start">
        <Image src={logo} alt="logo" className="w-32 h-auto" />
      </header>

      <section className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto px-4 sm:px-8 gap-8">

        <div className="text-center lg:text-left w-full lg:w-auto">
          <h1 className="text-3xl font-bold">Welcome to the Landing Page</h1>
          <p className="mt-4 text-gray-600">
            Stay organized and never lose track of your job search. Monitor application status, 
            interview dates, and follow-ups all in one place. Our intuitive tracker helps you manage 
            your career journey and land your next opportunity faster.
          </p>
          <Button className="mt-4" asChild>
            <Link href="/add-job">Get Started</Link>
          </Button>
        </div>

        <div className="w-full lg:w-2/5 flex justify-center flex-shrink-0">
          <Image
            src={landingImg}
            alt="landing image"
            className="w-full h-auto object-contain"
          />
        </div>

      </section>
    </main>
  );
}
