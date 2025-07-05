type CodedError = Error & {code?:string;}



function ToLocalISOString(show_milli?:boolean):string;
function ToLocalISOString(ref_date:Date|string|number, show_milli?:boolean):string;
function ToLocalISOString(this:Date, ref_date?:Date|string|number, show_milli?:boolean):string;
function ToLocalISOString(this:Date, ref_date?:Date|string|number|boolean, show_milli?:boolean):string {
	if ( this instanceof Date ) ref_date = this;
	if ( typeof ref_date === "string" || typeof ref_date === "number" ) {
		ref_date = new Date(ref_date);
	}
	else 
	if ( !(ref_date instanceof Date) ) {
		ref_date = new Date();
	}

	if ( Number.isNaN(ref_date.getTime()) ) {
		throw new RangeError("Invalid time value");
	}
	
	
	
	let offset = 'Z';

	const zone = ref_date.getTimezoneOffset();
	if (zone !== 0) {
		const abs_zone	= Math.abs(zone);
		const zone_hour = Math.floor(abs_zone / 60);
		const zone_min	= abs_zone % 60;
		offset = (zone > 0 ? '-' : '+') + (zone_hour.toString().padStart(2, '0')) + (zone_min.toString().padStart(2, '0'));
	}
	
	const milli = show_milli ? ('.' + (ref_date.getMilliseconds() % 1000).toString().padStart(3, '0')) : '';
	return ref_date.getFullYear() +
		'-' + (ref_date.getMonth() + 1).toString().padStart(2, '0') +
		'-' + (ref_date.getDate()).toString().padStart(2, '0') +
		'T' + (ref_date.getHours()).toString().padStart(2, '0') +
		':' + (ref_date.getMinutes()).toString().padStart(2, '0') +
		':' + (ref_date.getSeconds()).toString().padStart(2, '0') +
		milli + offset;
}




// RunCtrl
type TerminateStages = 'terminate:init'|'terminate:preproc'|'terminate:predata'|'terminate:data'|'terminate:postproc'|'terminate:final';
declare global {
	namespace NodeJS {
		interface Process {
			emit(evt:'terminate', error?:CodedError|NodeJS.Signals|number):this;
			emit(evt:TerminateStages):this;

			on(evt:'terminate', handler:(error?:CodedError|NodeJS.Signals|number)=>void):this;
			on(evt:TerminateStages, handler:()=>void):this;

			once(evt:'terminate', handler:(error?:CodedError|NodeJS.Signals|number)=>void):this;
			once(evt:TerminateStages, handler:()=>void):this;
		}
	}
}

interface CallbackFunc {():Promise<any>|any};
const cleanup_stages :{[key in 'preproc'|'predata'|'data'|'postproc'|'final']:CallbackFunc[]}= { preproc:[], predata:[], data:[], postproc:[], final:[] };

let context_terminating = false;
export class RunCtrl {
	static timeout:number = 30_000;
	static get terminating():boolean {
		return context_terminating;
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
	if ( context_terminating ) return;
	context_terminating = true;

	process.emit('terminate:init');
	let timeout = setTimeout(()=>{
		console.error("Termination timeout!");
		process.exit(1);
	}, RunCtrl.timeout);


	
	for(const stage of (['preproc', 'predata', 'data', 'postproc', 'final'] as const)) {
		process.emit(`terminate:${stage}`);
		const handlers = cleanup_stages[stage].filter((i)=>typeof i === "function");
		await Promise.all(handlers.map((i)=>i()));
	}


	clearTimeout(timeout);
	if ( state === undefined ) {
		process.exit(0);
	}

	if ( typeof state === "number" ) {
		process.exit(state);
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


export const Misc = Object.freeze({
	ToLocalISOString
});
