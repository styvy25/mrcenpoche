import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
const HeroSection = () => {
  return <div className="relative overflow-hidden bg-gradient-to-br from-mrc-blue via-blue-600 to-blue-800 text-white">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cmVjdCBmaWxsPSIjMDM0OEEzIiB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjAiLz48Y2lyY2xlIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xNSIgY3g9IjcyMCIgY3k9IjM4MCIgcj0iMTgxIi8+PGNpcmNsZSBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIuMSIgY3g9IjcyMCIgY3k9IjM4MCIgcj0iMjY1Ii8+PGNpcmNsZSBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIuMSIgY3g9IjcyMCIgY3k9IjM4MCIgcj0iMzUwIi8+PGNpcmNsZSBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIuMSIgY3g9IjcyMCIgY3k9IjM4MCIgcj0iNDMwIi8+PC9nPjwvc3ZnPg==')] opacity-20 bg-cover bg-center"></div>
      <div className="max-w-7xl px-4 sm:px-6 py-24 relative my-px md:py-0 lg:px-0 mx-0 bg-cyan-600 rounded-sm">
        <div className="">
          <div className="sm:text-center md:max-w-2xl lg:col-span-6 lg:text-left rounded-none md:mx-0 px-0 py-0 my-0">
            <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
              <span className="block">MRC LearnScape</span>
              <span className="block text-red-400">Formation Interactive</span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-200">
              Plateforme d'apprentissage immersive pour les militants du MRC avec assistance IA personnalisée, supports PDF et suivi de progression.
            </p>
            <div className="mt-8 sm:flex sm:justify-center lg:justify-start gap-4 px-[240px]">
              <Link to="/modules" className="my-px mx-0 px-0 py-[5px]">
                <Button className="bg-white text-mrc-blue hover:bg-gray-100 mx-[149px]">
                  Commencer la formation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/assistant">
                <Button variant="outline" className="border-white hover:bg-white/10 py-0 my-0 font-normal px-0 mx-0 text-gray-950">
                  Poser une question à Styvy237
                </Button>
              </Link>
            </div>
          </div>
          <div className="">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <div className="relative block w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                <img className="w-full" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIHN0b3AtY29sb3I9IiMxRTg4RTUiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjMUQ0RUQ4IiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9InVybCgjYSkiIGQ9Ik0wIDBoNTAwdjMwMEgweiIvPjxjaXJjbGUgc3Ryb2tlPSIjRkZGIiBzdHJva2Utd2lkdGg9IjE1IiBjeD0iMjUwIiBjeT0iMTUwIiByPSI5MCIgb3BhY2l0eT0iLjkiLz48cmVjdCBmaWxsPSIjRUEzODRDIiB4PSIxMjUiIHk9IjEzNSIgd2lkdGg9IjI1MCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiM0Q0FGNTAiIHg9IjIzNSIgeT0iMjUiIHdpZHRoPSIzMCIgaGVpZ2h0PSIyNTAiLz48L2c+PC9zdmc+" alt="MRC LearnScape" />
                <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                  <div className="text-center bg-black bg-opacity-50 p-4 rounded-lg">
                    <h3 className="">Styvy237</h3>
                    <p className="">Votre assistant IA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default HeroSection;