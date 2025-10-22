import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import rootat from "rootat";
import {ParseTypedEnv} from "#/lib/envtool.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// #region Assign the search root if the script is not running in tsx
const EXEC_ENV = '___EXEC_ENV___' as 'tsx'|'___EXEC_ENV___'|'node';
if ( EXEC_ENV === 'node') {
	rootat.search_root = `${rootat.project_root}/_dist`;
}
// #endregion


// #region Load .env content
const runtime_env = process.env.NODE_ENV === 'dev' ? './.env.dev' : './.env.prod';
dotenv.config({path: [
	// Load env files in project directory first
	path.resolve(rootat.project_root, '.env'),
	path.resolve(rootat.project_root, '.env.local'),
	path.resolve(rootat.project_root, runtime_env),
	
	// Local environment file ( in relative directory )
	path.resolve(__dirname, './.env.local'),
	path.resolve(__dirname, runtime_env),
], override: true, quiet:true});
// #endregion


// #region CtxSession
interface CallbackFunc {():Promise<void>|void};
type CodedError = Error & {code?:string;}
type TerminateStages = 'terminate:init'|'terminate:preproc'|'terminate:predata'|'terminate:data'|'terminate:postproc'|'terminate:final';
declare global {
	namespace NodeJS {
		interface Process {
			emit(evt:'terminate', error?:CodedError|NodeJS.Signals):this;
			emit(evt:TerminateStages):this;

			on(evt:'terminate', handler:(error?:CodedError|NodeJS.Signals)=>void):this;
			on(evt:TerminateStages, handler:()=>void):this;

			once(evt:'terminate', handler:(error?:CodedError|NodeJS.Signals)=>void):this;
			once(evt:TerminateStages, handler:()=>void):this;
		}
	}
}



const cleanup_stages :{[key in 'preproc'|'predata'|'data'|'postproc'|'final']:CallbackFunc[]}= {
	preproc:[], predata:[], data:[], postproc:[], final:[]
};
const TYPED_ENV = ParseTypedEnv(process.env);
class Env {
	static #terminate_timeout:number = 30_000;

	static getEnv<T=any>(key: string):T {
		return (TYPED_ENV[key]||process.env[key]) as T;
	}

	static set timeout(value:number) {
		this.#terminate_timeout = value;
	}

	static get timeout() {
		return this.#terminate_timeout;
	}
	
	static preproc(cb:CallbackFunc){
		cleanup_stages.preproc.push(cb);
	}
	static predata(cb:CallbackFunc){
		cleanup_stages.predata.push(cb);
	}
	static data(cb:CallbackFunc) {
		cleanup_stages.data.push(cb);
	}
	static postproc(cb:CallbackFunc){
		cleanup_stages.postproc.push(cb);
	}
	static final(cb:CallbackFunc) {
		cleanup_stages.final.push(cb);
	}
}

process.once('terminate', async(state)=>{
	process.emit('terminate:init');
	let timeout = setTimeout(()=>{
		console.error("Termination timeout!");
		process.exit(1);
	}, Env.timeout);


	
	for(const stage of (['preproc', 'predata', 'data', 'postproc', 'final'] as const)) {
		process.emit(`terminate:${stage}`);
		const handlers = cleanup_stages[stage].filter((i)=>typeof i === "function");
		await Promise.all(handlers.map((i)=>i()));
	}


	clearTimeout(timeout);
	if ( state === undefined ) {
		process.exit(0);
	}

	if ( typeof state === "string" ) {
		let exit_code = 1;
		
		switch(state) {
			case 'SIGHUP':
				exit_code = 128 + 1;
				break;
			case 'SIGINT':
				exit_code = 128 + 2;
				break;
			case 'SIGQUIT':
				exit_code = 128 + 3;
				break;
			case 'SIGILL':
				exit_code = 128 + 4;
				break;
			case 'SIGTRAP':
				exit_code = 128 + 5;
				break;
			case 'SIGABRT':
			case 'SIGIOT':
				exit_code = 128 + 6;
				break;
			case 'SIGBUS':
				exit_code = 128 + 7;
				break;
			case 'SIGFPE':
				exit_code = 128 + 8;
				break;
			case 'SIGKILL':
				exit_code = 128 + 9;
				break;
			case 'SIGUSR1':
				exit_code = 128 + 10;
				break;
			case 'SIGSEGV':
				exit_code = 128 + 11;
				break;
			case 'SIGUSR2':
				exit_code = 128 + 12;
				break;
			case 'SIGPIPE':
				exit_code = 128 + 13;
				break;
			case 'SIGALRM':
				exit_code = 128 + 14;
				break;
			case 'SIGTERM':
				exit_code = 128 + 15;
				break;
			case 'SIGSTKFLT':
				exit_code = 128 + 16;
				break;
			case 'SIGCHLD':
				exit_code = 128 + 17;
				break;
			case 'SIGCONT':
				exit_code = 128 + 18;
				break;
			case 'SIGSTOP':
				exit_code = 128 + 19;
				break;
			case 'SIGTSTP':
				exit_code = 128 + 20;
				break;
			case 'SIGTTIN':
				exit_code = 128 + 21;
				break;
			case 'SIGTTOU':
				exit_code = 128 + 22;
				break;
			case 'SIGURG':
				exit_code = 128 + 23;
				break;
			case 'SIGXCPU':
				exit_code = 128 + 24;
				break;
			case 'SIGXFSZ':
				exit_code = 128 + 25;
				break;
			case 'SIGVTALRM':
				exit_code = 128 + 26;
				break;
			case 'SIGPROF':
				exit_code = 128 + 27;
				break;
			case 'SIGWINCH':
				exit_code = 128 + 28;
				break;
			case 'SIGIO':
			case 'SIGPOLL':
				exit_code = 128 + 29;
				break;
			case 'SIGPWR':
				exit_code = 128 + 30;
				break;
			case 'SIGSYS':
			case 'SIGUNUSED':
				exit_code = 128 + 31;
				break;
			default:
				exit_code = 1;
				break;
		}

		process.exit(exit_code);
	}
	
	if ( state instanceof Error ) {
		process.exit(1);
	}
});
// #endregion

export default Env;