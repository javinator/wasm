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
