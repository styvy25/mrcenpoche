
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ModuleCategoryTabsProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const ModuleCategoryTabs = ({ activeCategory, setActiveCategory }: ModuleCategoryTabsProps) => {
  return (
    <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-6">
      <TabsList>
        <TabsTrigger value="all">Tous</TabsTrigger>
        <TabsTrigger value="beginner">Débutant</TabsTrigger>
        <TabsTrigger value="intermediate">Intermédiaire</TabsTrigger>
        <TabsTrigger value="advanced">Avancé</TabsTrigger>
        <TabsTrigger value="completed">Complétés</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ModuleCategoryTabs;
