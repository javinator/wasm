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
    visit() {
    	return visit.visitModule(this);
    }
    }

class DefineMain extends Node {
    	constructor(exp) {
        	super();
            this.name = "Define Main";
            this.children = [exp];
		}
    visit() {
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
    visit() {
    	return visit.visitDefineFunction(this);
    }
	}
    
class Expression extends Node {
    	constructor(exp) {
        	super();
            this.name = "Expression";
            this.children = [exp];
        }
       visit() {
    	return visit.visitExpression(this);
    }
	}
    
class If extends Node {
    	constructor(bool,exp,elseexp) {
        	super();
            this.name = "If";
            this.children = [bool,exp,elseexp];
        }
        visit() {
    	return visit.visitIf(this);
    }
	}
    
    	class While extends Node {
    		constructor(bool,exp) {
        		super();
            		this.name = "While";
            		this.children = [bool,exp];
        	}
          visit() {
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
          visit() {
    	return visit.visitBool(this);
    }
	}


	class CallFunction extends Node {
    		constructor(name,para) {
        		super();
            		this.name = "Call Function";
			this.children = [para];
            		this.data = [name];
        	}
          visit() {
    	return visit.visitCallFunction(this);
    }
	}

    	class CallParameter extends Node {
    		constructor(para) {
        		super();
            		this.name = "Call Parameter";
            		this.children = [para];
        	}
          visit() {
    	return visit.visitCallParameter(this);
    }
	}

	class Define extends Node {
    		constructor(char) {
        		super();
            		this.name = "Define";
            		this.data = [char];
        	}
          visit() {
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
          visit() {
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
          visit() {
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
          visit() {
    	return visit.visitTerm(this);
    }
	}

	class Parameter extends Node {
    		constructor(char) {
        		super();
            		this.name = "Parameter";
            		this.data = [char];
        	}
          visit() {
    	return visit.visitParameter(this);
    }
	}

	class Factor extends Node {
    		constructor(exp) {
        		super();
            		this.name = "Factor";
            		this.children = [exp];
        	}
          visit() {
    	return visit.visitFactor(this);
    }
	}

    	class Integer extends Node {
    		constructor(int) {
        		super();
            		this.name = "Integer";
            		this.data = [int];
        	}
          visit() {
    	return visit.visitInteger(this);
    }
	}
    
    	class GetVariable extends Node {
    		constructor(char) {
        		super();
            		this.name = "Get Variable";
            		this.data = [char];
        	}
          visit() {
    	return visit.visitGetVariable(this);
    }
	}

	class Character extends Node {
    		constructor(char) {
        		super();
            		this.name = "Character";
            		this.data = [char];
        	}
          visit() {
    	return visit.visitCharacter(this);
    }
	}
