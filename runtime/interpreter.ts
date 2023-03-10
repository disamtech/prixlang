import { RuntimeVal, NumberVal } from './values.ts';
import { AssignmetExpr, BinaryExpr, Identifier, NumericLiteral, ObjectLiteral, Program, Stmt, VarDeclaration } from '../frontend/ast.ts';
import Environment from './environment.ts';
import { eval_program, eval_var_declaration } from './eval/statements.ts';
import { evaluate_binary_expr, eval_assignment, eval_identifier, eval_object_expr } from './eval/expressions.ts';

export function evaluate (astNode: Stmt, env: Environment): RuntimeVal {
    
    switch (astNode.kind) {
        case "NumericLiteral":
            return { 
                value: ((astNode as NumericLiteral).value), 
                type: "number" 
            } as NumberVal;
        
        case "BinaryExpr":
            return evaluate_binary_expr(astNode as BinaryExpr, env);
        
        case "Program":
            return eval_program(astNode as Program, env);
        
        case "Identifier":
            return eval_identifier(astNode as Identifier, env);
        case "AssignmentExpr":
            return eval_assignment(astNode as AssignmetExpr, env);
        case "ObjectLiteral":
            return eval_object_expr(astNode as ObjectLiteral, env);
        case "VarDeclaration":
            return eval_var_declaration(astNode as VarDeclaration, env);
        default:
            console.error(
                'This AST Node has not yet been setup for interpretation.', 
                astNode
            );
            Deno.exit(0);
    }

}