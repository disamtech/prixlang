import Parser from "./frontend/parser.ts";
import Environment, { createGlobalEnv } from "./runtime/environment.ts";
import { evaluate } from './runtime/interpreter.ts';
import { MK_BOOL, MK_NULL, MK_NUMBER } from "./runtime/values.ts";

// repl();
run('./main.prix')

async function run(filename: string) {
    const parser = new Parser();
    const env = createGlobalEnv();

    const input = await Deno.readTextFile(filename);
    const program = parser.produceAST(input);

    const result = evaluate(program, env);
    console.log(result);
}

function repl() {
    const parser = new Parser();
    const env = new Environment();
    env.declareVar("a", MK_BOOL(true), true);
    env.declareVar("true", MK_BOOL(true), true);
    env.declareVar("null", MK_NULL(), true);
    console.log("Repl v0.1")

    while (true) {
        const input = prompt("> ");

        if(!input || input.includes("exit")) {
            Deno.exit(1);
        }

        const program = parser.produceAST(input);

        const result = evaluate(program, env);
        console.log(result);
    }
}