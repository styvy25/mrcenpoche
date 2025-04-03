
// Mock client Supabase pour résoudre les erreurs d'importation
export const supabase = {
  from: (table: string) => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: null }),
        order: () => ({
          data: [],
          error: null
        })
      })
    }),
    update: () => ({
      eq: async () => ({ data: null, error: null })
    }),
    insert: async () => ({ data: null, error: null }),
  }),
  auth: {
    getUser: async () => ({ data: { user: null }, error: null }),
  }
};
