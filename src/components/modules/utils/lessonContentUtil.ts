// Utility for getting lesson content data
export const getLessonContent = (moduleId: string, lessonId: string | null): { title: string; content: string } => {
  // No lesson selected
  if (!lessonId) {
    return {
      title: "Sélectionnez une leçon",
      content: "Veuillez sélectionner une leçon dans la liste pour afficher son contenu."
    };
  }
  
  // Map of module/lesson IDs to content
  const lessonMap: Record<string, Record<string, { title: string; content: string }>> = {
    "histoire": {
      "1": {
        title: "Origines du MRC",
        content: `
          <h2>Les origines du MRC</h2>
          <p>Le Mouvement Républicain Camerounais (MRC) a été créé en 2012 par Maurice Kamto, juriste et universitaire camerounais de renom.</p>
          <p>Face aux défis démocratiques et au besoin de renouveau politique, le MRC s'est positionné comme une alternative aux partis traditionnels, avec une vision centrée sur l'État de droit, la justice sociale et le développement économique.</p>
          <h3>Contexte de création</h3>
          <p>La création du MRC s'inscrit dans un contexte politique marqué par:</p>
          <ul>
            <li>Une gouvernance critiquée pour son manque de transparence</li>
            <li>Des institutions perçues comme affaiblies</li>
            <li>Un besoin de renouvellement de la classe politique</li>
          </ul>
          <p>Le parti s'est rapidement imposé comme une force politique significative, attirant des intellectuels, des jeunes et divers acteurs de la société civile.</p>
        `
      },
      "2": {
        title: "Évolution et croissance",
        content: `
          <h2>Évolution et croissance du MRC</h2>
          <p>Depuis sa création, le MRC a connu une croissance significative de sa base militante et de son influence politique.</p>
          <p>Les premières années ont été consacrées à l'implantation du parti sur l'ensemble du territoire national et à la structuration de ses instances.</p>
          <h3>Étapes marquantes</h3>
          <ul>
            <li><strong>2012-2015:</strong> Phase d'installation et de développement des structures de base</li>
            <li><strong>2016-2017:</strong> Renforcement de la présence nationale et élaboration du projet politique</li>
            <li><strong>2018:</strong> Participation à l'élection présidentielle avec Maurice Kamto comme candidat</li>
            <li><strong>2019-2020:</strong> Période de résistance face aux défis politiques et juridiques</li>
            <li><strong>2021-présent:</strong> Consolidation et expansion continue</li>
          </ul>
          <p>Cette évolution témoigne de la capacité du parti à s'adapter aux défis politiques et à maintenir son cap malgré les obstacles.</p>
        `
      },
      "3": {
        title: "Figures historiques",
        content: `
          <h2>Les figures historiques du MRC</h2>
          <p>Le MRC compte dans ses rangs plusieurs personnalités qui ont contribué à façonner son identité et son parcours.</p>
          <h3>Maurice Kamto</h3>
          <p>Fondateur et président du parti, Maurice Kamto est un juriste internationalement reconnu. Ancien ministre du gouvernement, il a notamment:</p>
          <ul>
            <li>Participé à la résolution pacifique du différend frontalier entre le Cameroun et le Nigeria</li>
            <li>Enseigné le droit dans plusieurs universités prestigieuses</li>
            <li>Publié de nombreux ouvrages sur le droit et la gouvernance</li>
          </ul>
          <h3>Autres figures marquantes</h3>
          <p>Parmi les autres personnalités importantes du parti figurent:</p>
          <ul>
            <li>Des universitaires et intellectuels engagés pour le changement</li>
            <li>D'anciens membres de l'administration et de la société civile</li>
            <li>Des entrepreneurs et des professionnels de divers secteurs</li>
          </ul>
          <p>Ces figures ont contribué à forger l'identité plurielle et compétente du parti.</p>
        `
      }
    },
    "citoyennete": {
      "1": {
        title: "Les droits civiques",
        content: `
          <h2>Les droits civiques</h2>
          <p>Les droits civiques sont les droits fondamentaux qui permettent à chaque citoyen de participer pleinement à la vie politique et sociale de son pays.</p>
          <p>Ils garantissent l'égalité de tous devant la loi, la liberté d'expression, de réunion et d'association, ainsi que le droit de vote et d'éligibilité.</p>
          <h3>Importance des droits civiques</h3>
          <ul>
            <li>Assurer la participation de tous à la vie démocratique</li>
            <li>Protéger les libertés individuelles et collectives</li>
            <li>Garantir l'égalité des chances et l'accès aux services publics</li>
          </ul>
          <p>Le respect et la promotion des droits civiques sont essentiels pour une société juste et démocratique.</p>
        `
      },
      "2": {
        title: "Les devoirs civiques",
        content: `
          <h2>Les devoirs civiques</h2>
          <p>Les devoirs civiques sont les obligations et responsabilités qui incombent à chaque citoyen envers la société et l'État.</p>
          <p>Ils comprennent le respect des lois, le paiement des impôts, la participation à la vie publique et la défense de la patrie.</p>
          <h3>Importance des devoirs civiques</h3>
          <ul>
            <li>Assurer le bon fonctionnement de la société et de l'État</li>
            <li>Contribuer au financement des services publics</li>
            <li>Participer à la prise de décision et au contrôle de l'action publique</li>
          </ul>
          <p>L'accomplissement des devoirs civiques est indispensable pour une société harmonieuse et prospère.</p>
        `
      },
      "3": {
        title: "La participation citoyenne",
        content: `
          <h2>La participation citoyenne</h2>
          <p>La participation citoyenne est l'ensemble des actions et initiatives par lesquelles les citoyens s'impliquent dans la vie de leur communauté et de leur pays.</p>
          <p>Elle peut prendre différentes formes, telles que le vote, le militantisme, le bénévolat, la consultation et la concertation.</p>
          <h3>Importance de la participation citoyenne</h3>
          <ul>
            <li>Renforcer la démocratie et la légitimité des institutions</li>
            <li>Améliorer la qualité des politiques publiques et des services</li>
            <li>Promouvoir le développement local et la cohésion sociale</li>
          </ul>
          <p>La participation citoyenne est un moteur essentiel du progrès social et du bien-être collectif.</p>
        `
      }
    },
    "gouvernance": {
      "1": {
        title: "Principes de bonne gouvernance",
        content: `
          <h2>Principes de bonne gouvernance</h2>
          <p>La bonne gouvernance est un ensemble de principes et de pratiques qui visent à assurer une gestion efficace, transparente et responsable des affaires publiques.</p>
          <p>Elle repose sur des valeurs telles que l'État de droit, la participation, la transparence, la responsabilité, l'équité et l'efficacité.</p>
          <h3>Les piliers de la bonne gouvernance</h3>
          <ul>
            <li><strong>État de droit:</strong> Respect des lois et des institutions</li>
            <li><strong>Participation:</strong> Implication des citoyens dans la prise de décision</li>
            <li><strong>Transparence:</strong> Accès à l'information et redevabilité</li>
            <li><strong>Responsabilité:</strong> Sanction des abus et des erreurs</li>
            <li><strong>Équité:</strong> Traitement égal de tous les citoyens</li>
            <li><strong>Efficacité:</strong> Utilisation optimale des ressources publiques</li>
          </ul>
          <p>La bonne gouvernance est un facteur clé de développement économique et social.</p>
        `
      },
      "2": {
        title: "Lutte contre la corruption",
        content: `
          <h2>Lutte contre la corruption</h2>
          <p>La corruption est un fléau qui mine la confiance dans les institutions, entrave le développement économique et social et porte atteinte aux droits de l'homme.</p>
          <p>Elle prend différentes formes, telles que la corruption, la concussion, le détournement de fonds, le favoritisme et le trafic d'influence.</p>
          <h3>Stratégies de lutte contre la corruption</h3>
          <ul>
            <li>Renforcer le cadre juridique et institutionnel</li>
            <li>Promouvoir la transparence et la redevabilité</li>
            <li>Sensibiliser et éduquer le public</li>
            <li>Soutenir la société civile et les médias</li>
            <li>Coopérer au niveau international</li>
          </ul>
          <p>La lutte contre la corruption est un impératif pour une société juste et prospère.</p>
        `
      },
      "3": {
        title: "Réformes institutionnelles",
        content: `
          <h2>Réformes institutionnelles</h2>
          <p>Les réformes institutionnelles sont des changements structurels et organisationnels qui visent à améliorer le fonctionnement des institutions publiques et à renforcer la démocratie.</p>
          <p>Elles peuvent porter sur la constitution, le système électoral, la justice, l'administration publique et les collectivités territoriales.</p>
          <h3>Objectifs des réformes institutionnelles</h3>
          <ul>
            <li>Renforcer l'État de droit et la séparation des pouvoirs</li>
            <li>Améliorer la représentativité et la participation</li>
            <li>Lutter contre la corruption et l'impunité</li>
            <li>Moderniser l'administration publique</li>
            <li>Décentraliser les compétences et les ressources</li>
          </ul>
          <p>Les réformes institutionnelles sont un levier essentiel de transformation politique et sociale.</p>
        `
      }
    },
    "economie": {
      "1": {
        title: "Les bases de l'économie",
        content: `
          <h2>Les bases de l'économie</h2>
          <p>L'économie est la science qui étudie la production, la distribution et la consommation des biens et des services.</p>
          <p>Elle s'intéresse aux choix que font les individus, les entreprises et les gouvernements pour allouer des ressources rares à des usages alternatifs.</p>
          <h3>Concepts clés de l'économie</h3>
          <ul>
            <li><strong>Offre et demande:</strong> Les forces qui déterminent les prix et les quantités</li>
            <li><strong>Marché:</strong> Le lieu où se rencontrent l'offre et la demande</li>
            <li><strong>Production:</strong> La création de biens et de services</li>
            <li><strong>Consommation:</strong> L'utilisation de biens et de services</li>
            <li><strong>Investissement:</strong> L'acquisition de biens durables</li>
          </ul>
          <p>L'économie est un domaine complexe et en constante évolution.</p>
        `
      },
      "2": {
        title: "Les politiques économiques",
        content: `
          <h2>Les politiques économiques</h2>
          <p>Les politiques économiques sont les actions que mènent les gouvernements pour influencer l'activité économique.</p>
          <p>Elles peuvent porter sur la monnaie, le budget, le commerce, l'emploi et l'environnement.</p>
          <h3>Types de politiques économiques</h3>
          <ul>
            <li><strong>Politique monétaire:</strong> Contrôle de la masse monétaire et des taux d'intérêt</li>
            <li><strong>Politique budgétaire:</strong> Gestion des dépenses et des recettes publiques</li>
            <li><strong>Politique commerciale:</strong> Réglementation des échanges internationaux</li>
            <li><strong>Politique de l'emploi:</strong> Mesures pour favoriser la création d'emplois</li>
            <li><strong>Politique environnementale:</strong> Protection de l'environnement</li>
          </ul>
          <p>Les politiques économiques ont un impact important sur la vie des citoyens.</p>
        `
      },
      "3": {
        title: "Le développement durable",
        content: `
          <h2>Le développement durable</h2>
          <p>Le développement durable est un mode de développement qui répond aux besoins du présent sans compromettre la capacité des générations futures à satisfaire les leurs.</p>
          <p>Il repose sur trois piliers: économique, social et environnemental.</p>
          <h3>Les enjeux du développement durable</h3>
          <ul>
            <li>Lutter contre la pauvreté et les inégalités</li>
            <li>Protéger l'environnement et les ressources naturelles</li>
            <li>Promouvoir une croissance économique inclusive et durable</li>
          </ul>
          <p>Le développement durable est un défi majeur pour l'humanité.</p>
        `
      }
    },
    "relations-internationales": {
      "1": {
        title: "Les acteurs des relations internationales",
        content: `
          <h2>Les acteurs des relations internationales</h2>
          <p>Les relations internationales sont l'ensemble des interactions entre les différents acteurs qui composent la scène mondiale.</p>
          <p>Ces acteurs peuvent être des États, des organisations internationales, des entreprises multinationales, des organisations non gouvernementales et des individus.</p>
          <h3>Les principaux acteurs</h3>
          <ul>
            <li><strong>Les États:</strong> Les acteurs traditionnels des relations internationales</li>
            <li><strong>Les organisations internationales:</strong> Les institutions créées par les États pour coopérer</li>
            <li><strong>Les entreprises multinationales:</strong> Les entreprises qui opèrent dans plusieurs pays</li>
            <li><strong>Les organisations non gouvernementales:</strong> Les associations qui défendent des causes</li>
            <li><strong>Les individus:</strong> Les personnalités qui influencent les relations internationales</li>
          </ul>
          <p>Les relations internationales sont un domaine complexe et en constante évolution.</p>
        `
      },
      "2": {
        title: "Les enjeux des relations internationales",
        content: `
          <h2>Les enjeux des relations internationales</h2>
          <p>Les relations internationales sont confrontées à de nombreux enjeux, tels que la paix et la sécurité, le développement économique et social, l'environnement et les droits de l'homme.</p>
          <p>Ces enjeux sont interdépendants et nécessitent une coopération internationale pour être résolus.</p>
          <h3>Les principaux enjeux</h3>
          <ul>
            <li><strong>La paix et la sécurité:</strong> Prévenir les conflits et assurer la stabilité</li>
            <li><strong>Le développement économique et social:</strong> Lutter contre la pauvreté et promouvoir la croissance</li>
            <li><strong>L'environnement:</strong> Protéger la planète et les ressources naturelles</li>
            <li><strong>Les droits de l'homme:</strong> Garantir les libertés fondamentales</li>
          </ul>
          <p>Les relations internationales sont un domaine essentiel pour l'avenir de l'humanité.</p>
        `
      },
      "3": {
        title: "La diplomatie",
        content: `
          <h2>La diplomatie</h2>
          <p>La diplomatie est l'art de négocier et de maintenir des relations pacifiques entre les États.</p>
          <p>Elle repose sur le dialogue, la négociation, la médiation et la conciliation.</p>
          <h3>Les outils de la diplomatie</h3>
          <ul>
            <li><strong>Les ambassades:</strong> Les représentations diplomatiques des États</li>
            <li><strong>Les traités:</strong> Les accords internationaux</li>
            <li><strong>Les organisations internationales:</strong> Les forums de discussion et de coopération</li>
            <li><strong>Les sanctions:</strong> Les mesures coercitives pour faire respecter le droit international</li>
          </ul>
          <p>La diplomatie est un instrument essentiel pour la paix et la sécurité internationales.</p>
        `
      }
    }
  };
  
  // Return content or default message
  return lessonMap[moduleId]?.[lessonId] || {
    title: "Contenu indisponible",
    content: "Le contenu de cette leçon n'est pas encore disponible."
  };
};
