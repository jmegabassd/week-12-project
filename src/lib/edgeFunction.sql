import { createClient } from 'npm:@supabase/supabase-js';
import { verifyWebhook } from 'npm:@clerk/backend/webhooks';
Deno.serve(async (req)=>{
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', {
      status: 405
    });
  }
  const webhookSecret = Deno.env.get('CLERK_WEBHOOK_SECRET');
  if (!webhookSecret) {
    return new Response('Webhook secret not configured', {
      status: 500
    });
  }
  let event;
  try {
    event = await verifyWebhook(req, {
      signingSecret: webhookSecret
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook signature', {
      status: 400
    });
  }
  const payload = event.data;
  const clerkUser = payload;
  const supabase = createClient(Deno.env.get('SUPABASE_URL'), Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'));
  try {
    let responseData;
    switch(event.type){
      case 'user.created':
        console.log('Handling user.created event');
        const { data: createdData, error: createdError } = await supabase.from('users').insert({
          clerk_id: clerkUser.id,
          username: clerkUser.username,
          image_url: clerkUser.image_url
        });
        if (createdError) throw createdError;
        responseData = createdData;
        break;
      case 'user.updated':
        console.log('Handling user.updated event');
        const { data: updatedData, error: updatedError } = await supabase.from('users').update({
          username: clerkUser.username,
          image_url: clerkUser.image_url
        }).eq('clerk_id', clerkUser.id);
        if (updatedError) throw updatedError;
        responseData = updatedData;
        break;
      case 'user.deleted':
        console.log('Handling user.deleted event');
        const userIdToDelete = clerkUser.id || payload.user_id;
        if (!userIdToDelete) {
          throw new Error('User ID not found in payload.');
        }
        const { data: deletedData, error: deletedError } = await supabase.from('users').delete().eq('clerk_id', userIdToDelete);
        if (deletedError) throw deletedError;
        responseData = deletedData;
        break;
      default:
        console.log(`Ignoring event type: ${event.type}`);
        return new Response(JSON.stringify({
          message: `Ignoring event type: ${event.type}`
        }), {
          status: 200
        });
    }
    return new Response(JSON.stringify({
      data: responseData
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
});