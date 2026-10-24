export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, phone, district, work_type, message, botcheck } = req.body || {}

  if (botcheck) {
    return res.status(200).json({ success: true })
  }

  const crmUrl = process.env.VITE_CRM_URL || process.env.CRM_URL || 'https://scribble-vitalize-sugar.ngrok-free.dev'
  const endpoint = `${crmUrl.replace(/\/+$/, '')}/api/resource/CRM Lead`

  const payload = {
    first_name: (name || '').trim(),
    mobile_no: phone || '',
    custom_district: district || '',
    custom_work_type: work_type || 'New Well',
    source: 'Website',
    notes: (message || '').trim() || undefined,
  }

  try {
    const crmRes = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify(payload),
    })

    const data = await crmRes.json().catch(() => ({}))

    if (!crmRes.ok) {
      console.error('CRM Error response:', data)
      return res.status(crmRes.status).json({ success: false, error: data })
    }

    return res.status(200).json({ success: true, lead: data })
  } catch (err) {
    console.error('Lead submission failed:', err)
    return res.status(500).json({ success: false, error: err.message })
  }
}
