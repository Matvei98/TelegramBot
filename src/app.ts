import { Telegraf} from 'telegraf';
import { IConfigService } from './config/config.inteface';
import { ConfigService } from './config/config.service';
import { Command } from './commands/command.class';
import { StartCommand } from './commands/start.class';
import LocalSession from 'telegraf-session-local';
import { IBotContext } from './context/context.interface';



class Bot {
	bot:Telegraf<IBotContext>;
	commands:Command[] = [];
	
	
	constructor(private readonly  configService:IConfigService) {
	this.bot = new Telegraf<IBotContext>(this.configService.get("TOKEN"));
	this.bot.use((new LocalSession({
		database: 'sessions.json' })).middleware())
	}


	init() {
	this.commands = [new StartCommand(this.bot)];
	for (const command of this.commands) {
	command.handle();
	}
	this.bot.launch();
	}
	}
	
	const bot = new Bot(new ConfigService());
	bot.init();