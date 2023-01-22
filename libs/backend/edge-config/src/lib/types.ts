export type PatchEdgeConfigOpts = {
  edgeConfigId: string
  vercelApiToken: string
  vercelTeamId?: string
}

type PatchEdgeConfigItemValuePrimitives = string | number | object | null

export type PatchEdgeConfigItem = {
  operation: 'create' | 'update' | 'upsert' | 'delete'
  key: string
  value: PatchEdgeConfigItemValuePrimitives | PatchEdgeConfigItemValuePrimitives[]
}
