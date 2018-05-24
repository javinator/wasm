(module
(memory $0 1)
(data (i32.const 1024) "Hello there!" )
(data (i32.const 1280) "General Kenobi." )
(data (i32.const 1536) "You are a bold one!" )
(data (i32.const 1792) "Hello there! General Kenobi. You are a bold one! " )
(func $main (result f64)




(f64.const 1792)
)
(export "main" (func $main))
(export "memory" (memory $0))
)