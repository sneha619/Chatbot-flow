"use client"

import type React from "react"

import type { Node } from "@xyflow/react"
import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NodesPanelProps {
  nodes: Node[]
  setNodes: (nodes: Node[] | ((nodes: Node[]) => Node[])) => void
}

export function NodesPanel({ setNodes }: NodesPanelProps) {
  // Handle drag start for node creation
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType)
    event.dataTransfer.effectAllowed = "move"
  }

  // Add a new text node to the canvas
  const addTextNode = () => {
    const newNode: Node = {
      id: `text-${Date.now()}`,
      type: "textNode",
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: {
        text: "New message",
      },
    }

    setNodes((nds) => [...nds, newNode])
  }

  return (
    <div className="p-4 h-full">
      <h2 className="text-lg font-semibold mb-4 text-sidebar-foreground">Nodes Panel</h2>

      <div className="space-y-4">
        {/* Draggable Text Node */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-sidebar-foreground">Message Nodes</h3>

          <div
            className="flex items-center gap-3 p-3 border border-sidebar-border rounded-lg cursor-grab active:cursor-grabbing bg-card hover:bg-accent/10 transition-colors"
            draggable
            onDragStart={(event) => onDragStart(event, "textNode")}
          >
            <MessageSquare className="w-5 h-5 text-sidebar-primary" />
            <span className="text-sm text-card-foreground">Text Message</span>
          </div>

          {/* Alternative: Click to add button */}
          <Button onClick={addTextNode} variant="outline" size="sm" className="w-full bg-transparent">
            Add Text Node
          </Button>
        </div>

        {/* Future node types can be added here */}
        <div className="pt-4 border-t border-sidebar-border">
          <p className="text-xs text-muted-foreground">More node types will be available in future updates</p>
        </div>
      </div>
    </div>
  )
}
