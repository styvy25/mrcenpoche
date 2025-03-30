
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import VoteCard from '@/components/electoral/VoteCard';

const VoteCardDemo = () => {
  return (
    <MainLayout>
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">CADE-SHARING Vote Card</h1>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div>
              <VoteCard />
            </div>
            
            <div className="max-w-md space-y-4">
              <h2 className="text-xl font-semibold">Caractéristiques du design</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><span className="font-medium">Fond :</span> Bleu foncé (#0C2D57)</li>
                <li><span className="font-medium">Typographie :</span> Sans-serif, texte en majuscules</li>
                <li><span className="font-medium">Structure :</span> "VOTE" principal en haut, "CADE-SHARING" au milieu, quatre "VOTE" en bas</li>
                <li><span className="font-medium">Coins :</span> Arrondis, rayon généreux</li>
              </ul>
              
              <div className="pt-4">
                <h3 className="font-medium mb-2">Options de personnalisation</h3>
                <p>Le composant VoteCard accepte des props pour la taille et des classes CSS personnalisées.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default VoteCardDemo;
