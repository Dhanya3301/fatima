import { UnrollingLetter2 } from "@/Components/Letter2";
import Polaroids from "@/Components/Polaroids";

export default function Home() {
  return (
    <>
    <Polaroids />   
    <div className="bg-[rgba(0,0,0,0.7)] min-h-screen p-8 flex items-center justify-center">
            <UnrollingLetter2 />
        </div>
    </>
  );
}