import cluster from 'node:cluster'
import os from 'node:os'

const osCPUs = os.cpus().length

const isProduction = process.env.NODE_ENV === 'prod'

export class AppCluster {
  static clusterize(cb: () => void): void {
    if (isProduction && cluster.isPrimary) {
      console.info(`Primary cluster ${process.pid} is running.`)

      for (let i = 0; i < osCPUs; i++) {
        cluster.fork()
      }

      cluster.on('online', worker => {
        console.info(`Worker ${worker} is online.`)
      })

      cluster.on('exit', (worker, code) => {
        console.warn(`Worker ${worker} has exited with code "${code}".`)
        cluster.fork()
      })
    } else {
      cb()
    }
  }
}
