import { supabase } from './supabase';

export const adminApi = {
  portfolio: {
    list: () => supabase?.from('portfolio').select('*').order('sort_order') ?? { data: [], error: null },
    add: (data) => supabase?.from('portfolio').insert(data).select().single(),
    update: (id, data) => supabase?.from('portfolio').update(data).eq('id', id).select().single(),
    delete: (id) => supabase?.from('portfolio').delete().eq('id', id),
  },
  blog: {
    list: () => supabase?.from('blog_posts').select('*').order('date', { ascending: false }),
    add: (data) => supabase?.from('blog_posts').insert(data).select().single(),
    update: (id, data) => supabase?.from('blog_posts').update(data).eq('id', id).select().single(),
    delete: (id) => supabase?.from('blog_posts').delete().eq('id', id),
  },
  team: {
    list: () => supabase?.from('team_members').select('*').order('sort_order'),
    add: (data) => supabase?.from('team_members').insert(data).select().single(),
    update: (id, data) => supabase?.from('team_members').update(data).eq('id', id).select().single(),
    delete: (id) => supabase?.from('team_members').delete().eq('id', id),
  },
  testimonials: {
    list: () => supabase?.from('testimonials').select('*').order('sort_order'),
    add: (data) => supabase?.from('testimonials').insert(data).select().single(),
    update: (id, data) => supabase?.from('testimonials').update(data).eq('id', id).select().single(),
    delete: (id) => supabase?.from('testimonials').delete().eq('id', id),
  },
  settings: {
    get: () => supabase?.from('site_settings').select('*').single(),
    update: (data) => supabase?.from('site_settings').update({ ...data, updated_at: new Date().toISOString() }).eq('id', 'default').select().single(),
  },
  contacts: {
    list: () => supabase?.from('contact_submissions').select('*').order('created_at', { ascending: false }),
    delete: (id) => supabase?.from('contact_submissions').delete().eq('id', id),
  },
  services: {
    list: () => supabase?.from('services').select('*').order('sort_order'),
    upsert: (data) => supabase?.from('services').upsert(data, { onConflict: 'id' }).select().single(),
    delete: (id) => supabase?.from('services').delete().eq('id', id),
  },
};
