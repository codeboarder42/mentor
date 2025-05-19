import { Injectable, NotFoundException } from '@nestjs/common';
import { AnnounceService } from 'src/announce/announce.service';
import { StripeService } from 'src/stripe/stripe.service';
import { createPaymentDto } from './interface/create-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    private readonly stripeService: StripeService,
    private announceService: AnnounceService,
  ) {}

  private async calculAmount({
    announceId,
    hours,
  }: createPaymentDto): Promise<number> {
    const announce = await this.announceService.findOneById(announceId);
    if (!announce) {
      throw new NotFoundException('Announce not found');
    }

    return announce.price * 100 * hours;
  }

  public async createPayment(
    createPaymentParameters: createPaymentDto,
  ): Promise<string | null> {
    const amount = await this.calculAmount(createPaymentParameters);
    if (!amount) {
      throw new NotFoundException(
        'Missing ressource, amount cannot be calculated',
      );
    }
    const paymentIntent = await this.stripeService.createPaymentIntent({
      amount,
      currency: 'eur',
    });
    return paymentIntent.client_secret;
  }
}
