import { MK_BOOL, MK_NULL, MK_NUMBER, RuntimeVal } from "./values.ts";

export function createGlobalEnv() {
    const env = new Environment();
    env.declareVar("a", MK_NUMBER(5), true);
    env.declareVar("true", MK_BOOL(true), true);
    env.declareVar("null", MK_NULL(), true);
    console.log("Repl v0.1")

    return env;
}

export default class Environment {
    private parent?: Environment;
    private variables: Map<string, RuntimeVal>;
    private constants: Set<string>;

    constructor (parentENV?: Environment) {
        const global = parentENV ? true : false;
        this.parent = parentENV;
        this.variables = new Map();
        this.constants = new Set();
    }

    public declareVar (varname: string, value: RuntimeVal, constant: boolean): RuntimeVal {
        if(this.variables.has(varname)) {
            throw `Cannot declare variable ${varname}. As it already is defined.`
        }

        this.variables.set(varname, value);

        if(constant) {
            this.constants.add(varname)
        }
        return value;
    }

    public assignVar (varname: string, value: RuntimeVal): RuntimeVal {
        const env = this.resolve(varname);
        if (env.constants.has(varname)) {
            throw `Cannot reasign to variable ${varname} as it was declared constant.`
        }
        env.variables.set(varname, value);

        return value;
    }

    public lookupVar (varname: string): RuntimeVal {
        const env = this.resolve(varname);
        return env.variables.get(varname) as RuntimeVal;
    }

    public resolve (varname: string): Environment {
        if(this.variables.has(varname)) return this;

        if(this.parent == undefined) {
            throw `Cannot resolve '${varname}' as it does not exist.`;
        }

        return this.parent.resolve(varname);
    }
}