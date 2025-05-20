import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/guards/role.decorator';
import { RoleGuard } from 'src/guards/role.guard';
import { Role } from 'src/user/interface/role';
import { createPaymentDto } from './interface/create-payment.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}
  @Post('/create-payment')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Student)
  createPayment(
    @Body() body: createPaymentDto,
    @Req() { user },
  ): Promise<string | null> {
    return this.paymentService.createPayment(body, user.sub);
  }
}
