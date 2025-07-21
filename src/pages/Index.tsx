import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import NutritionCalculator from "@/components/NutritionCalculator";
import IngredientList from "@/components/IngredientList";
import heroImage from "@/assets/hero-pets.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState("calculator");
  const [supportData, setSupportData] = useState({ phone: "", help: "" });
  const [refundData, setRefundData] = useState({ email: "", reason: "" });
  const [showRefundSuccess, setShowRefundSuccess] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <img 
          src={heroImage} 
          alt="Cães e gatos felizes comendo comida natural" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div className="max-w-5xl px-6">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
              🐾 Dieta Pet Ancestral
            </h1>
            <p className="text-2xl md:text-3xl mb-8 drop-shadow-lg font-light">
              Receitas naturais personalizadas para <strong>cães e gatos</strong>
            </p>
            <Button 
              onClick={() => setActiveTab("calculator")}
              variant="hero"
              size="xl"
              className="animate-float"
            >
              ✨ Criar Receita Agora
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b shadow-soft">
        <div className="max-w-6xl mx-auto px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-16 bg-gradient-nature rounded-2xl p-2 mt-4 mb-4">
              <TabsTrigger value="calculator" className="text-lg py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-soft">
                🧮 Calculadora Nutricional
              </TabsTrigger>
              <TabsTrigger value="ingredients" className="text-lg py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-soft">
                🛒 Lista de Ingredientes
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="calculator">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-primary mb-6">
                  Calculadora de Receitas Naturais
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Preencha os dados do seu <strong>cão ou gato</strong> e receba receitas balanceadas 
                  e personalizadas para uma alimentação natural e saudável
                </p>
              </div>
              <NutritionCalculator />
            </div>
          </TabsContent>
          
          <TabsContent value="ingredients">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-primary mb-6">
                  Guia de Ingredientes
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Lista completa de ingredientes naturais com preços atualizados 
                  para uma alimentação saudável e econômica para <strong>cães e gatos</strong>
                </p>
              </div>
              <IngredientList />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-nature py-12 mt-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <Card className="shadow-warm border-0 bg-white/90 backdrop-blur">
              <CardContent className="p-6">
                <h3 className="font-bold text-primary mb-3 text-xl">🎯 Personalizado</h3>
                <p className="text-muted-foreground">
                  Receitas calculadas especificamente para seu cão ou gato
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-warm border-0 bg-white/90 backdrop-blur">
              <CardContent className="p-6">
                <h3 className="font-bold text-primary mb-3 text-xl">🌱 Natural</h3>
                <p className="text-muted-foreground">
                  Apenas ingredientes frescos e naturais, sem conservantes
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-warm border-0 bg-white/90 backdrop-blur">
              <CardContent className="p-6">
                <h3 className="font-bold text-primary mb-3 text-xl">💰 Econômico</h3>
                <p className="text-muted-foreground">
                  Ingredientes acessíveis e nutritivos para o dia a dia
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="flex gap-4 justify-center mt-8">
            {/* Botão Suporte */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg" className="bg-white/90 hover:bg-white border-primary text-primary hover:text-primary">
                  🎧 Suporte
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Precisa de Ajuda?</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Número de Telefone</Label>
                    <Input
                      id="phone"
                      placeholder="(11) 99999-9999"
                      value={supportData.phone}
                      onChange={(e) => setSupportData({...supportData, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="help">Tipo de Ajuda</Label>
                    <Select value={supportData.help} onValueChange={(value) => setSupportData({...supportData, help: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de ajuda" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="receitas">Dúvidas sobre receitas</SelectItem>
                        <SelectItem value="ingredientes">Ingredientes e nutrição</SelectItem>
                        <SelectItem value="tecnico">Problema técnico</SelectItem>
                        <SelectItem value="geral">Ajuda geral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    className="w-full" 
                    disabled={!supportData.phone || !supportData.help}
                    onClick={() => {
                      // Aqui você pode integrar com sistema de suporte
                      alert("Solicitação enviada! Nossa equipe entrará em contato em breve.");
                      setSupportData({phone: "", help: ""});
                    }}
                  >
                    Enviar Solicitação
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Botão Reembolso */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg" className="bg-white/90 hover:bg-white border-primary text-primary hover:text-primary">
                  💰 Reembolso
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Solicitar Reembolso</DialogTitle>
                </DialogHeader>
                {!showRefundSuccess ? (
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={refundData.email}
                        onChange={(e) => setRefundData({...refundData, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reason">Motivo do Reembolso</Label>
                      <Textarea
                        id="reason"
                        placeholder="Descreva o motivo da solicitação de reembolso..."
                        value={refundData.reason}
                        onChange={(e) => setRefundData({...refundData, reason: e.target.value})}
                        rows={3}
                      />
                    </div>
                    <Button 
                      className="w-full" 
                      disabled={!refundData.email || !refundData.reason}
                      onClick={() => {
                        setShowRefundSuccess(true);
                        setTimeout(() => {
                          setShowRefundSuccess(false);
                          setRefundData({email: "", reason: ""});
                        }, 3000);
                      }}
                    >
                      Solicitar Reembolso
                    </Button>
                  </div>
                ) : (
                  <div className="py-8 text-center space-y-4">
                    <div className="text-5xl">✅</div>
                    <h3 className="text-lg font-semibold text-green-600">Solicitação Enviada!</h3>
                    <p className="text-muted-foreground">
                      Nossa equipe analisará sua solicitação e procederá com o reembolso em até 2 dias úteis por questões bancárias.
                    </p>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
          
          <p className="text-muted-foreground text-lg mt-8">
            ❤️ Feito com amor para pets saudáveis e felizes
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
