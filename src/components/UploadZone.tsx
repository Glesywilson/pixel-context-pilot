import { Upload, Image as ImageIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  isProcessing?: boolean;
}

export function UploadZone({ onFileSelect, isProcessing }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file && validateFile(file)) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && validateFile(file)) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const validateFile = (file: File): boolean => {
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 20 * 1024 * 1024; // 20MB

    if (!validTypes.includes(file.type)) {
      alert("Formato de arquivo não suportado. Por favor, use JPEG, PNG ou WebP.");
      return false;
    }

    if (file.size > maxSize) {
      alert("Arquivo excede o limite de 20MB. Por favor, comprima o arquivo.");
      return false;
    }

    return true;
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={cn(
        "relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all duration-300",
        "min-h-[320px] p-8 cursor-pointer",
        isDragging
          ? "border-primary bg-primary/5 scale-[1.02]"
          : "border-border hover:border-primary/50 hover:bg-muted/30",
        isProcessing && "pointer-events-none opacity-60"
      )}
    >
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={isProcessing}
      />

      <div className="flex flex-col items-center gap-4 text-center pointer-events-none">
        <div
          className={cn(
            "rounded-full p-6 transition-all duration-300",
            isDragging ? "bg-primary/10" : "bg-muted"
          )}
        >
          {isDragging ? (
            <ImageIcon className="w-12 h-12 text-primary" />
          ) : (
            <Upload className="w-12 h-12 text-muted-foreground" />
          )}
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">
            {isDragging ? "Solte a imagem aqui" : "Faça upload da sua imagem"}
          </h3>
          <p className="text-muted-foreground text-sm">
            Arraste e solte ou clique para selecionar
          </p>
          <p className="text-muted-foreground text-xs mt-2">
            JPEG, PNG ou WebP • Máximo 20MB
          </p>
        </div>
      </div>
    </div>
  );
}
