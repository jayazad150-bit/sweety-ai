import { runSweety } from "@sweety-ai/ai-core";
import { runAutomation } from "@sweety-ai/ai-core/automation/bridge";



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

    /*
      Future ready:
      
      history Ã¢â€ â€™ Context Manager
      image   Ã¢â€ â€™ Vision module
      
      Currently AIEngine handles text.
    */



    let result;

    const automationResult =
      await runAutomation(message);

    if (automationResult.success && "result" in automationResult) {

      result = {
        reply: JSON.stringify(
          automationResult.result
        ),
        confidence: 1,
        handled: true
      };

    } else {

      result = await runSweety(message, image);

    }



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



