class Visitor {

visitModule(node) {
	var out = "";
	var i;
	out = out.concat(node.children[0].visit());
	for (i = 0; i < node.children[1].length; i++) {
  	if (node.children[1][i].length != 0) {out = out.concat(node.children[1][i].visit());}
  }
  
	return "(module\n".concat(out,"(export \"main\" (func $main))\n)");
}

visitDefineMain(node) {
	return "(func $main (result f64)\n".concat(node.children[0].visit(),")\n");
}

visitDefineFunction(node) {
	var out = "";
  var i;
  for (i = 0; i < node.children[0].length; i++) {
  	out = out.concat(node.children[0][i][2].visit());
  }
	return "(func $".concat(node.data[0],out," (result f64)\n",node.children[1].visit(),")\n");
}

visitExpression(node) {
	var out = "";
	var i;
	for (i = 0; i < node.children[0].length; i++) {
		out = out.concat(node.children[0][i][0].visit(),"\n");
	}
	return out;
}

visitIf(node) {
	return "(if ".concat(node.children[0].visit(),"\n(then ",node.children[1].visit(),")\n").concat("(else ",node.children[2].visit(),"))");
}

visitWhile(node) {
	return "(loop\n".concat(node.children[1].visit(),"\n(br_if 0 ",node.children[0].visit(),"))");
}

visitBool(node) {
	if (node.data[0] === "==") { return "(f64.eq ".concat(node.children[0].visit(),node.children[1].visit(),")");}
    	if (node.data[0] === "!=") { return "(f64.ne ".concat(node.children[0].visit(),node.children[1].visit(),")");}
    	if (node.data[0] === "<") { return "(f64.lt ".concat(node.children[0].visit(),node.children[1].visit(),")");}
    	if (node.data[0] === "<=") { return "(f64.le ".concat(node.children[0].visit(),node.children[1].visit(),")");}
    	if (node.data[0] === ">") { return "(f64.gt ".concat(node.children[0].visit(),node.children[1].visit(),")");}
    	if (node.data[0] === ">=") { return "(f64.ge ".concat(node.children[0].visit(),node.children[1].visit(),")");}
}

visitCallFunction(node) {
	var out = "(call $".concat(node.data[0]);
	var i;
	for (i=0; i < node.children[0].length; i++) {
		out =  out.concat(node.children[0][i][2].visit());
	}
	return out.concat(")");	
}

visitCallParameter(node) {
	return node.children[0].visit();
}

visitDefine(node) {
	return "(local $".concat(node.data[0]).concat(" f64)");
}

visitAssign(node) {
	return "(set_local $".concat(node.data[0],node.children[0].visit(),")");
}

visitMath(node) {
	if (node.data[0] === "+") {return "(f64.add ".concat(node.children[0].visit(),node.children[1].visit(),")");}
        if (node.data[0] === "-") {return "(f64.sub ".concat(node.children[0].visit(),node.children[1].visit(),")");}
	else {return "Error: Wrong operator";}
}

visitTerm(node) {
	if (node.data[0] === "*") {return "(f64.mul ".concat(node.children[0].visit(),node.children[1].visit(),")");}
        if (node.data[0] === "/") {return "(f64.div ".concat(node.children[0].visit(),node.children[1].visit(),")");}
}

visitParameter(node) {
	return "(param $".concat(node.data[0], " f64)");
}

visitFactor(node) {
	return node.children[0].visit();
}

visitInteger(node) {
	return "(f64.const ".concat(node.data[0],")");
}

visitGetVariable(node) {
	return "(get_local $".concat(node.data[0],")");
}
}
