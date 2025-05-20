import { Controller, Headers, Post, RawBodyRequest, Req } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}
  @Post('webhook')
  async handleIncomingEvent(
    @Headers('stripe-signature') signature: string,
    @Req() req: RawBodyRequest<Request>,
  ): Promise<boolean> {
    return this.stripeService.handleIncomingEvents(signature, req);
  }
}
