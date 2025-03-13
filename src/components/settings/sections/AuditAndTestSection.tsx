
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, Server, Database, AlertCircle, RefreshCw } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { auditAuthSystem, testAPIKeysConfig } from "@/utils/authAudit";

const AuditAndTestSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState<any>(null);
  const [apiKeysStatus, setApiKeysStatus] = useState<any>(null);

  const runTests = async () => {
    setIsLoading(true);
    try {
      const authResults = await auditAuthSystem();
      const apiKeysResults = await testAPIKeysConfig();
      
      setAuthStatus(authResults);
      setApiKeysStatus(apiKeysResults);
    } catch (error) {
      console.error("Error running tests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    runTests();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Audit et Tests</h2>
        <Button variant="outline" size="sm" onClick={runTests} disabled={isLoading} className="flex items-center gap-2">
          {isLoading ? (
            <>
              <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
              Analyse en cours...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4" />
              Actualiser les tests
            </>
          )}
        </Button>
      </div>
      
      <Separator className="my-2" />
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Authentication System Status */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Système d'authentification</CardTitle>
            <CardDescription>
              État du système d'authentification
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            {authStatus ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Connexion Supabase</span>
                  {authStatus.isSupabaseConnected ? (
                    <span className="flex items-center text-green-600">
                      <Check className="h-4 w-4 mr-1" />
                      Connecté
                    </span>
                  ) : (
                    <span className="flex items-center text-red-600">
                      <X className="h-4 w-4 mr-1" />
                      Non connecté
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Stockage local</span>
                  {authStatus.isLocalStorageAvailable ? (
                    <span className="flex items-center text-green-600">
                      <Check className="h-4 w-4 mr-1" />
                      Disponible
                    </span>
                  ) : (
                    <span className="flex items-center text-red-600">
                      <X className="h-4 w-4 mr-1" />
                      Non disponible
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Utilisateurs Supabase</span>
                  {authStatus.hasSupabaseUsers ? (
                    <span className="flex items-center text-green-600">
                      <Check className="h-4 w-4 mr-1" />
                      Trouvés
                    </span>
                  ) : (
                    <span className="flex items-center text-gray-500">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Aucun
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Utilisateurs locaux</span>
                  {authStatus.hasLocalUsers ? (
                    <span className="flex items-center text-green-600">
                      <Check className="h-4 w-4 mr-1" />
                      Trouvés
                    </span>
                  ) : (
                    <span className="flex items-center text-gray-500">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Aucun
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-24 flex items-center justify-center">
                <span className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full"></span>
              </div>
            )}
          </CardContent>
          <CardFooter className="bg-muted/50 pt-2">
            <div className="w-full">
              <h3 className="text-sm font-medium mb-2">Recommandations :</h3>
              {authStatus && authStatus.recommendations.length > 0 ? (
                <ul className="text-xs text-muted-foreground space-y-1">
                  {authStatus.recommendations.map((rec: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-gray-500 mr-1">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-muted-foreground">Aucune recommandation</p>
              )}
            </div>
          </CardFooter>
        </Card>
        
        {/* API Keys Status */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Configuration des API Keys</CardTitle>
            <CardDescription>
              État des clés API
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            {apiKeysStatus ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Keys Supabase</span>
                  {apiKeysStatus.isSupabaseConfigured ? (
                    <span className="flex items-center text-green-600">
                      <Check className="h-4 w-4 mr-1" />
                      Configurées
                    </span>
                  ) : (
                    <span className="flex items-center text-gray-500">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Non configurées
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Keys locales</span>
                  {apiKeysStatus.isLocalConfigured ? (
                    <span className="flex items-center text-green-600">
                      <Check className="h-4 w-4 mr-1" />
                      Configurées
                    </span>
                  ) : (
                    <span className="flex items-center text-gray-500">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Non configurées
                    </span>
                  )}
                </div>
                
                <div className="pt-2">
                  <h3 className="text-sm font-medium">État global :</h3>
                  {apiKeysStatus.isSupabaseConfigured || apiKeysStatus.isLocalConfigured ? (
                    <div className="flex items-center mt-1 text-green-600">
                      <Database className="h-4 w-4 mr-2" />
                      <span>Les API keys sont correctement configurées</span>
                    </div>
                  ) : (
                    <div className="flex items-center mt-1 text-amber-600">
                      <Server className="h-4 w-4 mr-2" />
                      <span>Aucune API key n'est configurée</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-24 flex items-center justify-center">
                <span className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full"></span>
              </div>
            )}
          </CardContent>
          <CardFooter className="bg-muted/50 pt-2">
            <div className="w-full">
              <h3 className="text-sm font-medium mb-2">Recommandations :</h3>
              {apiKeysStatus && apiKeysStatus.recommendations.length > 0 ? (
                <ul className="text-xs text-muted-foreground space-y-1">
                  {apiKeysStatus.recommendations.map((rec: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-gray-500 mr-1">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-muted-foreground">Aucune recommandation</p>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AuditAndTestSection;
