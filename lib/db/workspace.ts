import { supabaseAdmin } from "../supabase";

export async function createWorkspace(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("workspaces")
    .insert({
      user_id: userId,
      name: "My Workspace",
    })
    .select()
    .single();

  return { data, error };
}
