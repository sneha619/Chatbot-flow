"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import {
  ReactFlow,
  type Node,
  type Edge,
  addEdge,
  type Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
  ReactFlowProvider,
  useReactFlow,
  type NodeTypes,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"

import { NodesPanel } from "@/components/NodesPanel"
import { SettingsPanel } from "@/components/SettingsPanel"
import { TextNode } from "@/components/nodes/TextNode"
import { SaveButton } from "@/components/SaveButton"
import { validateFlow, getFlowValidationMessage } from "@/utils/flowValidation"

// Define the custom node types
const nodeTypes = {
  textNode: TextNode,
}

// Initial nodes and edges
const initialNodes: Node[] = []
const initialEdges: Edge[] = []

function FlowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const { screenToFlowPosition: projectPosition } = useReactFlow()

  // Handle new connections between nodes
  const onConnect = useCallback(
    (params: Connection) => {
      // Ensure only one edge can originate from a source handle
      const existingEdge = edges.find(
        (edge) => edge.source === params.source && edge.sourceHandle === params.sourceHandle,
      )

      if (existingEdge) {
        // Remove existing edge before adding new one
        setEdges((eds) => eds.filter((edge) => edge.id !== existingEdge.id))
      }

      setEdges((eds) => addEdge(params, eds))
    },
    [edges, setEdges],
  )

  // Handle node selection
  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node)
  }, [])

  // Handle clicking on empty canvas
  const onPaneClick = useCallback(() => {
    setSelectedNode(null)
  }, [])

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect()
      const type = event.dataTransfer.getData("application/reactflow")

      // Check if the dropped element is a valid node type
      if (typeof type === "undefined" || !type || !reactFlowBounds) {
        return
      }

      // Calculate position relative to the ReactFlow canvas
      const position = projectPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: {
          text: "New message",
        },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [projectPosition, setNodes],
  )

  // Handle node data updates
  const updateNodeData = useCallback(
    (nodeId: string, data: { text: string }) => {
      setNodes((nds) => nds.map((node) => (node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node)))
    },
    [setNodes],
  )

  // Handle node deletion
  const deleteNode = useCallback(
    (nodeId: string) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId))
      setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId))
      setSelectedNode(null)
    },
    [setNodes, setEdges],
  )

  // Handle save action
  const handleSave = useCallback(() => {
    const validation = validateFlow(nodes, edges)

    if (!validation.isValid) {
      alert(`Cannot save flow: ${validation.error}`)
      return
    }

    // Show validation message including warnings
    const message = getFlowValidationMessage(nodes, edges)

    if (validation.warnings && validation.warnings.length > 0) {
      const proceed = confirm(`${message}\n\nDo you want to save anyway?`)
      if (!proceed) return
    }

    // Here you would typically save to a backend
    alert("Flow saved successfully!")
    console.log("Saved flow:", {
      nodes,
      edges,
      metadata: {
        nodeCount: nodes.length,
        edgeCount: edges.length,
        savedAt: new Date().toISOString(),
      },
    })
  }, [nodes, edges])

  return (
    <div className="h-full w-full flex">
      {/* Main flow canvas */}
      <div className="flex-1 relative" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes as unknown as NodeTypes}
          fitView
          className="bg-background"
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
          <Controls />
        </ReactFlow>

        {/* Save button positioned in top-right of canvas */}
        <div className="absolute top-4 right-4 z-10">
          <SaveButton onSave={handleSave} disabled={nodes.length === 0} />
        </div>
      </div>

      {/* Right sidebar - either nodes panel or settings panel */}
      <div className="w-80 border-l border-border bg-sidebar">
        {selectedNode ? (
          <SettingsPanel
            selectedNode={selectedNode}
            onUpdateNode={updateNodeData}
            onDeleteNode={deleteNode}
            onClose={() => setSelectedNode(null)}
          />
        ) : (
          <NodesPanel nodes={nodes} setNodes={setNodes} />
        )}
      </div>
    </div>
  )
}

export function FlowBuilder() {
  return (
    <ReactFlowProvider>
      <FlowCanvas />
    </ReactFlowProvider>
  )
}
