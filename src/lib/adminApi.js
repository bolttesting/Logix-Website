import { supabase } from './supabase';
import { unwrap } from './supabaseResult';

function requireSupabase() {
  if (!supabase) throw new Error('Supabase is not configured');
  return supabase;
}

export const adminApi = {
  portfolio: {
    list: () => supabase?.from('portfolio').select('*').order('sort_order') ?? { data: [], error: null },
    add: (data) => unwrap(requireSupabase().from('portfolio').insert(data).select().single()),
    update: (id, data) => unwrap(requireSupabase().from('portfolio').update(data).eq('id', id).select().single()),
    delete: (id) => unwrap(requireSupabase().from('portfolio').delete().eq('id', id)),
  },
  blog: {
    list: () => supabase?.from('blog_posts').select('*').order('date', { ascending: false }),
    add: (data) => unwrap(requireSupabase().from('blog_posts').insert(data).select().single()),
    update: (id, data) => unwrap(requireSupabase().from('blog_posts').update(data).eq('id', id).select().single()),
    delete: (id) => unwrap(requireSupabase().from('blog_posts').delete().eq('id', id)),
  },
  team: {
    list: () => supabase?.from('team_members').select('*').order('sort_order'),
    add: (data) => unwrap(requireSupabase().from('team_members').insert(data).select().single()),
    update: (id, data) => unwrap(requireSupabase().from('team_members').update(data).eq('id', id).select().single()),
    delete: (id) => unwrap(requireSupabase().from('team_members').delete().eq('id', id)),
  },
  testimonials: {
    list: () => supabase?.from('testimonials').select('*').order('sort_order'),
    add: (data) => unwrap(requireSupabase().from('testimonials').insert(data).select().single()),
    update: (id, data) => unwrap(requireSupabase().from('testimonials').update(data).eq('id', id).select().single()),
    delete: (id) => unwrap(requireSupabase().from('testimonials').delete().eq('id', id)),
  },
  settings: {
    get: () => supabase?.from('site_settings').select('*').single(),
    update: (data) =>
      unwrap(
        requireSupabase()
          .from('site_settings')
          .update({ ...data, updated_at: new Date().toISOString() })
          .eq('id', 'default')
          .select()
          .single(),
      ),
  },
  contacts: {
    list: () => supabase?.from('contact_submissions').select('*').order('created_at', { ascending: false }),
    delete: (id) => unwrap(requireSupabase().from('contact_submissions').delete().eq('id', id)),
  },
  services: {
    list: () => supabase?.from('services').select('*').order('sort_order'),
    upsert: (data) => unwrap(requireSupabase().from('services').upsert(data, { onConflict: 'id' }).select().single()),
    delete: (id) => unwrap(requireSupabase().from('services').delete().eq('id', id)),
  },
};
