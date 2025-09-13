"use client"

import { useState, useEffect } from "react"
import type { Node } from "@xyflow/react"
import { X, MessageSquare, Save, RotateCcw, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface SettingsPanelProps {
  selectedNode: Node
  onUpdateNode: (nodeId: string, data: { text: string }) => void
  onDeleteNode: (nodeId: string) => void
  onClose: () => void
}

export function SettingsPanel({ selectedNode, onUpdateNode, onDeleteNode, onClose }: SettingsPanelProps) {
  const [text, setText] = useState(String(selectedNode.data.text || ""))
  const [hasChanges, setHasChanges] = useState(false)
  const originalText = String(selectedNode.data.text || "")

  // Update local state when selected node changes
  useEffect(() => {
    setText(String(selectedNode.data.text || ""))
    setHasChanges(false)
  }, [selectedNode])

  // Track changes
  useEffect(() => {
    setHasChanges(text !== originalText)
  }, [text, originalText])

  // Handle text change and update node
  const handleTextChange = (newText: string) => {
    setText(newText)
    onUpdateNode(selectedNode.id, { text: newText })
  }

  // Reset to original text
  const handleReset = () => {
    setText(originalText)
    onUpdateNode(selectedNode.id, { text: originalText })
    setHasChanges(false)
  }

  // Save changes
  const handleSave = () => {
    onUpdateNode(selectedNode.id, { text })
    setHasChanges(false)
  }

  // Handle delete node
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this node? This action cannot be undone.')) {
      onDeleteNode(selectedNode.id)
    }
  }

  return (
    <div className="p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-sidebar-foreground">Settings Panel</h2>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0 hover:bg-sidebar-accent">
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Node info card */}
      <div className="mb-6">
        <div className="flex items-center gap-3 p-4 rounded-lg bg-card border border-sidebar-border">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-card-foreground">Text Message Node</div>
            <div className="text-xs text-muted-foreground">ID: {selectedNode.id}</div>
          </div>
          {hasChanges && <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />}
        </div>
      </div>

      {/* Settings form */}
      <div className="flex-1 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="message-text" className="text-sm font-medium text-sidebar-foreground">
              Message Text
            </Label>
            <div className="text-xs text-muted-foreground">{typeof text === 'string' ? text.length : 0}/500</div>
          </div>

          <Textarea
            id="message-text"
            value={text}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              if (e.target.value.length <= 500) {
                handleTextChange(e.target.value)
              }
            }}
            placeholder="Enter your message..."
            className="min-h-[120px] resize-none"
          />

          <p className="text-xs text-muted-foreground">
            This text will be displayed in the chat when this node is reached.
          </p>

          {/* Action buttons */}
          <div className="flex gap-2 pt-2">
            {hasChanges && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <Save className="w-3 h-3" />
                  Save
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Node statistics */}
        <div className="space-y-3 pt-4 border-t border-sidebar-border">
          <h3 className="text-sm font-medium text-sidebar-foreground">Node Information</h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-2 rounded bg-muted">
              <div className="text-muted-foreground">Position</div>
              <div className="font-mono">
                {Math.round(selectedNode.position.x)}, {Math.round(selectedNode.position.y)}
              </div>
            </div>
            <div className="p-2 rounded bg-muted">
              <div className="text-muted-foreground">Type</div>
              <div className="font-mono">{selectedNode.type}</div>
            </div>
          </div>
        </div>

        {/* Advanced settings */}
        <div className="pt-4 border-t border-sidebar-border">
          <h3 className="text-sm font-medium text-sidebar-foreground mb-2">Advanced Settings</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Additional settings like conditions, delays, and integrations will be available in future updates.
          </p>
          
          {/* Delete node button */}
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            className="flex items-center gap-2 w-full"
          >
            <Trash2 className="w-3 h-3" />
            Delete Node
          </Button>
        </div>
      </div>
    </div>
  )
}
