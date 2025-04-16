// import {} from 'next'
// import Ajv, { ValidateFunction } from "ajv";
// import fs from 'fs-extra'
// import path from 'path'
// import { plainToClass } from "class-transformer";
// import { XxService } from '@/application/services/XxService'
// import { XxDto } from '@/application/dtos/XxDto'

/* 共通の処理はどうする？、別ファイルで初期化してexportしておく必要がある
import Ajv, { JSONSchemaType } from "ajv";

// Validation
    this.ajv = ajv
    const paramsSchemaPath: string = path.resolve(__dirname, 'loginUser.params.validation.json')
    const paramsSchema: string[] = JSON.parse(fs.readFileSync(paramsSchemaPath, 'utf8'))
    this.paramsValidate = this.ajv.compile(paramsSchema)

    const schemaPath: string = path.resolve(__dirname, 'loginUser.validation.json')
    const schema: string[] = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
    this.validate = this.ajv.compile(schema)

/utils/validator.ts
export function loadSchemaValidator<T = any>(filename: string) {
  const ajv = new Ajv({
    allErrors: true,
    strict: false,
  });
  addFormats(ajv);

  // スキーマファイル読み込み
  const schemaPath = path.resolve(process.cwd(), "schemas", filename);
  const fileContent = fs.readFileSync(schemaPath, "utf8");

  try {
    const schema = JSON.parse(fileContent);
    return ajv.compile<T>(schema);
  } catch (err) {
    console.error(`${filename}`);
    throw err;
  }
}
 */

export async function GET(request: Request) {
  try {
    // Request -> keys mapping
    // const account: string = loginUserDto['account'] ? loginUserDto['account'] : ''
    // const keys: Record<string, string> = { account: account }

    // Service operation
    // const resultXxDto: XxDto | null = await xxService.findOne(keys)

    // ダミーデータ
    const users: Record<string, string>[] = [
      { mailAddress: "test1@gmail.com", userName: "test1" },
      { mailAddress: "test2@gmail.com", userName: "test2" },
    ];

    return await new Response(JSON.stringify(users), { status: 200 });
  } catch (error: unknown) {
    // customError型にして、message, statusCodeを取り出し
    return await new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Request -> dto mapping
    // const xXDto: XxDto = request.body
    // const isValidate: boolean = this.validate(xXDto);
    // if (!isValidate) throw new CustomException(400, "warning", "");

    // Service operation
    // await xXService.create(xXDto);

    return await new Response(JSON.stringify({ message: "OK" }), {
      status: 200,
    });
  } catch (error: unknown) {
    // customError型にして、message, statusCodeを取り出し

    return await new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    // Request -> dto mapping
    // const xXDto: XxDto = request.body
    // const isValidate: boolean = this.validate(xXDto);
    // if (!isValidate) throw new CustomException(400, "warning", "");

    // Service operation
    // await xXService.update(xXDto);

    return await new Response(JSON.stringify({ message: "OK" }), {
      status: 200,
    });
  } catch (error: unknown) {
    // customError型にして、message, statusCodeを取り出し

    return await new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    // Request -> dto mapping
    // const xXDto: XxDto = request.body
    // const isValidate: boolean = this.validate(xXDto);
    // if (!isValidate) throw new CustomException(400, "warning", "");

    // Service operation
    // await xXService.delete(xXDto);

    return await new Response(JSON.stringify({ message: "OK" }), {
      status: 200,
    });
  } catch (error: unknown) {
    // customError型にして、message, statusCodeを取り出し

    return await new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
