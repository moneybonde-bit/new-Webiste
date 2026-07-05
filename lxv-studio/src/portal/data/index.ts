import type { PortalRepository } from "./repository";
import { isDemoMode } from "./supabaseClient";
import { DemoRepository } from "./demoRepository";
import { SupabaseRepository } from "./supabaseRepository";

export { isDemoMode } from "./supabaseClient";
export type { PortalRepository, SubmitConsultationInput } from "./repository";

let instance: PortalRepository | null = null;

/** The app-wide data source: Supabase when configured, local demo otherwise. */
export function getRepository(): PortalRepository {
  if (!instance) {
    instance = isDemoMode ? new DemoRepository() : new SupabaseRepository();
  }
  return instance;
}
