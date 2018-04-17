
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
    	}

	class DefineMain extends Node {
    		constructor(exp) {
        		super();
            		this.name = "Define Main";
            		this.children = [exp];
		}
	}

	class DefineFunction extends Node {
    		constructor(name,para,exp) {
        		super();
            		this.name = "Define Function";
            		this.children = [exp];
            		this.data = [name,para];
		}
	}
    
    	class Expression extends Node {
    		constructor(exp) {
        		super();
            		this.name = "Expression";
            		this.children = [exp];
        	}
	}
    
    	class If extends Node {
    		constructor(bool,exp) {
        		super();
            		this.name = "If";
            		this.children = [bool,exp];
        	}
	}
    
    	class While extends Node {
    		constructor(bool,exp) {
        		super();
            		this.name = "While";
            		this.children = [bool,exp];
        	}
	}
    
    	class Bool extends Node {
    		constructor(head,op,tail) {
        		super();
           		this.name = "Bool";
            		this.children = [head,tail];
            		this.data = [op];
        	}
	}

}

	class CallFunction extends Node {
    		constructor(name,para) {
        		super();
            		this.name = "Call Function";
            		this.data = [name,para];
        	}
	}

    	class CallParameter extends Node {
    		constructor(para) {
        		super();
            		this.name = "Call Parameter";
            		this.children = [para];
        	}
	}

	class Define extends Node {
    		constructor(char) {
        		super();
            		this.name = "Define";
            		this.data = [char];
        	}
	}

	class Assign extends Node {
    		constructor(char, exp) {
        		super();
            		this.name = "Assign";
            		this.children = [char, exp];
        	}
	}

	class Math extends Node {
    		constructor(head,op,tail) {
        		super();
            	this.name = "Math";
            	this.children = [head,tail];
            	this.data = [op];
        	}
	}

	class Term extends Node {
    		constructor(head,op,tail) {
        		super();
            		this.name = "Term";
            		this.children = [head,tail];
            		this.data = [op];
        	}
	}

	class Factor extends Node {
    		constructor(exp) {
        		super();
            		this.name = "Factor";
            		this.children = [exp];
        	}
	}

    	class Integer extends Node {
    		constructor(int) {
        		super();
            		this.name = "Integer";
            		this.data = [int];
        	}
	}
    
    	class GetVariable extends Node {
    		constructor(char) {
        		super();
            		this.name = "Get Variable";
            		this.data = [char];
        	}
	}

	class Character extends Node {
    		constructor(char) {
        		super();
            		this.name = "Character";
            		this.data = [char];
        	}
	}
}







