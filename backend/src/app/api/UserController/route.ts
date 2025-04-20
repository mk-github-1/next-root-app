import {} from "next";
import Ajv from "ajv";
// ★ import {} from "next-auth";
// import { plainToClass } from "class-transformer";
import { CustomException } from "@/domain/utils/CustumException";

import { UserDto } from "@/application/dtos/User/UserDto";
import { userSchema } from "@/application/dtos/User/UserSchema";
import { container } from "@/settings/inversify/inversify.config";
import { IUserService } from "@/application/services/User/IUserService";

// ★Next authの認証を追加する
export async function get(request: Request) {
  // Get DI container
  const userService: IUserService = container.get<IUserService>("UserService");

  try {
    // Request -> keys mapping
    const { searchParams } = new URL(request.url);
    const keys: Record<string, string> = {
      account: searchParams.get("account") ?? "",
    };

    // Validation
    // paramsがある時のみ
    const ajv = new Ajv();
    const validate = ajv.compile(userSchema);
    const isValidate: boolean = validate(keys);
    if (!isValidate) throw new CustomException(400, "400 Bad Request"); // ★messageは定数にする

    // Service operation
    const userDtos: UserDto[] | null = await userService.find(keys);
    // const resultXxDto: UserDto[] | null = await userService.findOne(keys)

    // ダミーデータ
    /*
    const users: UserDto[] = [
      { account: "test1@gmail.com", username: "test1" },
      { account: "test2@gmail.com", username: "test2" },
    ];
     */

    return await new Response(JSON.stringify(userDtos), { status: 200 });
  } catch (error: unknown) {
    if (error instanceof CustomException) {
      return await new Response(JSON.stringify({ error: error.message }), { status: Number(error.httpStatusCode) });
    }

    return await new Response(JSON.stringify({ error: "500 Internal Server Error" }), { status: 500 });
  }
}

export async function post(request: Request) {
  // Get DI container
  const userService: IUserService = container.get<IUserService>("UserService");

  try {
    // Request -> dto mapping
    const userDto: UserDto = await request.json();

    // Validation
    const ajv = new Ajv();
    const validate = ajv.compile(userSchema);
    const isValidate: boolean = validate(userDto);
    if (!isValidate) throw new CustomException(400, "400 Bad Request");

    // Service operation
    await userService.create(userDto);

    return await new Response(JSON.stringify({ message: "OK" }), {
      status: 200,
    });
  } catch (error: unknown) {
    if (error instanceof CustomException) {
      return await new Response(JSON.stringify({ error: error.message }), { status: Number(error.httpStatusCode) });
    }

    return await new Response(JSON.stringify({ error: "500 Internal Server Error" }), { status: 500 });
  }
}

export async function patch(request: Request) {
  // Get DI container
  const userService: IUserService = container.get<IUserService>("UserService");

  try {
    // Request -> dto mapping
    const userDto: UserDto = await request.json();

    // Validation
    const ajv = new Ajv();
    const validate = ajv.compile(userSchema);
    const isValidate: boolean = validate(userDto);
    if (!isValidate) throw new CustomException(400, "400 Bad Request");

    // Service operation
    await userService.update(userDto);

    return await new Response(JSON.stringify({ message: "OK" }), {
      status: 200,
    });
  } catch (error: unknown) {
    if (error instanceof CustomException) {
      return await new Response(JSON.stringify({ error: error.message }), { status: Number(error.httpStatusCode) });
    }

    return await new Response(JSON.stringify({ error: "500 Internal Server Error" }), { status: 500 });
  }
}

export async function del(request: Request) {
  // Get DI container
  const userService: IUserService = container.get<IUserService>("UserService");

  try {
    // Request -> dto mapping
    const userDto: UserDto = await request.json();

    // Validation
    const ajv = new Ajv();
    const validate = ajv.compile(userSchema);
    const isValidate: boolean = validate(userDto);
    if (!isValidate) throw new CustomException(400, "400 Bad Request");

    // Service operation
    await userService.delete({ key: userDto.account });

    return await new Response(JSON.stringify({ message: "OK" }), {
      status: 200,
    });
  } catch (error: unknown) {
    if (error instanceof CustomException) {
      return await new Response(JSON.stringify({ error: error.message }), { status: Number(error.httpStatusCode) });
    }

    return await new Response(JSON.stringify({ error: "500 Internal Server Error" }), { status: 500 });
  }
}
