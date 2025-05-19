import { Body, Controller, Post } from '@nestjs/common';
import { createPaymentDto } from './interface/create-payment.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}
  @Post('/create-payment')
  createPayment(@Body() body: createPaymentDto): Promise<string | null> {
    return this.paymentService.createPayment(body);
  }
}
