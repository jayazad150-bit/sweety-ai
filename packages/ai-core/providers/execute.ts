import {
  getProvider,
  registerDefaultProviders
} from "./provider-manager";


let initialized = false;


function ensureProviders(){

  if(!initialized){

    registerDefaultProviders();

    initialized = true;

  }

}


export async function executeProvider(
  id:string,
  input:string,
  context?:unknown
){

  ensureProviders();


  const provider = getProvider(id);


  if(!provider){

    return {
      success:false,
      provider:id,
      error:`Provider "${id}" not found`
    };

  }


  try{

    const result =
      await provider.execute(
        input,
        context
      );


    return {

      success:true,

      provider:id,

      result

    };

  }
  catch(error){

    return {

      success:false,

      provider:id,

      error:
        error instanceof Error
          ? error.message
          : "Provider failed"

    };

  }

}
