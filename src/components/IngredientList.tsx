import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ingredientsIcon from "@/assets/ingredients-icon.jpg";

const IngredientList = () => {
  const ingredientCategories = [
    {
      title: "🥩 Proteínas e Vísceras",
      color: "bg-red-50 border-red-200",
      items: [
        { name: "Fígado de frango", price: "R$4 a R$8/kg" },
        { name: "Coração de frango", price: "R$6 a R$9/kg" },
        { name: "Moela de frango", price: "R$5 a R$9/kg" },
        { name: "Ovo de galinha", price: "R$0,70 a R$1,20/unid" },
        { name: "Carne moída (acém, patinho)", price: "R$9 a R$10/500g" },
        { name: "Carcaça/pescoço de frango", price: "R$3 a R$6/kg" }
      ]
    },
    {
      title: "🥕 Vegetais e Legumes",
      color: "bg-green-50 border-green-200",
      items: [
        { name: "Abóbora cabotiá", price: "R$3 a R$6/kg" },
        { name: "Cenoura", price: "R$4 a R$6/kg" },
        { name: "Chuchu", price: "R$3 a R$5/kg" },
        { name: "Beterraba", price: "R$4 a R$6/kg" },
        { name: "Vagem", price: "R$6 a R$10/kg" },
        { name: "Repolho", price: "R$3 a R$5/kg" },
        { name: "Abobrinha", price: "R$5 a R$8/kg" }
      ]
    },
    {
      title: "🍠 Carboidratos Naturais",
      color: "bg-yellow-50 border-yellow-200",
      items: [
        { name: "Batata-doce", price: "R$4 a R$7/kg" },
        { name: "Mandioca (aipim)", price: "R$3 a R$6/kg" },
        { name: "Arroz (branco/integral)", price: "R$5 a R$9/kg" },
        { name: "Aveia em flocos", price: "R$4 a R$9/200-500g" }
      ]
    },
    {
      title: "🥄 Gorduras Boas",
      color: "bg-orange-50 border-orange-200",
      items: [
        { name: "Óleo de coco", price: "R$8 a R$10/100ml" },
        { name: "Semente de linhaça", price: "R$4 a R$8/200g" },
        { name: "Banana", price: "R$3 a R$5/kg" },
        { name: "Azeite de oliva", price: "R$8 a R$15/250ml" }
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="shadow-soft mb-8">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img 
              src={ingredientsIcon} 
              alt="Ingredientes naturais" 
              className="w-24 h-24 rounded-xl object-cover"
            />
          </div>
          <CardTitle className="text-2xl text-primary">
            🛒 Lista de Ingredientes Acessíveis
          </CardTitle>
          <p className="text-muted-foreground">
            Ingredientes naturais e econômicos para alimentação caseira
          </p>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {ingredientCategories.map((category, index) => (
          <Card key={index} className={`shadow-soft ${category.color}`}>
            <CardHeader>
              <CardTitle className="text-lg">{category.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                    <span className="font-medium">{item.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {item.price}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-soft mt-8 bg-gradient-nature">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-primary mb-2">
              💡 Dicas de Economia
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white p-3 rounded-lg">
                <strong>🏪 Compre no atacado:</strong> Vísceras e carnes em maior quantidade
              </div>
              <div className="bg-white p-3 rounded-lg">
                <strong>🥕 Feira livre:</strong> Vegetais e legumes mais baratos
              </div>
              <div className="bg-white p-3 rounded-lg">
                <strong>❄️ Congele porções:</strong> Prepare e congele refeições semanais
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IngredientList;