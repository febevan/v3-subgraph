import { exec as execCallback } from 'child_process'
import * as util from 'util'
import * as dotenv from 'dotenv'

import { getSubgraphName, prepare } from './prepareNetwork'

const exec = util.promisify(execCallback)

export const build = async (network: string, subgraphType: string): Promise<void> => {
  console.log(`Building subgraph for ${network}`)
  console.log(`\n Copying constants & templates for ${network} \n`)
  await prepare(network, subgraphType)
  console.log(`\n Generating manifest for ${network} ${subgraphType} subgraph \n`)
  await exec(
    `cross-env mustache config/${network}/config.json ${subgraphType}-subgraph.template.yaml > ${subgraphType}-subgraph.yaml`
  )
  const { stdout, stderr } = await exec(`graph codegen ${subgraphType}-subgraph.yaml`)
  console.log(stdout)
  console.log(stderr)
}

export const deploy = async (subgraphType: string): Promise<void> => {
  dotenv.config()
  try {
    await exec('git diff-index --quiet HEAD -- && git diff --quiet || (echo "Error: You have uncommitted changes." && exit 1)')
  } catch (e) {
    console.error(e.stdout || e.stderr)
    process.exit(1)
  }

  const { stdout: gitHash } = await exec('git rev-parse --short HEAD')
  const gitHashString = gitHash.toString().trim()

  const subgraphName = process.env.SUBGRAPH_NAME
  const accessToken = process.env.GRAPH_ACCESS_TOKEN

  if (!subgraphName) {
    console.error('Error: SUBGRAPH_NAME not found in .env file.')
    process.exit(1)
  }
  if (!accessToken) {
    console.error('Error: GRAPH_ACCESS_TOKEN not found in .env file.')
    process.exit(1)
  }

  const deployCommand = `graph deploy --studio ${subgraphName} --access-token ${accessToken} --version-label ${gitHashString} ${subgraphType}-subgraph.yaml`

  console.log(deployCommand, 'deployCommand===')

  try {
    console.log(`Deploying subgraph ${subgraphName} to The Graph Studio...`)
    console.log(`Executing: ${deployCommand.replace(accessToken, '****')}`)
    const { stdout, stderr } = await exec(deployCommand)

    console.log('Deployment Output:')
    console.log(stdout)
    if (stderr) {
      console.error('Deployment Errors/Warnings:')
      console.error(stderr)
    }
    console.log(`Subgraph ${subgraphName} deployed successfully with version ${gitHashString}!`)

  } catch (e) {
    console.error('Error: Failed to deploy subgraph.')
    if (e.stdout) console.error('STDOUT:', e.stdout)
    if (e.stderr) console.error('STDERR:', e.stderr)
    process.exit(1)
  }
}
