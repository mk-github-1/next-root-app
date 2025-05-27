"use client";

import { JSX, useEffect } from "react";

// React Hook Form
import { Controller, useForm } from "react-hook-form";

// MUI
import { Modal, Box, Typography, FormControlLabel, TextField, FormControl, InputLabel, Autocomplete, Checkbox, Button } from "@mui/material";
// 他に Select: Select, MenuItemを利用、FormHelperText: エラーメッセージの位置調整などがある

// MUI for DatePicker
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// Data
import { User, userSchema } from "@/types/User";
import { ajvValidate } from "@/common/utilities/ajvValidate";

// MUI modal style
const style = {
  position: "absolute", // 位置を自由に指定できるようにする
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)", // 中央に配置
  width: 700,
  maxHeight: "95vh",
  overflowY: "scroll",
  bgcolor: "background.paper", // 背景色（白やグレー）
  borderRadius: 2,
  boxShadow: 24, // 影をつけて浮かせる
  p: 4, // padding
  // scrollY: scroll,
};

// Props (keyは受取不可、propsに含めないように注意)
interface IProps {
  open: boolean;
  data: User | null;
  onFormSubmit: (user: User) => Promise<void>;
  onDelete: (user: User) => Promise<void>;
  onClose: () => void;
}

// Organisms
export const ModalForm = (props: IProps): JSX.Element => {
  // Props
  const { open, data, onFormSubmit, onDelete, onClose }: IProps = props;
  // console.log("modalマウント");

  // React Hook Form state
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setError,
  } = useForm<User>({
    defaultValues: {
      account: "",
      username: "",
      age: 0,
      hobby: "",
      isEnabled: false,
      remarks: "",
      isDeleted: false,
      sortOrder: 0,
      createdAt: "",
      updatedAt: "",
      createdBy: "",
      updatedBy: "",
    },
  });

  // 新規登録 or 編集
  useEffect(() => {
    if (!data) {
      reset();
      return;
    }

    const user: User = {
      account: data.account !== undefined ? data.account : "",
      username: data.username !== undefined ? data.username : "",
      password: data.password !== undefined ? data.password : "",
      age: data.age !== undefined ? data.age : 0,
      hobby: data.hobby !== undefined ? data.hobby : "",
      startDate: data.startDate !== undefined ? data.startDate : "",
      isEnabled: data.isEnabled !== undefined ? data.isEnabled : false,
      remarks: data.remarks !== undefined ? data.remarks : "",
      isDeleted: data.isDeleted !== undefined ? data.isDeleted : false,
      sortOrder: data.sortOrder !== undefined ? data.sortOrder : 0,
      createdAt: data.createdAt !== undefined ? data.createdAt : "",
      updatedAt: data.updatedAt !== undefined ? data.updatedAt : "",
      createdBy: data.createdBy !== undefined ? data.createdBy : "",
      updatedBy: data.updatedBy !== undefined ? data.updatedBy : "",
    };

    reset(user);
  }, [open, data, reset]);

  // const handleChange = () => {};

  const onSubmit = async (formData: User) => {
    // dataとformDataをマージ
    // data: 編集時のデータ(キー、日時など)を保持
    // formData: 入力内容で上書き
    const user: User = {
      ...data,
      ...formData,
    };

    // Validation (自作ユーティリティ)
    const result = ajvValidate<User>(user, userSchema);

    // エラーがあればReact Hook Formに表示
    // ユーザー名が引っ掛からない
    if (!result.valid && result.errors) {
      for (const [field, message] of Object.entries(result.errors)) {
        setError(field as keyof User, {
          type: "manual",
          message,
        });
      }

      // キャンセル
      return;
    }

    // Submit
    onFormSubmit(user);
  };

  const hobbies: Record<string, string>[] = [
    { code: "music", label: "音楽" },
    { code: "sports", label: "スポーツ" },
    { code: "reading", label: "読書" },
    { code: "travel", label: "旅行" },
  ];

  return (
    <>
      {/* Modal */}
      <Modal keepMounted={false} open={open} onClose={onClose}>
        {/* MUI Datepickerの宣言 */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {/* Form */}
          <Box sx={style}>
            {/* Modal header */}
            <Typography variant="h6" component="h2">
              ユーザーの{!data ? "新規登録" : "編集"}
            </Typography>

            {/* Modal content */}
            <Box>
              {/* account */}
              <Box sx={{ mt: 2, display: "flex", alignItems: "flex-start" }}>
                <InputLabel
                  size="small"
                  sx={{
                    width: 200,
                    mt: "6px",
                    fontSize: "0.875rem", // MUIのbody2相当
                    lineHeight: "1.5",
                  }}
                >
                  アカウント名<span style={{ marginLeft: 1, color: "red" }}>*</span>
                </InputLabel>
                <Controller
                  name="account"
                  control={control}
                  render={({ field }) => (
                    <TextField size="small" sx={{ width: 400 }} {...field} error={!!errors.account} helperText={errors.account?.message?.toString()} placeholder="例: test@gmail.com" />
                  )}
                />
              </Box>

              {/* username */}
              <Box sx={{ mt: 2, display: "flex" }}>
                <InputLabel size="small" sx={{ width: 200 }}>
                  ユーザー名<span style={{ marginLeft: 1, color: "red" }}>*</span>
                </InputLabel>
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => <TextField size="small" {...field} error={!!errors.username} helperText={errors.username?.message?.toString()} placeholder="例: test" />}
                />
              </Box>

              {/* password (パスワード更新はパスワードリマインダーなど専用で実施する必要あり) */}
              {!data ? (
                <Box sx={{ mt: 2, display: "flex" }}>
                  <InputLabel size="small" sx={{ width: 200 }}>
                    パスワード
                  </InputLabel>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => <TextField size="small" {...field} error={!!errors.password} helperText={errors.password?.message?.toString()} placeholder="例: test" />}
                  />
                </Box>
              ) : (
                ""
              )}

              {/* age */}
              <Box sx={{ mt: 2, display: "flex" }}>
                <InputLabel size="small" sx={{ width: 200 }}>
                  年齢
                </InputLabel>
                <Controller
                  name="age"
                  control={control}
                  render={({ field }) => <TextField type="number" size="small" {...field} error={!!errors.age} helperText={errors.age?.message?.toString()} placeholder="例: 20" />}
                />
              </Box>

              {/* hobby */}
              <Box sx={{ mt: 2, display: "flex" }}>
                <InputLabel id="hobby-label" size="small" sx={{ width: 200 }}>
                  趣味
                </InputLabel>
                <Controller
                  name="hobby"
                  control={control}
                  render={({ field }) => (
                    <FormControl size="small">
                      {/* renderInputはslotPropsに更新される可能性あり */}
                      <Autocomplete
                        {...field}
                        sx={{ width: 200 }}
                        options={hobbies}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => option.code === value.code}
                        value={hobbies.find((element) => element.code === field.value) || null}
                        onChange={(event, newValue) => field.onChange(newValue?.code || "")}
                        renderInput={(params) => <TextField {...params} size="small" error={!!errors.hobby} helperText={errors.hobby?.message?.toString()} placeholder="選択してください" />}
                        clearOnEscape
                      />
                    </FormControl>
                  )}
                />
              </Box>

              {/* startDate */}
              <Box sx={{ mt: 2, display: "flex" }}>
                <InputLabel size="small" sx={{ width: 200 }}>
                  開始日
                </InputLabel>
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      value={field.value ? new Date(field.value) : null}
                      onChange={(newValue) => field.onChange(newValue)}
                      format="yyyy/MM/dd"
                      slotProps={{
                        textField: {
                          size: "small",
                          error: !!errors.startDate,
                          helperText: errors.startDate?.message?.toString(),
                          placeholder: "日付を選択してください",
                        },
                        actionBar: {
                          actions: ["clear", "accept"],
                        },
                      }}
                    />
                  )}
                />
              </Box>

              {/* isEnabled */}
              <Box sx={{ mt: 2, display: "flex" }}>
                <InputLabel size="small" sx={{ width: 200 }}>
                  有効
                </InputLabel>
                <Controller
                  name="isEnabled"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      label="有効にする"
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          color: "rgba(0, 0, 0, 0.6)",
                        },
                      }}
                      control={<Checkbox {...field} checked={field.value ? field.value : false} onChange={(e) => field.onChange(e.target.checked)} />}
                    />
                  )}
                />
              </Box>

              {/* remarks */}
              <Box sx={{ mt: 2, display: "flex" }}>
                <InputLabel size="small" sx={{ width: 200 }}>
                  備考
                </InputLabel>
                <Controller
                  name="remarks"
                  control={control}
                  render={({ field }) => <TextField multiline rows={3} sx={{ width: 400 }} size="small" {...field} error={!!errors.remarks} helperText={errors.remarks?.message?.toString()} />}
                />
              </Box>

              {/* hidden */}
              <input type="hidden" {...register("sortOrder")} />
              <input type="hidden" {...register("isDeleted")} />
              <input type="hidden" {...register("createdAt")} />
              <input type="hidden" {...register("updatedAt")} />
              <input type="hidden" {...register("createdBy")} />
              <input type="hidden" {...register("updatedBy")} />

              {/* Modal footer */}
              <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                <Button size="small" variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                  {!data ? "登録" : "更新"}
                </Button>
                {data && (
                  <Button size="small" sx={{ ml: 1 }} variant="contained" color="error" onClick={() => onDelete(data)}>
                    削除
                  </Button>
                )}
                <Button size="small" sx={{ ml: 1 }} variant="contained" color="inherit" onClick={onClose}>
                  閉じる
                </Button>
              </Box>
            </Box>
          </Box>
        </LocalizationProvider>
      </Modal>
    </>
  );
};
