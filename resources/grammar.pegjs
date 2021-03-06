{
class Node {
		constructor() {
        	this.name = "Abstract Node";
            this.data = [];
			this.children = [];
		}
	}
    
class Module extends Node {
    	constructor(main,func) {
        	super();
            this.name = "Module";
            this.children = [main,func];
		}
    accept() {
    	return visit.visitModule(this);
    }
    }

class DefineMain extends Node {
    	constructor(exp) {
        	super();
            this.name = "Define Main";
            this.children = [exp];
		}
    accept() {
    	return visit.visitDefineMain(this);
    }
	}

class DefineFunction extends Node {
    	constructor(name,para,exp) {
        	super();
            this.name = "Define Function";
            this.children = [para,exp];
            this.data = [name];
		}
    accept() {
    	return visit.visitDefineFunction(this);
    }
	}
    
class Expression extends Node {
    	constructor(exp) {
        	super();
            this.name = "Expression";
            this.children = exp;
        }
       accept() {
    	return visit.visitExpression(this);
    }
	}
    
class If extends Node {
    	constructor(bool,exp,elseexp) {
        	super();
            this.name = "If";
            this.children = [bool,exp,elseexp];
        }
        accept() {
    	return visit.visitIf(this);
    }
	}
    
    	class While extends Node {
    		constructor(bool,exp) {
        		super();
            		this.name = "While";
            		this.children = [bool,exp];
        	}
          accept() {
    	return visit.visitWhile(this);
    }
	}
    
    	class Bool extends Node {
    		constructor(head,op,tail) {
        		super();
           		this.name = "Bool";
            		this.children = [head,tail];
            		this.data = [op];
        	}
          accept() {
    	return visit.visitBool(this);
    }
	}


	class CallFunction extends Node {
    		constructor(name,para) {
        		super();
            		this.name = "Call Function";
			this.children = para;
            		this.data = [name];
        	}
          accept() {
    	return visit.visitCallFunction(this);
    }
	}

	class Define extends Node {
    		constructor(char) {
        		super();
            		this.name = "Define";
            		this.data = [char];
        	}
          accept() {
    	return visit.visitDefine(this);
    }
	}

	class Assign extends Node {
    		constructor(char, exp) {
        		super();
            		this.name = "Assign";
            		this.children = [exp];
            		this.data = [char];
        	}
          accept() {
    	return visit.visitAssign(this);
    }
	}

	class Math extends Node {
    		constructor(head,op,tail) {
        		super();
            		this.name = "Math";
            		this.children = [head,tail];
            		this.data = [op];
        	}
          accept() {
    	return visit.visitMath(this);
    }
	}

	class Term extends Node {
    		constructor(head,op,tail) {
        		super();
            		this.name = "Term";
            		this.children = [head,tail];
            		this.data = [op];
        	}
          accept() {
    	return visit.visitTerm(this);
    }
	}

	class Parameter extends Node {
    		constructor(char) {
        		super();
            		this.name = "Parameter";
            		this.data = [char];
        	}
          accept() {
    	return visit.visitParameter(this);
    }
	}

	class Factor extends Node {
    		constructor(exp) {
        		super();
            		this.name = "Factor";
            		this.children = [exp];
        	}
          accept() {
    	return visit.visitFactor(this);
    }
	}

	class CreateArray extends Node {
		constructor(char,elements) {
			super();
			this.name = "Array";
			this.data = [char];
			this.children = elements;
		}
		accept() {
			return visit.visitCreateArray(this);
		}
	}

	class GetArrayElement extends Node {
		constructor(char,index) {
			super();
			this.name = "Get Array Element";
			this.data = [char];
			this.children = [index];
		}
		accept() {
			return visit.visitGetArrayElement(this);
		}
	}
    
    class SetArrayElement extends Node {
		constructor(char,index,exp) {
			super();
			this.name = "Set Array Element";
			this.data = [char];
			this.children = [index,exp];
		}
		accept() {
			return visit.visitSetArrayElement(this);
		}
	}
    
    class ArrayLength extends Node {
		constructor(char) {
			super();
			this.name = "Array Length";
			this.data = [char];
		}
		accept() {
			return visit.visitArrayLength(this);
		}
	}
    
    class CreateString extends Node {
		constructor(char,string) {
			super();
			this.name = "Create String";
            this.data = [char];
            this.children = [string];
		}
		accept() {
			return visit.visitCreateString(this);
		}
	}
    
    class ConcatString extends Node {
		constructor(char,strings) {
			super();
			this.name = "Concat String";
            this.data = [char];
            this.children = [strings];
		}
		accept() {
			return visit.visitConcatString(this);
		}
	}
    
    class GetString extends Node {
		constructor(char) {
			super();
			this.name = "Get String";
            this.data = [char];
		}
		accept() {
			return visit.visitGetString(this);
		}
	}

    	class Integer extends Node {
    		constructor(int) {
        		super();
            		this.name = "Integer";
            		this.data = [int];
        	}
          accept() {
    	return visit.visitInteger(this);
    }
	}
    
    	class GetVariable extends Node {
    		constructor(char) {
        		super();
            		this.name = "Get Variable";
            		this.data = [char];
        	}
          accept() {
    	return visit.visitGetVariable(this);
    }
	}

	class Character extends Node {
    		constructor(char) {
        		super();
            		this.name = "Character";
            		this.data = [char];
        	}
          accept() {
    	return visit.visitCharacter(this);
    }
	}
}

