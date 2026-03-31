/** Throw with Supabase error message when { data, error } has error. */
export async function unwrap(promise) {
  const result = await promise;
  if (result?.error) {
    throw new Error(result.error.message || 'Database request failed');
  }
  return result.data;
}
