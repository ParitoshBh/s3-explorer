import yargs from 'yargs/yargs';

let argv: { [x: string]: unknown; region: string; port: number; endpoint: string; accessKeyId: string; secretAccessKey: string; };

export const parseArgs = () => {
    argv = yargs(process.argv.slice(2)).options({
        region: { type: 'string', default: 'us-east-1' },
        port: { type: 'number', default: 3000 },
        endpoint: { type: 'string', demandOption: true },
        accessKeyId: { type: 'string', demandOption: true },
        secretAccessKey: { type: 'string', demandOption: true },
    }).parseSync();
};

export const getArgs = () => {
    return argv;
}