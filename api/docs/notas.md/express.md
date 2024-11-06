
/* app.get("/user", (req, res)=> {
    res.status(200).json({message: "Todo Piola"})
})
app.post("/user",(req,res)=>{
   // console.log(req.params);//despues de un / un parametro de busqueda pero no una carpeta, despues del slash
   // console.log(req.body);//json sifrado dentro de la url
   // console.log(req.query);//despues de un ?$
    res.status(201).json({message: "Datos recibidos", data:req.body});

})

app.delete("/user/:nombre",(req, res) => {
    res.status(201).json({message: "Datos recibidos", data:req.body});

})

app.put("/user/:nombre",(req, res) => {
    //recibe query, post, 
    res.status(201).json({message: "Datos recibidos", data:req.query , data2: req.body});

})
 */