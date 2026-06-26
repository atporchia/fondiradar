import type { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.trim() ?? ''

  if (q.length < 2) {
    return Response.json({ comuni: [] })
  }

  const { data, error } = await supabaseAdmin
    .from('comuni')
    .select('nome, province, region, total_projects, total_funding')
    .ilike('nome', `%${q}%`)
    .order('total_funding', { ascending: false })
    .limit(10)

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ comuni: data ?? [] })
}
