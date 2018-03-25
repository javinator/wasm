# Some thoughts on syntax of project language

### Iteration 1

Simple arithmetics can now be compiled to Webassembly, e.g.

```
Input:
2*3+(1+2)/3

Output:
7
```

You will automatically get this evaluated.

### Iteration 2

We will need to assign some values to variables. All variables will be defined as float64 variables to ensure compatibility, e.g.

```
Input:
var x;
x = 3;
x + 2;

Output:
5
```