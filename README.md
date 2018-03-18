# Compiling a higher-level language to WebAssembly

A project of the software composition seminar at UniBE

### Prerequisites

Before you can use this project, make sure that you have a wat2wasm binary installed. A binary-toolkit including wat2wasm can be downloaded here https://github.com/WebAssembly/wabt.

The rest of the project just runs in your browser.

## Project Idea

WebAssembly is a relatively new assembly language that aims at providing near-native performance for the web. The standard is independent of an in-browser runtime, there exists a runtime on NodeJS and a C-to-WebAssembly compiler as well. The goal of this project is to explore and build a compiler pipeline for a higher-level language (COOL, MiniJava, ...), targeting WebAssembly. You will explore parser generators, IRs, and the WebAssembly specification.
