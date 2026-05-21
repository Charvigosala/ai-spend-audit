import { NextRequest, NextResponse } from 'next/server'
import { runAudit } from '@/lib/auditEngine'
import { saveAudit } from '@/lib/supabase'
import { generateSummary } from '@/lib/groq'
import { AuditInput } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const body: AuditInput = await req.json()
    if (!body.tools || body.tools.length === 0) {
      return NextResponse.json({ error: 'No tools provided' }, { status: 400 })
    }
    const auditResult = runAudit(body)
    const summary = await generateSummary(auditResult)
    auditResult.summary = summary
    const saved = await saveAudit(auditResult)
    return NextResponse.json({ ...auditResult, auditId: saved.id })
  } catch (error: any) {
    console.error('Audit error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
