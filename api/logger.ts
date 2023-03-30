import chalk from "chalk"

type LoggerLevels = 'HTTP' | 'MongoDB' | 'Helper'
type Logger = (level: LoggerLevels, message: string, ...args: any[]) => void

export const logger: Logger = (level, message, ...args) => {
    switch (level) {
        case 'HTTP':
            console.log(chalk.blue(`[${level}] ${message}`, ...args))
            break
        case 'MongoDB':
            console.log(chalk.green(`[${level}] ${message}`, ...args))
            break
        case 'Helper':
            console.log(chalk.yellow(`[${level}] ${message}`, ...args))
            break
    }       
}
