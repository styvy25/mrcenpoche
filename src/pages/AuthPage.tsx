
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import MainLayout from '@/components/layout/MainLayout';
import Logo from '@/components/branding/Logo';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

const AuthPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login, register } = useAuth();
  
  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSuccess = () => {
    navigate('/');
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-center py-10">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex justify-center mb-6">
              <Logo size="large" />
            </div>
            
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Connexion</TabsTrigger>
                <TabsTrigger value="register">Inscription</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm 
                  onSuccess={handleSuccess} 
                  onSwitchToRegister={() => document.querySelector('[value="register"]')?.dispatchEvent(new Event('click'))} 
                />
              </TabsContent>
              <TabsContent value="register">
                <RegisterForm 
                  onSuccess={handleSuccess} 
                  onSwitchToLogin={() => document.querySelector('[value="login"]')?.dispatchEvent(new Event('click'))} 
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AuthPage;
