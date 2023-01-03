import fetch from 'node-fetch'

/** Submit a webhook to integromat and return the status code. */
const post_to_integromat = async ({
  url,
  event,
  label
}: {
  url: string
  event: string
  label: string
}): Promise<number> => {
  // parse event string to ensure it's valid JSON
  const stripped = event.replace(/(?:\\[rn])+/g, '')
  const parsed_event = JSON.parse(stripped)
  if (parsed_event === undefined) {
    throw new Error('failed to parse event parameter into JSON')
  }

  if (typeof parsed_event === 'string') {
    throw new Error(`parsed_event still a string: ${parsed_event}`)
  }

  // changing this structure may break integromat
  const body = {
    event: parsed_event,
    monday_status_label: label
  }

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json'}
  })

  return response.status
}

export default post_to_integromat
