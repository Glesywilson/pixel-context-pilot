import { Loader2, Sparkles } from "lucide-react";

interface ProcessingLoaderProps {
  stage: "uploading" | "analyzing" | "optimizing" | "finalizing";
}

const stages = {
  uploading: { text: "Carregando sua imagem...", progress: 25 },
  analyzing: { text: "Analisando contexto...", progress: 50 },
  optimizing: { text: "Otimizando imagem...", progress: 75 },
  finalizing: { text: "Finalizando...", progress: 95 },
};

export function ProcessingLoader({ stage }: ProcessingLoaderProps) {
  const { text, progress } = stages[stage];

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-12">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center animate-pulse">
          <Sparkles className="w-12 h-12 text-primary-foreground" />
        </div>
        <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-spin" style={{ animationDuration: "3s" }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary" />
        </div>
      </div>

      <div className="text-center space-y-3">
        <h3 className="text-2xl font-bold">{text}</h3>
        <p className="text-muted-foreground">Isso deve levar apenas alguns segundos</p>
      </div>

      <div className="w-full max-w-md">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
          <span>Processando</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
