"use client"

import { Handle, Position, type NodeProps } from "@xyflow/react"
import { MessageSquare, Grip } from "lucide-react"

interface TextNodeData {
  text: string
  [key: string]: unknown
}

export function TextNode({ data, selected }: NodeProps<TextNodeData>) {
  const displayText = (data as TextNodeData).text || "Enter your message..."
  const isPlaceholder = !(data as TextNodeData).text

  return (
    <div
      className={`
      min-w-[200px] max-w-[300px] rounded-lg border-2 bg-card shadow-sm
      ${selected ? "border-primary shadow-lg ring-2 ring-primary/20" : "border-border"}
      transition-all duration-200 hover:shadow-md
    `}
    >
      {/* Target handle - can receive multiple connections */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-primary border-2 !border-background hover:!bg-accent transition-colors"
        style={{ top: -6 }}
      />

      {/* Node header */}
      <div className="flex items-center justify-between p-3 pb-2 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
            <MessageSquare className="w-3 h-3 text-primary" />
          </div>
          <span className="text-xs font-medium text-muted-foreground">Text Message</span>
        </div>
        <Grip className="w-3 h-3 text-muted-foreground" />
      </div>

      {/* Node content */}
      <div className="p-3 pt-2">
        <div
          className={`
          text-sm leading-relaxed break-words
          ${isPlaceholder ? "text-muted-foreground italic" : "text-card-foreground"}
        `}
        >
          {displayText.length > 100 ? `${displayText.substring(0, 100)}...` : displayText}
        </div>
      </div>

      {/* Source handle - only one connection allowed */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-primary border-2 !border-background hover:!bg-accent transition-colors"
        style={{ bottom: -6 }}
      />
    </div>
  )
}
