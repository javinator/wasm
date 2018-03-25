(module
	(func $exec (result f64)
		(local $a f64)
(set_local $a ((f64.add (f64.const  2)(f64.const 1))))
(f64.add (f64.mul (get_local $a)(f64.const 2))(f64.const 2)))
	)
	(export "exec" (func $exec))
)