"use client"

import { useState } from "react"
import { Save, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SaveButtonProps {
  onSave: () => void
  disabled?: boolean
}

export function SaveButton({ onSave, disabled = false }: SaveButtonProps) {
  const [saveState, setSaveState] = useState<"idle" | "saving" | "success" | "error">("idle")

  const handleSave = async () => {
    setSaveState("saving")

    try {
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate save delay
      onSave()
      setSaveState("success")

      // Reset to idle after showing success
      setTimeout(() => setSaveState("idle"), 2000)
    } catch {
      setSaveState("error")
      setTimeout(() => setSaveState("idle"), 3000)
    }
  }

  const getButtonContent = () => {
    switch (saveState) {
      case "saving":
        return (
          <>
            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            Saving...
          </>
        )
      case "success":
        return (
          <>
            <CheckCircle className="w-4 h-4" />
            Saved!
          </>
        )
      case "error":
        return (
          <>
            <AlertCircle className="w-4 h-4" />
            Error
          </>
        )
      default:
        return (
          <>
            <Save className="w-4 h-4" />
            Save Flow
          </>
        )
    }
  }

  const getButtonVariant = () => {
    switch (saveState) {
      case "success":
        return "default"
      case "error":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <Button
      onClick={handleSave}
      disabled={disabled || saveState === "saving"}
      variant={getButtonVariant()}
      className="flex items-center gap-2 min-w-[120px] justify-center"
    >
      {getButtonContent()}
    </Button>
  )
}
