import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface PetData {
  name: string;
  petType: string;
  weight: number;
  age: number;
  activity: string;
}

interface NutritionPlan {
  dailyAmount: number;
  meals: number;
  proteins: number;
  carbs: number;
  vegetables: number;
  fats: number;
}

const NutritionCalculator = () => {
  const [petData, setPetData] = useState<PetData>({
    name: "",
    petType: "",
    weight: 0,
    age: 0,
    activity: ""
  });
  
  const [nutritionPlan, setNutritionPlan] = useState<NutritionPlan | null>(null);
  const [showRecipes, setShowRecipes] = useState(false);

  const calculateNutrition = () => {
    // Cálculo diferenciado para cães e gatos
    const iscat = petData.petType === "gato";
    let baseAmount = iscat ? petData.weight * 25 : petData.weight * 20; // Gatos precisam de mais calorias por kg
    
    // Ajuste por atividade
    const activityMultiplier = {
      baixo: 0.8,
      moderado: 1.0,
      alto: iscat ? 1.2 : 1.3 // Gatos são menos ativos que cães
    }[petData.activity] || 1.0;
    
    // Ajuste por idade
    const ageMultiplier = petData.age < 1 ? 1.5 : petData.age > 7 ? 0.9 : 1.0;
    
    const dailyAmount = Math.round(baseAmount * activityMultiplier * ageMultiplier);
    
    // Número de refeições - gatos comem mais vezes ao dia
    const meals = iscat ? 3 : petData.weight < 15 ? 3 : 2;
    
    // Ajuste da composição para gatos (mais proteína, menos carboidrato)
    const proteinRatio = iscat ? 0.7 : 0.6;
    const carbRatio = iscat ? 0.15 : 0.25;
    const vegRatio = 0.1;
    const fatRatio = iscat ? 0.05 : 0.05;
    
    const plan: NutritionPlan = {
      dailyAmount,
      meals,
      proteins: Math.round(dailyAmount * proteinRatio),
      carbs: Math.round(dailyAmount * carbRatio),
      vegetables: Math.round(dailyAmount * vegRatio),
      fats: Math.round(dailyAmount * fatRatio)
    };
    
    setNutritionPlan(plan);
    setShowRecipes(true);
  };

  // Receitas simplificadas com menos ingredientes (-20%)
  const iscat = petData.petType === "gato";
  const recipes = [
    {
      name: iscat ? "Receita Felina Completa" : "Receita Canina Nutritiva",
      ingredients: [
        `${Math.round((nutritionPlan?.proteins || 0) * 0.8)}g de ${iscat ? 'frango desfiado' : 'carne moída magra'}`,
        `${Math.round((nutritionPlan?.proteins || 0) * 0.2)}g de fígado ${iscat ? 'de frango' : 'bovino'}`,
        `${nutritionPlan?.carbs}g de ${iscat ? 'arroz branco cozido' : 'batata-doce cozida'}`,
        `${nutritionPlan?.vegetables}g de abóbora cozida`,
        `1 colher de chá de ${iscat ? 'óleo de peixe' : 'óleo de coco'}`
      ]
    },
    {
      name: iscat ? "Receita Felina Saborosa" : "Receita Canina Alternativa", 
      ingredients: [
        `${Math.round((nutritionPlan?.proteins || 0) * 0.7)}g de ${iscat ? 'peixe cozido sem espinha' : 'coração bovino cozido'}`,
        `${Math.round((nutritionPlan?.proteins || 0) * 0.3)}g de ovo cozido picado`,
        `${nutritionPlan?.carbs}g de ${iscat ? 'aveia cozida' : 'mandioca cozida'}`,
        `${nutritionPlan?.vegetables}g de cenoura ${iscat ? 'bem cozida' : 'ralada'}`,
        `1 colher de chá de azeite de oliva`
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="shadow-warm border-0 bg-gradient-to-br from-white via-white to-primary-soft/40 hover-lift">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl text-primary flex items-center justify-center gap-3 mb-2 text-shadow">
            🐾 Dados do seu Pet
          </CardTitle>
          <p className="text-muted-foreground text-lg">
            {petData.petType === "gato" ? "🐱" : "🐶"} Preencha as informações para receitas personalizadas
          </p>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-lg font-medium">Nome do pet (opcional)</Label>
              <Input
                id="name"
                placeholder="Ex: Max, Luna, Mimi..."
                value={petData.name}
                onChange={(e) => setPetData({...petData, name: e.target.value})}
                className="h-12 text-lg border-2 border-muted focus:border-primary transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-lg font-medium">Tipo de Pet</Label>
              <Select value={petData.petType} onValueChange={(value) => setPetData({...petData, petType: value})}>
                <SelectTrigger className="h-12 text-lg border-2 border-muted">
                  <SelectValue placeholder="Cachorro ou gato?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cachorro">🐶 Cachorro</SelectItem>
                  <SelectItem value="gato">🐱 Gato</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="weight" className="text-lg font-medium">Peso (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="Ex: 5, 15, 25..."
                value={petData.weight || ""}
                onChange={(e) => setPetData({...petData, weight: Number(e.target.value)})}
                className="h-12 text-lg border-2 border-muted focus:border-primary transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age" className="text-lg font-medium">Idade (anos)</Label>
              <Input
                id="age"
                type="number"
                placeholder="Ex: 1, 3, 8..."
                value={petData.age || ""}
                onChange={(e) => setPetData({...petData, age: Number(e.target.value)})}
                className="h-12 text-lg border-2 border-muted focus:border-primary transition-colors"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label className="text-lg font-medium">Nível de atividade</Label>
              <Select value={petData.activity} onValueChange={(value) => setPetData({...petData, activity: value})}>
                <SelectTrigger className="h-12 text-lg border-2 border-muted">
                  <SelectValue placeholder="Como é a rotina do seu pet?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixo">😴 Baixo - Mais caseiro, poucas atividades</SelectItem>
                  <SelectItem value="moderado">🚶 Moderado - Atividades regulares, brincadeiras</SelectItem>
                  <SelectItem value="alto">🏃 Alto - Muito ativo, exercícios intensos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={calculateNutrition}
            disabled={!petData.weight || !petData.age || !petData.petType || !petData.activity}
            variant="hero"
            size="xl"
            className="w-full"
          >
            ✨ Criar Receitas Personalizadas
          </Button>
        </CardContent>
      </Card>

      {nutritionPlan && (
        <Card className="shadow-warm border-0 overflow-hidden hover-lift">
          <div className="bg-gradient-nature p-8 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            <div className="relative">
              <CardTitle className="text-2xl text-center text-primary mb-6 text-shadow">
                📊 Plano Nutricional {petData.name && `para ${petData.name}`}
                <span className="block text-lg text-muted-foreground mt-2">
                  {petData.petType === "gato" ? "🐱 Felino" : "🐶 Canino"} · {petData.weight}kg · {petData.age} anos
                </span>
              </CardTitle>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center p-6 bg-white/80 backdrop-blur rounded-2xl shadow-soft">
                <div className="text-3xl font-bold text-primary">{nutritionPlan.dailyAmount}g</div>
                <div className="text-sm text-muted-foreground mt-1">Total por dia</div>
              </div>
              <div className="text-center p-6 bg-white/80 backdrop-blur rounded-2xl shadow-soft">
                <div className="text-3xl font-bold text-primary">{nutritionPlan.meals}x</div>
                <div className="text-sm text-muted-foreground mt-1">Refeições</div>
              </div>
              <div className="text-center p-6 bg-white/80 backdrop-blur rounded-2xl shadow-soft">
                <div className="text-3xl font-bold text-primary">{Math.round(nutritionPlan.dailyAmount / nutritionPlan.meals)}g</div>
                <div className="text-sm text-muted-foreground mt-1">Por refeição</div>
              </div>
              <div className="text-center p-6 bg-white/80 backdrop-blur rounded-2xl shadow-soft">
                <div className="text-3xl font-bold text-primary">{petData.activity === "alto" ? "🏃" : petData.activity === "moderado" ? "🚶" : "😴"}</div>
                <div className="text-sm text-muted-foreground mt-1">Atividade</div>
              </div>
            </div>
            
            <Separator className="my-6 bg-white/30" />
            
            <h3 className="text-xl font-semibold mb-4 text-center">Distribuição dos Nutrientes:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Badge variant="secondary" className="p-4 text-center bg-white/90 hover:bg-white">
                <div>
                  <div className="font-bold text-lg">{petData.petType === "gato" ? "70%" : "60%"}</div>
                  <div className="text-sm text-muted-foreground">{nutritionPlan.proteins}g Proteínas</div>
                </div>
              </Badge>
              <Badge variant="secondary" className="p-4 text-center bg-white/90 hover:bg-white">
                <div>
                  <div className="font-bold text-lg">{petData.petType === "gato" ? "15%" : "25%"}</div>
                  <div className="text-sm text-muted-foreground">{nutritionPlan.carbs}g Carboidratos</div>
                </div>
              </Badge>
              <Badge variant="secondary" className="p-4 text-center bg-white/90 hover:bg-white">
                <div>
                  <div className="font-bold text-lg">10%</div>
                  <div className="text-sm text-muted-foreground">{nutritionPlan.vegetables}g Vegetais</div>
                </div>
              </Badge>
              <Badge variant="secondary" className="p-4 text-center bg-white/90 hover:bg-white">
                <div>
                  <div className="font-bold text-lg">5%</div>
                  <div className="text-sm text-muted-foreground">{nutritionPlan.fats}g Gorduras</div>
                </div>
              </Badge>
            </div>
            </div>
          </div>
        </Card>
      )}

      {showRecipes && nutritionPlan && (
        <div className="grid md:grid-cols-2 gap-8">
          {recipes.map((recipe, index) => (
            <Card key={index} className="shadow-warm border-0 overflow-hidden group hover-lift bg-gradient-to-br from-white to-primary-soft/20">
              <CardHeader className="bg-gradient-to-r from-primary to-primary-glow text-white p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
                <CardTitle className="text-xl flex items-center gap-3 relative z-10 text-shadow">
                  {petData.petType === "gato" ? "🐱" : "🐶"} {recipe.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 bg-gradient-to-br from-white to-primary-soft/30">
                <div className="space-y-4">
                  {recipe.ingredients.map((ingredient, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-white/80 backdrop-blur rounded-xl shadow-soft hover:shadow-button transition-all duration-300 border border-primary/10">
                      <span className="w-3 h-3 bg-gradient-to-r from-primary to-primary-glow rounded-full mt-1.5 flex-shrink-0 animate-pulse"></span>
                      <span className="text-base font-medium text-foreground">{ingredient}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-gradient-nature rounded-xl border border-primary/20 glass-effect">
                  <p className="text-sm text-foreground">
                    <strong className="text-primary">💡 Dica:</strong> Cozinhe todos os ingredientes sem temperos, sal ou condimentos. 
                    {petData.petType === "gato" ? " Gatos preferem temperatura ambiente ou levemente aquecido." : " Misture tudo e sirva na temperatura ambiente."}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NutritionCalculator;