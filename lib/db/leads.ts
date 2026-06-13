import { supabaseAdmin } from "../supabase";

export async function createLead(data: any) {
  return supabaseAdmin.from("leads").insert(data);
}

export async function getLeads(workspace_id: string) {
  return supabaseAdmin
    .from("leads")
    .select("*")
    .eq("workspace_id", workspace_id);
}
