// Supabase Edge Function: emails the client when their project status changes.
// Deploy:  supabase functions deploy notify-status-change
// Secrets: supabase secrets set RESEND_API_KEY=re_xxx NOTIFY_FROM="Luxavian <hello@luxavian.id>"
//
// Invoked by the admin app after a status update (see SupabaseRepository).
// Uses Resend (https://resend.com) — swap the fetch call for any provider.

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const apiKey = Deno.env.get("RESEND_API_KEY");
  const from = Deno.env.get("NOTIFY_FROM") ?? "Luxavian <onboarding@resend.dev>";
  if (!apiKey) {
    return new Response(JSON.stringify({ skipped: "RESEND_API_KEY not set" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { email, projectCode, projectName, status, description } = await req.json();
  if (!email || !projectCode || !status) {
    return new Response(JSON.stringify({ error: "email, projectCode and status are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const portalUrl = Deno.env.get("PORTAL_URL") ?? "https://luxavian.it.com/portal";
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;background:#0a0a0a;color:#fff;padding:32px;border-radius:16px">
      <h2 style="margin:0 0 8px">Project update — ${projectCode}</h2>
      <p style="color:#a1a1aa;margin:0 0 16px">${projectName ?? ""}</p>
      <p style="font-size:16px">Your project has moved to <strong style="color:#ff007f">${status}</strong>.</p>
      <p style="color:#a1a1aa">${description ?? ""}</p>
      <a href="${portalUrl}"
         style="display:inline-block;margin-top:16px;padding:12px 24px;border-radius:9999px;background:linear-gradient(90deg,#ff007f,#b026ff);color:#fff;text-decoration:none;font-weight:600">
        Open your dashboard
      </a>
    </div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [email],
      subject: `${projectCode}: your project is now in ${status}`,
      html,
    }),
  });

  return new Response(JSON.stringify({ ok: res.ok }), {
    status: res.ok ? 200 : 502,
    headers: { "Content-Type": "application/json" },
  });
});
