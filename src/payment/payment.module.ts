import { Module } from '@nestjs/common';
import { AnnounceModule } from 'src/announce/announce.module';
import { StripeModule } from 'src/stripe/stripe.module';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  providers: [PaymentService],
  controllers: [PaymentController],
  imports: [StripeModule, AnnounceModule],
})
export class PaymentModule {}

