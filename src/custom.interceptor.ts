import { ExecutionContext, NestInterceptor, CallHandler } from "@nestjs/common";
import { map } from "rxjs";

export class CustomInterceptor implements NestInterceptor {
  intercept(
    // Gives us more info about the incoming request
    context: ExecutionContext, 

    // the endpoint or the next interceptor that we want to give it too
    handler: CallHandler
  ){

    // console.log('This is intercepting the request')
    // console.log(context)

    // returns an observable [Learn about rxjs]
    return handler.handle().pipe(
      map((data) => {
        // console.log('This is intercepting the response')
        // console.log(data)

        // Manipulate data passing through here
        // response = an object
        const response = {
          ...data,
          createdAt: data.created_at
        };
        delete response.updated_at;
        delete response.created_at;

        return response;
      }),
    );
  }
}