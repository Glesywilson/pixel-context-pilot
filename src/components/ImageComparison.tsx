import { ArrowRight, Download, FileImage } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface ImageComparisonProps {
  originalImage: string;
  optimizedImage: string;
  originalSize: number;
  optimizedSize: number;
  compressionRatio: number;
  onDownload: () => void;
  onReset: () => void;
}

export function ImageComparison({
  originalImage,
  optimizedImage,
  originalSize,
  optimizedSize,
  compressionRatio,
  onDownload,
  onReset,
}: ImageComparisonProps) {
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success">
          <FileImage className="w-5 h-5" />
          <span className="font-semibold">Otimização concluída!</span>
        </div>
        <h2 className="text-3xl font-bold">Sua imagem está pronta</h2>
        <p className="text-muted-foreground">
          Redução de <span className="text-primary font-semibold">{compressionRatio}%</span> no tamanho
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Original */}
        <div className="space-y-3">
          <div className="relative rounded-xl overflow-hidden bg-muted border-2 border-border">
            <img
              src={originalImage}
              alt="Original"
              className="w-full h-64 object-contain"
            />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-background/90 backdrop-blur-sm text-sm font-medium">
              Original
            </div>
          </div>
          <div className="flex justify-between items-center px-2">
            <span className="text-sm text-muted-foreground">Tamanho</span>
            <span className="font-semibold">{formatSize(originalSize)}</span>
          </div>
        </div>

        {/* Optimized */}
        <div className="space-y-3">
          <div className="relative rounded-xl overflow-hidden bg-muted border-2 border-primary">
            <img
              src={optimizedImage}
              alt="Otimizada"
              className="w-full h-64 object-contain"
            />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-primary text-primary-foreground text-sm font-medium">
              Otimizada
            </div>
          </div>
          <div className="flex justify-between items-center px-2">
            <span className="text-sm text-muted-foreground">Tamanho</span>
            <span className="font-semibold text-success">{formatSize(optimizedSize)}</span>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 p-6 rounded-xl bg-gradient-card border border-border">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Economia</p>
          <p className="text-2xl font-bold text-success">
            {formatSize(originalSize - optimizedSize)}
          </p>
        </div>
        <div className="text-center border-x border-border">
          <p className="text-sm text-muted-foreground mb-1">Qualidade</p>
          <p className="text-2xl font-bold text-primary">98%</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Formato</p>
          <p className="text-2xl font-bold">WebP</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={onDownload} variant="hero" size="lg" className="flex-1">
          <Download className="w-5 h-5" />
          Baixar Imagem Otimizada
        </Button>
        <Button onClick={onReset} variant="outline" size="lg">
          Otimizar Outra
        </Button>
      </div>
    </div>
  );
}
