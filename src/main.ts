import * as core from '@actions/core'
import post_to_integromat from './post'

async function run(): Promise<void> {
  try {
    const url: string = core.getInput('webhook_url')
    const event: string = core.getInput('event')
    const label: string = core.getInput('monday_label')
    core.debug(`Input for webhook URL: ${url} ...`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
    core.debug(`Input for monday label: ${label} ...`)

    core.debug(new Date().toTimeString())
    await post_to_integromat({url, event, label})
    core.debug(new Date().toTimeString())

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
