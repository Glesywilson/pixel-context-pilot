import { useState } from "react";
import { Zap, Shield, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UploadZone } from "@/components/UploadZone";
import { ContextSelector } from "@/components/ContextSelector";
import { ProcessingLoader } from "@/components/ProcessingLoader";
import { ImageComparison } from "@/components/ImageComparison";
import { useToast } from "@/hooks/use-toast";

type Stage = "upload" | "context" | "processing" | "result";
type ProcessingStage = "uploading" | "analyzing" | "optimizing" | "finalizing";

const Index = () => {
  const [stage, setStage] = useState<Stage>("upload");
  const [processingStage, setProcessingStage] = useState<ProcessingStage>("uploading");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedContext, setSelectedContext] = useState("");
  const [originalImage, setOriginalImage] = useState("");
  const [optimizedImage, setOptimizedImage] = useState("");
  const [dailyCount, setDailyCount] = useState(0);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    if (dailyCount >= 5) {
      toast({
        title: "Limite diário atingido",
        description: "Você atingiu o limite de 5 imagens por dia. Considere a assinatura Premium para uso ilimitado.",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string);
      setStage("context");
    };
    reader.readAsDataURL(file);
  };

  const handleContextSelect = (contextId: string) => {
    setSelectedContext(contextId);
  };

  const handleOptimize = async () => {
    if (!selectedContext) {
      toast({
        title: "Selecione um contexto",
        description: "Por favor, escolha um contexto antes de continuar.",
        variant: "destructive",
      });
      return;
    }

    setStage("processing");

    // Simulate processing stages
    const stages: ProcessingStage[] = ["uploading", "analyzing", "optimizing", "finalizing"];
    
    for (let i = 0; i < stages.length; i++) {
      setProcessingStage(stages[i]);
      await new Promise(resolve => setTimeout(resolve, 1200));
    }

    // Simulate optimization (in production, this would call backend API)
    setOptimizedImage(originalImage); // Placeholder
    setDailyCount(prev => prev + 1);
    setStage("result");

    toast({
      title: "Otimização concluída!",
      description: "Sua imagem foi otimizada com sucesso.",
    });
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = optimizedImage;
    link.download = `optimized-${selectedFile?.name || "image"}.webp`;
    link.click();

    toast({
      title: "Download iniciado",
      description: "Sua imagem otimizada está sendo baixada.",
    });
  };

  const handleReset = () => {
    setStage("upload");
    setSelectedFile(null);
    setSelectedContext("");
    setOriginalImage("");
    setOptimizedImage("");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold">PixelContext</h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {dailyCount}/5 imagens hoje
            </span>
            <Button variant="hero" size="sm">
              Upgrade Premium
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {stage === "upload" && (
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-bold leading-tight">
                Otimização inteligente de imagens
                <br />
                <span className="text-primary">baseada em contexto</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Reduza o tamanho das suas imagens em até 80% sem perder qualidade,
                otimizadas especificamente para onde serão usadas.
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="p-6 rounded-xl bg-card border border-border text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Processamento Rápido</h3>
                <p className="text-sm text-muted-foreground">
                  Otimização em menos de 5 segundos
                </p>
              </div>

              <div className="p-6 rounded-xl bg-card border border-border text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">100% Seguro</h3>
                <p className="text-sm text-muted-foreground">
                  Suas imagens são deletadas automaticamente após 1 hora
                </p>
              </div>

              <div className="p-6 rounded-xl bg-card border border-border text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Gauge className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Alta Qualidade</h3>
                <p className="text-sm text-muted-foreground">
                  Mantém 98% da qualidade visual original
                </p>
              </div>
            </div>

            {/* Upload Zone */}
            <UploadZone onFileSelect={handleFileSelect} />
          </div>
        )}

        {stage === "context" && (
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Preview */}
            <div className="flex justify-center">
              <div className="relative rounded-xl overflow-hidden border-2 border-border max-w-md">
                <img src={originalImage} alt="Preview" className="w-full h-64 object-contain bg-muted" />
              </div>
            </div>

            <ContextSelector
              selectedContext={selectedContext}
              onSelectContext={handleContextSelect}
            />

            <div className="flex justify-center gap-4">
              <Button variant="outline" size="lg" onClick={handleReset}>
                Voltar
              </Button>
              <Button variant="hero" size="lg" onClick={handleOptimize} disabled={!selectedContext}>
                Otimizar Imagem
              </Button>
            </div>
          </div>
        )}

        {stage === "processing" && (
          <div className="max-w-2xl mx-auto">
            <ProcessingLoader stage={processingStage} />
          </div>
        )}

        {stage === "result" && selectedFile && (
          <div className="max-w-6xl mx-auto">
            <ImageComparison
              originalImage={originalImage}
              optimizedImage={optimizedImage}
              originalSize={selectedFile.size}
              optimizedSize={Math.floor(selectedFile.size * 0.35)} // Simulate 65% reduction
              compressionRatio={65}
              onDownload={handleDownload}
              onReset={handleReset}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background/80 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">
              Suas imagens são armazenadas temporariamente (máximo 1 hora) e deletadas automaticamente.
            </p>
            <p>
              © 2025 PixelContext. Otimização inteligente de imagens.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
