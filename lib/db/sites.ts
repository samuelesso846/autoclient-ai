import { supabaseAdmin } from "../supabase";

export async function createSite(data: any) {
  return supabaseAdmin.from("sites").insert(data).select().single();
}

export async function getSite(id: string) {
  return supabaseAdmin.from("sites").select("*").eq("id", id).single();
}
