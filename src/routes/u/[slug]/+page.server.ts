import type { PageServerLoad } from './$types';
import { getAllCompte } from '$lib/db/compte'
import { error } from '@sveltejs/kit';

export const load = ( async ({ params }) => {
    
    const slug = params.slug; 
    const data = await getAllCompte(slug)
    if (!data) error(404)
    return { slug };

}) satisfies PageServerLoad;