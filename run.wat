(module
	(func $exec (result i32)
		(i32.sub (i32.add (i32.const 3)(i32.const 2))(i32.const 1))
	)
	(export "exec" (func $exec))
)