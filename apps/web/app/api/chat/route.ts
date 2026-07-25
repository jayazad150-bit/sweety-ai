import { AIEngine } from "@sweety-ai/ai-core";


export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();


    const message =
      typeof body.message === "string"
        ? body.message.trim()
        : "";


    const history =
      Array.isArray(body.history)
        ? body.history
        : [];


    const image =
      body.image ?? null;



    if (!message && !image) {

      return Response.json(
        {
          reply:
            "Message or image required.",
        },
        {
          status:400,
        }
      );

    }



    const engine =
      new AIEngine();



    /*
      Future ready:
      
      history → Context Manager
      image   → Vision module
      
      Currently AIEngine handles text.
    */



    const result =
      await engine.process(
        message
      );



    return Response.json({

      reply:
        result.reply,


      confidence:
        result.confidence,


      handled:
        result.handled,


      metadata: {

        hasImage:
          Boolean(image),


        historyLength:
          history.length,


        engine:
          "Sweety AI Ultimate"

      }


    });



  } catch(error) {


    console.error(
      "Sweety API Error:",
      error
    );


    return Response.json(

      {
        reply:
          error instanceof Error
          ?
          error.message
          :
          "Unknown error"
      },

      {
        status:500
      }

    );

  }

}