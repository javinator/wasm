(module
	(func $main (result f64)
		(local $a f64)
(set_local $a (f64.add (f64.const  1)(f64.mul (f64.const 2)(f64.const 3))))
(f64.div (f64.mul (f64.sub (f64.add (f64.mul (get_local $a)(f64.const 2))(f64.const 1))(f64.const 14))(f64.const 6))(f64.add (f64.const 2)(f64.const 1)))
	)
	(export "main" (func $main))
)