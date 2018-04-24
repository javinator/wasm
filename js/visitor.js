var memlen = 0;
var memarr = [];

class Visitor {

visitModule(node) {
	var out = "";
	var i;
	out = out.concat(node.children[0].accept());
	for (i = 0; i < node.children[1].length; i++) {
  	if (node.children[1][i].length != 0) {out = out.concat(node.children[1][i].accept());}
  }
  
	return "(module\n(memory $0 1)\n".concat(out,"(export \"main\" (func $main))\n)");
}

visitDefineMain(node) {
	return "(func $main (result f64)\n".concat(node.children[0].accept(),")\n");
}

visitDefineFunction(node) {
	var out = "";
  var i;
  for (i = 0; i < node.children[0].length; i++) {
  	out = out.concat(node.children[0][i][2].accept());
  }
	return "(func $".concat(node.data[0],out," (result f64)\n",node.children[1].accept(),")\n");
}

visitExpression(node) {
	var out = "";
	var i;
	for (i = 0; i < node.children.length; i++) {
		out = out.concat(node.children[i][0].accept(),"\n");
	}
	return out;
}

visitIf(node) {
	return "(if ".concat(node.children[0].accept(),"\n(then ",node.children[1].accept(),")\n").concat("(else ",node.children[2].accept(),"))");
}

visitWhile(node) {
	return "(loop\n".concat(node.children[1].accept(),"\n(br_if 0 ",node.children[0].accept(),"))");
}

visitBool(node) {
	if (node.data[0] === "==") { return "(f64.eq ".concat(node.children[0].accept(),node.children[1].accept(),")");}
    	if (node.data[0] === "!=") { return "(f64.ne ".concat(node.children[0].accept(),node.children[1].accept(),")");}
    	if (node.data[0] === "<") { return "(f64.lt ".concat(node.children[0].accept(),node.children[1].accept(),")");}
    	if (node.data[0] === "<=") { return "(f64.le ".concat(node.children[0].accept(),node.children[1].accept(),")");}
    	if (node.data[0] === ">") { return "(f64.gt ".concat(node.children[0].accept(),node.children[1].accept(),")");}
    	if (node.data[0] === ">=") { return "(f64.ge ".concat(node.children[0].accept(),node.children[1].accept(),")");}
}

visitCallFunction(node) {
	var out = "(call $".concat(node.data[0]);
	var i;
	for (i=0; i < node.children.length; i++) {
		out =  out.concat(node.children[i][2].accept());
	}
	return out.concat(")");	
}

visitDefine(node) {
	return "(local $".concat(node.data[0]).concat(" f64)");
}

visitAssign(node) {
	return "(set_local $".concat(node.data[0],node.children[0].accept(),")");
}

visitMath(node) {
	if (node.data[0] === "+") {return "(f64.add ".concat(node.children[0].accept(),node.children[1].accept(),")");}
        if (node.data[0] === "-") {return "(f64.sub ".concat(node.children[0].accept(),node.children[1].accept(),")");}
	else {return "Error: Wrong operator";}
}

visitTerm(node) {
	if (node.data[0] === "*") {return "(f64.mul ".concat(node.children[0].accept(),node.children[1].accept(),")");}
        if (node.data[0] === "/") {return "(f64.div ".concat(node.children[0].accept(),node.children[1].accept(),")");}
}

visitParameter(node) {
	return "(param $".concat(node.data[0], " f64)");
}

visitCreateArray(node) {
	if (memarr.includes(node.data[0])) { return "ERROR: Name already in use\n"; }
	else {
	var out = "";
	memarr.push(node.data[0]);
	memarr.push(memlen);
	memarr.push(node.children.length);
	var i;
	var off;
	for (i=0; i < node.children.length; i++) {
		off = memlen*8;
		out =  out.concat("(f64.store offset=".concat(off," (i32.const 0)",node.children[i].accept()),")\n");
		memlen = memlen + 1;
	}
	return out;
	}	
}

visitGetArrayElement(node) {
	if (memarr.includes(node.data[0])) {
		var i = memarr.indexOf(node.data[0]);
		var off;
		if (node.children[0].data[0] >= memarr[i+2]) {return "ERROR: Array out of bound";}
		else {
			off = (memarr[i+1] + node.children[0].data[0])*8;
			return "(f64.load offset=".concat(off,"(i32.const 0))");
		}
	} else { return "ERROR: Array not yet created"; }
}

visitFactor(node) {
	return node.children[0].accept();
}

visitInteger(node) {
	return "(f64.const ".concat(node.data[0],")");
}

visitGetVariable(node) {
	return "(get_local $".concat(node.data[0],")");
}
}
