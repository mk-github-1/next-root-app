export const ResponseMessages: Record<number, string> = {
  200: "処理が正常に完了しました。",
  400: "リクエストの内容に誤りがあります。",
  404: "データが見つかりませんでした。",
  409: "すでに登録されているか、重複するデータがあります。",
  500: "サーバーでエラーが発生しました。時間をおいてから再度実行してください。",
};

/*
export const ResponseMessages = {
  OK: {
    message: "200 OK",
    status: "処理が正常に完了しました。",
  },
  BAD_REQUEST: {
    message: "リクエストの内容に誤りがあります。",
    status: "400",
  },
  NOT_FOUND: {
    message: "データが見つかりませんでした。",
    status: "404",
  },
  CONFLICT: {
    message: "すでに登録されているか、重複するデータがあります。",
    status: "409",
  },
  INTERNAL_SERVER_ERROR: {
    message: "サーバーでエラーが発生しました。時間をおいてから再度実行してください。",
    status: "500",
  },
};
*/
