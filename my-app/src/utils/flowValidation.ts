import type { Node, Edge } from "@xyflow/react"

interface ValidationResult {
  isValid: boolean
  error?: string
  warnings?: string[]
}

/**
 * Validates the chatbot flow according to the requirements:
 * - If there are more than one nodes, no more than one node should have empty target handles
 * - Additional validations for better UX
 */
export function validateFlow(nodes: Node[], edges: Edge[]): ValidationResult {
  const warnings: string[] = []

  // If there are no nodes, it's invalid
  if (nodes.length === 0) {
    return {
      isValid: false,
      error: "Flow must contain at least one node.",
    }
  }

  // If there's only one node, it's always valid
  if (nodes.length === 1) {
    // Check if the single node has text
    const node = nodes[0]
    if (!node.data?.text || (typeof node.data.text === 'string' && node.data.text.trim() === "")) {
      warnings.push("The node has no message text.")
    }
    return { isValid: true, warnings }
  }

  // Find nodes that don't have any incoming edges (empty target handles)
  const nodesWithoutIncomingEdges = nodes.filter((node) => {
    return !edges.some((edge) => edge.target === node.id)
  })

  // If more than one node has empty target handles, it's invalid
  if (nodesWithoutIncomingEdges.length > 1) {
    return {
      isValid: false,
      error: `Multiple nodes (${nodesWithoutIncomingEdges.length}) have empty target handles. Only one starting node is allowed.`,
    }
  }

  // If no nodes have empty target handles, it's invalid (no starting point)
  if (nodesWithoutIncomingEdges.length === 0) {
    return {
      isValid: false,
      error: "Flow must have at least one starting node (a node with no incoming connections).",
    }
  }

  // Check for nodes without text
  const nodesWithoutText = nodes.filter((node) => !node.data?.text || (typeof node.data.text === 'string' && node.data.text.trim() === ""))
  if (nodesWithoutText.length > 0) {
    warnings.push(`${nodesWithoutText.length} node(s) have no message text.`)
  }

  // Check for disconnected nodes (nodes with no connections at all)
  const disconnectedNodes = nodes.filter((node) => {
    const hasIncoming = edges.some((edge) => edge.target === node.id)
    const hasOutgoing = edges.some((edge) => edge.source === node.id)
    return !hasIncoming && !hasOutgoing && nodes.length > 1
  })

  if (disconnectedNodes.length > 0) {
    warnings.push(`${disconnectedNodes.length} node(s) are not connected to the flow.`)
  }

  // Check for dead ends (nodes with no outgoing connections except the last nodes)
  const deadEndNodes = nodes.filter((node) => {
    const hasOutgoing = edges.some((edge) => edge.source === node.id)
    const hasIncoming = edges.some((edge) => edge.target === node.id)
    return hasIncoming && !hasOutgoing
  })

  if (deadEndNodes.length === 0 && nodes.length > 1) {
    warnings.push("Flow has no end points. Consider adding nodes that don't connect to other nodes.")
  }

  return { isValid: true, warnings }
}

/**
 * Enhanced validation with detailed feedback
 */
export function getFlowValidationMessage(nodes: Node[], edges: Edge[]): string {
  const validation = validateFlow(nodes, edges)

  if (!validation.isValid) {
    return validation.error!
  }

  let message = "Flow is valid and ready to save!"

  if (validation.warnings && validation.warnings.length > 0) {
    message += "\n\nWarnings:\n" + validation.warnings.map((w) => `• ${w}`).join("\n")
  }

  return message
}