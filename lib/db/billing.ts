import { supabaseAdmin } from "../supabase";

export async function updateSubscription(data: any) {
  return supabaseAdmin.from("subscriptions").upsert(data);
}
