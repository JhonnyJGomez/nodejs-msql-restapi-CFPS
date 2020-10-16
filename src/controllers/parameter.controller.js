import Parameter from '../models/Parameter';


export async function getParameters(req, res){
       
       const parameter = await Parameter.findAll({
           attributes: ['id','cod_parametro','type'],
           where: {
               status: 1, 
                about: ['all', 'forecast']    
            } 
        });
  
      res.json({
          Value:parameter 
      });
}

export async function getParametersProgram(req, res){
    console.log("entro a la funcion del controller");
       
    const parameter = await Parameter.findAll({
        attributes: ['id','cod_parametro','type'],
        where: {
            status: 1, 
             about: ['all', 'program']    
         } 
     });

   res.json({
       value:parameter 
   });
}

