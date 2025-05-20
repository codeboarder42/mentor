import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CourseService } from 'src/course/course.service';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private readonly stripe: Stripe;
  private readonly webhook: string | null;
  constructor(
    private configService: ConfigService,
    private readonly courseService: CourseService,
  ) {
    const stripeSecretKey = this.configService.get('STRIPE_SECRET_KEY');
    this.stripe = new Stripe(stripeSecretKey);
    this.webhook = this.configService.get('STRIPE_WEB_KEY') ?? null;
  }

  public createPaymentIntent(
    params: Stripe.PaymentIntentCreateParams,
    options?: Stripe.RequestOptions,
  ) {
    return this.stripe.paymentIntents.create(params, options);
  }

  public async handleIncomingEvents(signature: string, rawBody: Buffer) {
    const event = await this.stripe.webhooks.constructEvent(
      rawBody,
      signature,
      this.webhook ?? '',
    );
    switch (event.type) {
      case 'payment_intent.created':
        console.log('Payment intent created');
        break;
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const metadata = paymentIntent.metadata;
        if (!metadata.announceId && !metadata.hours) {
          throw new BadRequestException('Cannot create payment intent');
        }
        const { announceId, hours, userId, date } = metadata;
        this.courseService.createCourses(
          +announceId,
          +hours,
          +userId,
          new Date(date),
        );
        console.log('Payment intent succeeded');
        break;
      case 'payment_intent.payment_failed':
        console.log('Payment intent failed');
        break;
    }

    return true;
  }
}
