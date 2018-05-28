var memlen = 4;
var memarr = [];
var stringarr = [];

class Visitor {

visitModule(node) {
	var out = "";
	var i;
	out = out.concat(node.children[0].accept());
	for (i = 0; i < node.children[1].length; i++) {
  	if (node.children[1][i].length !== 0) {out = out.concat(node.children[1][i].accept());}
  }
  	return "(module\n(memory $0 1)\n".concat(out,"(func $isString (result i32)\n(i32.load (i32.const 0)))\n(export \"isString\" (func $isString))\n(export \"main\" (func $main))\n(export \"memory\" (memory $0))\n)");
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
	return "(if ".concat(node.children[0].accept(),"\n(then ",node.children[1].accept(),")\n(else ",node.children[2].accept(),"))");
}

visitWhile(node) {
	return "(loop\n".concat(node.children[1].accept(),"(br_if 0 ",node.children[0].accept(),"))");
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
	if (memarr.includes(node.data[0])) { console.error("Error: Name",node.data[0],"already in use"); }
	else { return "(local $".concat(node.data[0]).concat(" f64)"); }
}

visitAssign(node) {
	return "(set_local $".concat(node.data[0],node.children[0].accept(),")");
}

visitMath(node) {
	if (node.data[0] === "+") {return "(f64.add ".concat(node.children[0].accept(),node.children[1].accept(),")");}
    if (node.data[0] === "-") {return "(f64.sub ".concat(node.children[0].accept(),node.children[1].accept(),")");}
}

visitTerm(node) {
	if (node.data[0] === "*") {return "(f64.mul ".concat(node.children[0].accept(),node.children[1].accept(),")");}
    if (node.data[0] === "/") {return "(f64.div ".concat(node.children[0].accept(),node.children[1].accept(),")");}
}

visitParameter(node) {
	return "(param $".concat(node.data[0], " f64)");
}

visitCreateArray(node) {
	if (memarr.includes(node.data[0])) { console.error("Error: Name",node.data[0],"already in use"); return "";}
	else {
	var out = "";
	memarr.push(node.data[0]);
	memarr.push(memlen);
	memarr.push(node.children.length);
	var i;
	var off;
	for (i=0; i < node.children.length; i++) {
		off = memlen;
		out =  out.concat("(f64.store ".concat("(i32.const ",off,")",node.children[i].accept()),")\n");
		memlen = memlen + 8;
	}
	return out;
	}	
}
  
visitGetArrayElement(node) {
	if (memarr.includes(node.data[0])) {
		var i = memarr.indexOf(node.data[0]);
		var off;
		if (node.children[0].data[0] >= memarr[i+2]) {console.error("Error: Array index out of bound"); return "";}
		else {
			off = (Number(memarr[i+1]) + Number(node.children[0].data[0]))*8;
			return "(f64.load ".concat("(i32.const ",off,"))");
		}
	} else { console.error("Error: Array",node.data[0],"not yet created"); return "";}
}
  
visitSetArrayElement(node) {
	if (memarr.includes(node.data[0])) {
		var i = memarr.indexOf(node.data[0]);
		var off;
		if (node.children[0].data[0] >= memarr[i+2]) {console.error("Error: Array index out of bound");}
		else {
			off = (Number(memarr[i+1]) + Number(node.children[0].data[0]))*8;
			return "(f64.store ".concat("(i32.const ",off,")",node.children[1].accept(),")");
		}
    } else {console.error("Error: Array",node.data[0],"not yet created"); return "";}
}
  
visitArrayLength(node) {
    if (memarr.includes(node.data[0])) {
      var i = Number(memarr.indexOf(node.data[0]));
      return "(f64.const ".concat(memarr[i+2],")");
    } else {console.error("Error: Array",node.data[0],"not yet created"); return "";}
}
  
visitCreateString(node) {
	if (stringarr.includes(node.data[0])) { console.error("Error: Name",node.data[0],"already in use"); return "";}
	else {
	var out = "";
  	stringarr.push(node.data[0], memlen);
	for (var i = 0; i < node.children[0].length; i++)
	{
		var code = node.children[0].charCodeAt(i);
		out = out.concat("(i32.store16 (i32.const ",memlen,")(i32.const ",code,"))\n");
		memlen = memlen + 2;
	}
	out = out.concat("(i32.store16 (i32.const ",memlen,")(i32.const 0))\n");
	memlen = memlen + 2;
	return out;
	}
}

visitGetString(node) {
  	if (stringarr.includes(node.data[0])) {
		var index = stringarr.indexOf(node.data[0]);
		return "(i32.store (i32.const 0)(i32.const 1))\n(f64.const ".concat(stringarr[index+1],")");
	} else { console.error("Error: String",node.data[0],"not yet created"); return "";}
}

/*visitConcatString(node) {
	var off;
	if (stringarr.includes(node.data[0])) { 
		console.error("Error: Name",node.data[0],"already in use"); 
		return "";}
	else {
		var conc = "";
		for (var i=0; i < node.children[0].length; i++) {
			if (stringarr.includes(node.children[0][i])) {
				var index = stringarr.indexOf(node.children[0][i])/2;
				conc = conc.concat(stringmem[index]," ");
				off = 1024 + index*256;
			} else { console.error("Error: String",node.children[0][i],"not yet created"); return "";}
		}
		stringarr.push(node.data[0], off);
		stringmem.push(conc);
		return "";
	}
}
 */ 
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

window.visit = new Visitor();

(ast) => {
    memlen = 4;
    memarr = [];
	return ast.accept();
}