Module
  = main:DefineMain func:DefineFunction* 
  {return new Module(main,func);} 
  
DefineMain
  = "def main" _ "{" _ exp:Expression _ "}" Break _ 
  {return new DefineMain(exp);}

DefineFunction
  = "def" name:Character para:( _ "(" Parameter ")" _ )* _ "{" exp:Expression "}" Break 
  {return new DefineFunction(name,para,exp);}

Expression
  = _ exp:((If/While/CreateString/GetString/CreateArray/SetArrayElement/Define/Assign/Math) Break)+ _ 
  {return new Expression(exp);}

If
  = "if (" bool:Bool ") {" exp:Expression "}" _ "else {" elseexp:Expression "}" 
  {return new If(bool,exp,elseexp);}

While
  = "do {" exp:Expression "}" _ "while" _ "("bool:Bool")" 
  {return new While(bool,exp);}

Bool 
  = head:Math _ op:("=="/"!="/"<="/"<"/">="/">") _ tail:Math
  {return new Bool(head,op,tail);}

CreateArray
  = "array" _ char:Character _ "[" _ ele:(Integer/GetVariable)+ _ "]" {return new CreateArray(char,ele);}
  
GetArrayElement
  = "get" _ char:Character _ "[" _ ele:(Integer/GetVariable) _ "]" {return new GetArrayElement(char,ele);}
  
SetArrayElement
  = "set" _ char:Character _ "[" _ ele:(Integer/GetVariable) _ "]" _ "=" exp:Math {return new SetArrayElement(char,ele,exp);}
 
ArrayLength
  = "len" _ char:Character {return new ArrayLength(char);}
  
CreateString
  = "string" _ char:Character _ "\"" _ string:(Character _)+ _ "\"" {return new CreateString(char, string.join("").replace(/,/g,""));}
  
GetString 
  = "get string" _ char:Character {return new GetString(char);}

CallFunction
  = "call" char:Character para:( _ "(" Math ")" _ )* 
  {return new CallFunction(char,para);}

Define
  = "var" char:Character {return new Define(char);}

Assign
  = char:Character _ "=" _ exp:Math {return new Assign(char,exp);}

Math
  = head:Term tail:(_ ("+" / "-") _ Term)*{
      return tail.reduce(function(result, element) {
        return new Math(result,element[1],element[3]);
	}, head);}

Term
  = head:Factor tail:(_ ("*" / "/") _ Factor)* {
      return tail.reduce(function(result, element) {
        return new Term(result,element[1],element[3]);
      }, head);}

Factor
  = "(" _ expr:Math _ ")" {return new Factor(expr);}
  / CallFunction / Integer / GetArrayElement / ArrayLength / GetVariable

Parameter
  = char:Character {return new Parameter(char);}

Integer "integer"
  = _ [0-9]+ {return new Integer(text());}
  
GetVariable
  = char:Character {return new GetVariable(char);}
  
Character "character"
  = _[a-zA-Z]+[0-9._!?'-]* {return text().replace(" ","");}

Break "break"
  = [;]_ {return;}

_ "whitespace"
  = [ \t\r\n]*


