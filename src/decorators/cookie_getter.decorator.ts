import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";


export const CookieGetter = createParamDecorator(
    async (data:string,context:ExecutionContext):Promise<string>=>{
        const request = context.switchToHttp().getRequest()
        const refrshToken = request.cookies[data]//obyectni ichidagi malumotlarga murojaat qilganda [] qo'yiladi string qaytaradi

        if (!refrshToken) {
            throw new UnauthorizedException('Token is not found')
        }
        return refrshToken
    }
)