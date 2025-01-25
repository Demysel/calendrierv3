import { getSession } from 'next-auth/react';
import Event from '@/models/Event';
import { dbConnect } from '@/lib/dbConnect';

export default async function handler(req, res) {
  await dbConnect();
  const session = await getSession({ req });

  if (!session) return res.status(401).json({ error: 'Non autorisé' });

  switch (req.method) {
    case 'GET':
      const events = await Event.find({ user: session.user.id });
      return res.json(events);

    case 'POST':
      try {
        const event = await Event.create({ 
          ...req.body,
          user: session.user.id 
        });
        return res.status(201).json(event);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(405).end();
  }
}
