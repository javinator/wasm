(module
(memory $0 1)
(data (i32.const 1024) "Hello World" )
(func $main (result f64)
(f64.const 1024)
)
(export "main" (func $main))
(export "memory" (memory $0))
)