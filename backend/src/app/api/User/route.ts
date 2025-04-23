/*
 * /api/User
 *
 */
import { NextResponse } from "next/server";
// import { headers, cookies } from "next/headers";

// next-auth
// import { getServerSession } from "next-auth/next";
import Ajv from "ajv";
// ★ import {} from "next-auth";
// import { plainToClass, plainToInstance } from "class-transformer";
import { ResponseMessages } from "@/domain/utils/constants/ResponseMessages";
import { CustomException } from "@/domain/utils/types/CustomException";

import { container } from "@/settings/inversify/inversify.config";
import { Types } from "@/settings/inversify/Types";

import { UserDto } from "@/application/dtos/User/UserDto";
import { userSchema } from "@/application/dtos/User/UserSchema";
import { IUserService } from "@/application/services/User/IUserService";

// ★Next authの認証を追加する
export async function GET(request: Request) {
  // Get DI container
  const userService: IUserService = container.get<IUserService>(Types.UserService);

  try {
    // Request -> keys mapping
    const { searchParams } = new URL(request.url);

    const keys: Record<string, string> = searchParams.has("account")
      ? {
          account: searchParams.get("account") ?? "",
        }
      : {};

    // Validation
    if (Object.keys(keys).length > 0) {
      const ajv = new Ajv();
      const validate = ajv.compile(userSchema);
      const isValidate: boolean = validate(keys);
      if (!isValidate) throw new CustomException(ResponseMessages.BAD_REQUEST.message, 400);
    }

    // Service operation
    // const userDtos: UserDto[] | null = await userService.find(keys);
    // const resultXxDto: UserDto[] | null = await userService.findOne(keys)

    // ダミーデータ
    const userDtos: UserDto[] = [
      { account: "test1@gmail.com", username: "test1" },
      { account: "test2@gmail.com", username: "test2" },
    ];

    return await NextResponse.json(userDtos, { status: 200 });
  } catch (exception: unknown) {
    if (exception instanceof CustomException) {
      return await NextResponse.json({ message: exception.message }, { status: exception.status });
    }

    return await NextResponse.json({ message: ResponseMessages.INTERNAL_SERVER_ERROR.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  // Get DI container
  const userService: IUserService = container.get<IUserService>(Types.UserService);

  try {
    // Request -> dto mapping
    const userDto: UserDto = await request.json();

    // Validation
    const ajv = new Ajv();
    const validate = ajv.compile(userSchema);
    const isValidate: boolean = validate(userDto);
    if (!isValidate) throw new CustomException(ResponseMessages.BAD_REQUEST.message, 400);

    // Service operation
    await userService.create(userDto);

    return await NextResponse.json({ message: ResponseMessages.OK.message }, { status: 200 });
  } catch (exception: unknown) {
    if (exception instanceof CustomException) {
      return await NextResponse.json({ message: exception.message }, { status: exception.status });
    }

    return await NextResponse.json({ message: ResponseMessages.INTERNAL_SERVER_ERROR.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  // Get DI container
  const userService: IUserService = container.get<IUserService>(Types.UserService);

  try {
    // Request -> dto mapping
    const userDto: UserDto = await request.json();

    // Validation
    const ajv = new Ajv();
    const validate = ajv.compile(userSchema);
    const isValidate: boolean = validate(userDto);
    if (!isValidate) throw new CustomException(ResponseMessages.BAD_REQUEST.message, 400);

    // Service operation
    await userService.update(userDto);

    return await NextResponse.json({ message: ResponseMessages.OK.message }, { status: 200 });
  } catch (exception: unknown) {
    if (exception instanceof CustomException) {
      return await NextResponse.json({ message: exception.message }, { status: exception.status });
    }

    return await NextResponse.json({ message: ResponseMessages.INTERNAL_SERVER_ERROR.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  // Get DI container
  const userService: IUserService = container.get<IUserService>(Types.UserService);

  try {
    // Request -> dto mapping
    const userDto: UserDto = await request.json();

    // Validation
    const ajv = new Ajv();
    const validate = ajv.compile(userSchema);
    const isValidate: boolean = validate(userDto);
    if (!isValidate) throw new CustomException(ResponseMessages.BAD_REQUEST.message, 400);

    // Service operation
    await userService.delete({ key: userDto.account });

    return await NextResponse.json({ message: ResponseMessages.OK.message }, { status: 200 });
  } catch (exception: unknown) {
    if (exception instanceof CustomException) {
      return await NextResponse.json({ message: exception.message }, { status: exception.status });
    }

    return await NextResponse.json({ message: ResponseMessages.INTERNAL_SERVER_ERROR.message }, { status: 500 });
  }
}
