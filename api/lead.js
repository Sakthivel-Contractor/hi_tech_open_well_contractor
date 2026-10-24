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

  const crmUrl = (process.env.VITE_CRM_URL || process.env.CRM_URL || 'https://scribble-vitalize-sugar.ngrok-free.dev').replace(/\/+$/, '')
  
  // Format phone to "+91 XXXXXXXXXX"
  const cleanPhone = (phone || '').replace(/\D/g, '')
  const formattedPhone = cleanPhone.length === 10 ? `+91 ${cleanPhone}` : (phone || '')

  // 1. Try custom hitech.api.create_website_lead endpoint first
  try {
    const methodRes = await fetch(`${crmUrl}/api/method/hitech.api.create_website_lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify({
        name: (name || '').trim(),
        phone: formattedPhone,
        district: district || '',
        work_type: work_type || 'New Well',
        custom_work_type: work_type || 'New Well',
        message: (message || '').trim(),
      }),
    })

    const methodData = await methodRes.json().catch(() => ({}))
    if (methodRes.ok && methodData.message) {
      return res.status(200).json({ success: true, lead: methodData })
    }
  } catch (err) {
    console.warn('create_website_lead method failed, trying resource endpoint:', err)
  }

  // 2. Fallback to direct CRM Lead DocType insert
  try {
    const crmRes = await fetch(`${crmUrl}/api/resource/CRM Lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify({
        first_name: (name || '').trim(),
        mobile_no: cleanPhone.slice(-10),
        custom_district: district || '',
        custom_work_type: work_type || 'New Well',
        source: 'Website',
        notes: (message || '').trim() || undefined,
      }),
    })

    const data = await crmRes.json().catch(() => ({}))
    if (crmRes.ok) {
      return res.status(200).json({ success: true, lead: data })
    }

    return res.status(crmRes.status).json({ success: false, error: data })
  } catch (err) {
    console.error('Lead submission failed:', err)
    return res.status(500).json({ success: false, error: err.message })
  }
}
