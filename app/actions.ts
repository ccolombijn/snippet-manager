'use server'; // This marks all functions in this file as server-side only

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { db } from './db';


export async function createSnippet(formData: FormData) {
  // Extract values from the HTML form
  const title = formData.get('title') as string;
  const code = formData.get('code') as string;

  // Create the record in SQLite
  await db.snippet.create({
    data: {
      title,
      code,
    },
  });

  // Redirect back to the homepage
  redirect('/');
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });

  revalidatePath('/');
}

export async function editSnippet(id: number, formData: FormData) {
  const title = formData.get('title') as string;
  const code = formData.get('code') as string;

  await db.snippet.update({
    where: { id },
    data: { title, code },
  });

  redirect('/');
}