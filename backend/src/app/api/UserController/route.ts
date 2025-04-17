import {} from "next";
import Ajv from "ajv";
// ★ import {} from "next-auth";
// import { plainToClass } from "class-transformer";
import { CustomException } from "@/domain/utils/CustumException";

import { UserDto, userParamsSchema, userSchema } from "@/application/dtos/UserDto";
// import { UserService } from '@/application/services/UserService'

// ★Next authの認証を追加する
export async function GET(request: Request) {
  try {
    // Request -> keys mapping
    const userDto: UserDto = await request.json();
    const account: string = userDto["mailAddress"] ? userDto["mailAddress"] : "";
    const keys: Record<string, string> = { account: account };

    // Validation
    const ajv = new Ajv();
    const validate = ajv.compile(userParamsSchema);
    const isValidate: boolean = validate(keys);
    if (!isValidate) throw new CustomException(400, "warning", "");

    // Service operation
    // const resultXxDto: XxDto | null = await xxService.findAll(keys)
    // const resultXxDto: XxDto | null = await xxService.findOne(keys)

    // ダミーデータ
    const users: Record<string, string>[] = [
      { mailAddress: "test1@gmail.com", userName: "test1" },
      { mailAddress: "test2@gmail.com", userName: "test2" },
    ];

    return await new Response(JSON.stringify(users), { status: 200 });
  } catch (error: unknown) {
    if (error instanceof CustomException) {
      return await new Response(JSON.stringify({ error: error.message }), { status: Number(error.httpStatusCode) });
    }

    return await new Response(JSON.stringify({ error: "500 Internal Server Error" }), { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Request -> dto mapping
    const userDto: UserDto = await request.json();

    // Validation
    const ajv = new Ajv();
    const validate = ajv.compile(userSchema);
    const isValidate: boolean = validate(userDto);
    if (!isValidate) throw new CustomException(400, "warning", "");

    // Service operation
    // await xXService.create(userDto);

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

export async function PATCH(request: Request) {
  try {
    // Request -> dto mapping
    const userDto: UserDto = await request.json();

    // Validation
    const ajv = new Ajv();
    const validate = ajv.compile(userSchema);
    const isValidate: boolean = validate(userDto);
    if (!isValidate) throw new CustomException(400, "warning", "");

    // Service operation
    // await xXService.update(userDto);

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

export async function DELETE(request: Request) {
  try {
    // Request -> dto mapping
    const userDto: UserDto = await request.json();

    // Validation
    const ajv = new Ajv();
    const validate = ajv.compile(userSchema);
    const isValidate: boolean = validate(userDto);
    if (!isValidate) throw new CustomException(400, "warning", "");

    // Service operation
    // await xXService.delete(userDto);

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
