import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function saveAudit(auditResult: any) {
  const { data, error } = await supabase
    .from("audits")
    .insert({
      audit_data: auditResult,
      total_monthly_spend: auditResult.totalMonthlySpend,
      total_monthly_savings: auditResult.totalMonthlySavings,
      total_annual_savings: auditResult.totalAnnualSavings,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getAudit(id: string) {
  const { data, error } = await supabase
    .from("audits")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function saveLead(
  auditId: string,
  email: string,
  companyName?: string,
  role?: string,
  teamSize?: number,
) {
  const { data, error } = await supabase
    .from("leads")
    .insert({
      audit_id: auditId,
      email,
      company_name: companyName,
      role,
      team_size: teamSize,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
