import { ShoppingCart, Instagram, Globe, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Context {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  optimizations: string[];
}

const contexts: Context[] = [
  {
    id: "ecommerce",
    name: "E-commerce",
    description: "Otimizado para lojas online e marketplaces",
    icon: ShoppingCart,
    optimizations: ["Alta qualidade", "Compressão balanceada", "Detalhes preservados"],
  },
  {
    id: "instagram",
    name: "Instagram",
    description: "Perfeito para feeds e stories",
    icon: Instagram,
    optimizations: ["Aspecto 1:1 ou 9:16", "Cores vibrantes", "Tamanho otimizado"],
  },
  {
    id: "web",
    name: "Website",
    description: "Para sites e landing pages",
    icon: Globe,
    optimizations: ["Carregamento rápido", "SEO friendly", "Responsivo"],
  },
  {
    id: "general",
    name: "Geral",
    description: "Uso versátil e equilibrado",
    icon: Sparkles,
    optimizations: ["Qualidade alta", "Compressão eficiente", "Compatível"],
  },
];

interface ContextSelectorProps {
  selectedContext: string;
  onSelectContext: (contextId: string) => void;
}

export function ContextSelector({ selectedContext, onSelectContext }: ContextSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">Selecione o contexto</h2>
        <p className="text-muted-foreground">
          Escolha onde a imagem será usada para otimização personalizada
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contexts.map((context) => {
          const Icon = context.icon;
          const isSelected = selectedContext === context.id;

          return (
            <button
              key={context.id}
              onClick={() => onSelectContext(context.id)}
              className={cn(
                "relative p-6 rounded-xl border-2 text-left transition-all duration-300",
                "hover:scale-[1.02] hover:shadow-md",
                isSelected
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border hover:border-primary/50"
              )}
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "rounded-lg p-3 transition-colors",
                    isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                  )}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{context.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{context.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {context.optimizations.map((opt) => (
                      <span
                        key={opt}
                        className={cn(
                          "text-xs px-2 py-1 rounded-md",
                          isSelected
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {opt}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
