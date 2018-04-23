# Compiling a higher-level language to WebAssembly

A project of the software composition seminar at UniBE

### Prerequisites

Before you can use this project, make sure that you have a wat2wasm binary installed. A binary-toolkit including wat2wasm can be downloaded here https://github.com/WebAssembly/wabt.

The rest of the project just runs in your browser.

### Syntax and pipeline

To use this project, simply open the 'index.html' file in your browser. Then write your code in the text area and click submit, e.g.

```
def main {(1+2)*3+4;};
```

This will open a download prompt for a 'index.wat' file. After this step you need to translate the text format to a binary format with 'wat2wasm'. Open your terminal and type:

```
wat2wasm index.wat -o index.wasm
```

After that, you can reload the 'index.html' and the result should be displayed.

For the syntax see [Syntax](resources/syntax.md)

#### AST

![AST](resources/ast-small.png)

## Project Idea

WebAssembly is a relatively new assembly language that aims at providing near-native performance for the web. The standard is independent of an in-browser runtime, there exists a runtime on NodeJS and a C-to-WebAssembly compiler as well. The goal of this project is to explore and build a compiler pipeline for a higher-level language (COOL, MiniJava, ...), targeting WebAssembly. You will explore parser generators, IRs, and the WebAssembly specification.

### Notices

Addition and subtraction was implemented with integers. Division had to be implemented with floats, so every operation is evaluated with float64. Module description of .wat file had to be done in the write/export function.

Separating the parser in mathematical function which are evaluated and other stuff like setting variables is trickier than anticipated (with a lack of compiler knowledge).

As parameters don't have a fixed number it could be tricky. But as expressions in pegjs are returned as arrays, it can be achieved quite easily.

Everything is done with f64 as of now, but compare operators (like *less than*) return an integer. Booleans are only allowed inside *if*s and *while*s.

Adding secondary step (AST before outputting as .wat) took longer than expected. Didn't really know what I was doing in the beginning, but seems to work now.

### Resources

https://pegjs.org/online

https://developer.mozilla.org/en-US/docs/WebAssembly/Understanding_the_text_format

http://webassembly.github.io/spec/core/index.html

https://github.com/sunfishcode/wasm-reference-manual/blob/master/WebAssembly.md

https://cdn.rawgit.com/WebAssembly/wabt/fb986fbd/demo/wat2wasm/

https://mbebenita.github.io/WasmExplorer/

http://ast.run/
