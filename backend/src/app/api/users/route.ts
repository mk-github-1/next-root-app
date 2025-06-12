import { NextRequest, NextResponse } from "next/server";
// import { headers, cookies } from "next/headers";

// Auth.js
// import { Auth, type AuthConfig } from "@auth/core"
// import Google from "@auth/core/providers/google"

// Inversify
import { container } from "@/settings/inversify/inversify.config";
import { Types } from "@/settings/inversify/Types";

// Luxon
// import { DateTime } from "luxon";

// class-transformer
// import { plainToClass, plainToInstance } from "class-transformer";

// Data、Service
import { UserDto, userSchema } from "@/application/dtos/User/UserDto";
import { IUserService } from "@/application/services/User/IUserService";

// Common
import { sanitize } from "@/application/utilities/sanitize";
import { ajvValidate } from "@/application/utilities/ajvValidate";
import { ResponseMessages } from "@/domain/utils/constants/ResponseMessages";
import { CustomException } from "@/domain/utils/types/CustomException";

// ★Next authの認証を追加する
export async function GET(request: NextRequest): Promise<NextResponse<UserDto[]> | NextResponse<{ message: string }>> {
  // Get DI container
  // const userService: IUserService = container.get<IUserService>(Types.UserService);

  try {
    // Request -> Sanitize & keys mapping
    const { searchParams } = new URL(request.url); // sanitize()

    const keys: Record<string, string> = searchParams.has("account")
      ? {
          account: searchParams.get("account") ?? ""
        }
      : {};

    // Validation
    /*
    if (Object.keys(keys).length > 0) {
      const ajv: Ajv = new Ajv();
      const validate: ValidateFunction<UserDto> = ajv.compile(userSchema);
      const isValidate: boolean = validate(keys);

      if (!isValidate) {
        const status: number = 400;
        throw new CustomException(ResponseMessages[status], status);
      }
    }
     */

    // Service operation
    // const userDtos: UserDto[] | null = await userService.find(keys);
    // const resultXxDto: UserDto[] | null = await userService.findOne(keys)

    // ダミーデータ
    const userDtos: UserDto[] = [
      {
        account: "test1@gmail.com",
        username: "test1",
        hobby: "music",
        age: 1,
        applyDate: new Date().toISOString(),
        isEnabled: true,
        remarks: "test1",
        isDeleted: false,
        sortOrder: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: "createdBy1",
        updatedBy: "updatedBy1"
      },
      {
        account: "test2@gmail.com",
        username: "test2",
        age: 2,
        hobby: "sports",
        applyDate: new Date().toISOString(),
        isEnabled: false,
        remarks: "test2",
        isDeleted: true,
        sortOrder: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: "createdBy2",
        updatedBy: "updatedBy2"
      }
    ];

    return await NextResponse.json(userDtos, { status: 200 });
  } catch (exception: unknown) {
    if (exception instanceof CustomException) {
      return await NextResponse.json({ message: exception.message }, { status: exception.status });
    }

    const status: number = 500;
    return await NextResponse.json({ message: ResponseMessages[status] }, { status: status });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<UserDto> | NextResponse<{ message: string }>> {
  // Get DI container
  const userService: IUserService = container.get<IUserService>(Types.UserService);

  try {
    // Request -> Sanitize & dto mapping
    const temp: UserDto = await request.json(); // sanitize()

    // Validation
    const validationErrors = ajvValidate<UserDto>(temp, userSchema);
    if (validationErrors.length) throw new CustomException(ResponseMessages[400], 400);

    // Validation後に型にセット
    const userDto: UserDto = temp;

    // Service operation
    // const user: UserDto = await userService.create(userDto);

    return await NextResponse.json(userDto); /* user */
  } catch (exception: unknown) {
    if (exception instanceof CustomException) {
      return await NextResponse.json({ message: exception.message }, { status: exception.status });
    }

    const status: number = 500;
    return await NextResponse.json({ message: ResponseMessages[status] }, { status: status });
  }
}

export async function PATCH(request: NextRequest): Promise<NextResponse<UserDto> | NextResponse<{ message: string }>> {
  // Get DI container
  const userService: IUserService = container.get<IUserService>(Types.UserService);

  try {
    // Request -> Sanitize & dto mapping
    const temp: UserDto = await request.json(); // sanitize()

    // Validation
    const validationErrors = ajvValidate<UserDto>(temp, userSchema);
    if (validationErrors.length) throw new CustomException(ResponseMessages[400], 400);

    // Validation後に型にセット
    const userDto: UserDto = temp;

    // Service operation
    // const user: UserDto = await userService.update(userDto);

    return await NextResponse.json(userDto); /* user */
  } catch (exception: unknown) {
    if (exception instanceof CustomException) {
      return await NextResponse.json({ message: exception.message }, { status: exception.status });
    }

    const status: number = 500;
    return await NextResponse.json({ message: ResponseMessages[status] }, { status: status });
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse<UserDto> | NextResponse<{ message: string }>> {
  // Get DI container
  const userService: IUserService = container.get<IUserService>(Types.UserService);

  try {
    // Request -> Sanitize & dto mapping
    const temp: UserDto = await request.json(); // sanitize()

    // Validation
    const validationErrors = ajvValidate<UserDto>(temp, userSchema);
    if (validationErrors.length) throw new CustomException(ResponseMessages[400], 400);

    // Validation後に型にセット
    const userDto: UserDto = temp;

    // Service operation
    // const user: UserDto = await userService.delete({ key: userDto.account });

    return await NextResponse.json(userDto); /* user */
  } catch (exception: unknown) {
    if (exception instanceof CustomException) {
      return await NextResponse.json({ message: exception.message }, { status: exception.status });
    }

    const status: number = 500;
    return await NextResponse.json({ message: ResponseMessages[status] }, { status: status });
  }
}
