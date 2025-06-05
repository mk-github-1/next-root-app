"use client";

// React、MUI
import { JSX, useEffect } from "react";
import { Modal, Box, Typography, FormControlLabel, TextField, FormControl, InputLabel, Autocomplete, Checkbox, Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
// 他に Select: Select, MenuItemを利用、FormHelperText: エラーメッセージの位置調整などがある

// MUI for DatePicker
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

// Luxon
import { DateTime } from "luxon";

// React Hook Form
import { Controller, useForm } from "react-hook-form";

// Data
import { User, userSchema } from "@/types/User";

// Common
import { ModalContainer } from "@/common/organisms/ModalContainer";
import { ajvValidate } from "@/common/utilities/ajvValidate";

// Props (keyは受取不可、propsに含めないように注意)
interface IProps {
  isOpen: boolean;
  data: User | null;
  onFormSubmit: (user: User) => Promise<void>;
  // onDelete: (user: User) => Promise<void>;
  onClose: () => void;
}

// Organisms
export const ModalForm = (props: IProps): JSX.Element => {
  /**************************************************
   * Props
   *
   **************************************************/

  const { isOpen, data, onFormSubmit, onClose }: IProps = props;
  // console.log("modalマウント");

  // リストは実際はbackendや定数から取得
  const hobbies: Record<string, string>[] = [
    { code: "music", label: "音楽" },
    { code: "sports", label: "スポーツ" },
    { code: "reading", label: "読書" },
    { code: "travel", label: "旅行" }
  ];

  /**************************************************
   * 状態 (State)
   *
   **************************************************/

  // React Hook Form state
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setError
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
      updatedBy: ""
    }
  });

  /**************************************************
   * 副作用
   *
   **************************************************/

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
      applyDate: data.applyDate !== undefined ? data.applyDate : "",
      isEnabled: data.isEnabled !== undefined ? data.isEnabled : false,
      remarks: data.remarks !== undefined ? data.remarks : "",
      isDeleted: data.isDeleted !== undefined ? data.isDeleted : false,
      sortOrder: data.sortOrder !== undefined ? data.sortOrder : 0,
      createdAt: data.createdAt !== undefined ? data.createdAt : "",
      updatedAt: data.updatedAt !== undefined ? data.updatedAt : "",
      createdBy: data.createdBy !== undefined ? data.createdBy : "",
      updatedBy: data.updatedBy !== undefined ? data.updatedBy : ""
    };

    reset(user);
  }, [isOpen, data, reset]);

  /**************************************************
   * 関数・イベント ※Propsで渡す関数名はhandleから始める
   *
   **************************************************/

  // const onChange = (): void => {};

  const onSubmit = async (formData: User): Promise<void> => {
    // dataとformDataをマージ
    // data: 編集時のデータ(キー、日時など)を保持
    // formData: 入力内容で上書き
    // ...スプレッドでマージする場合は型を指定する
    const margeData: User = {
      ...data,
      ...formData
    };

    // Validation (自作ユーティリティ)
    const validationErrors = ajvValidate<User>(margeData, userSchema);

    // エラーがあればReact Hook Formに表示
    if (validationErrors.length) {
      for (const { field, message } of validationErrors) {
        // field as keyof User: User型のプロパティであること
        setError(field as keyof User, { type: "manual", message: message });
      }

      // エラー時は中断
      return;
    }

    const user = margeData;

    // Submit
    onFormSubmit(user);
  };

  /**************************************************
   * return JSX.Element
   *
   **************************************************/

  return (
    <>
      {/* Modal */}
      <Modal keepMounted={false} open={isOpen} onClose={onClose}>
        {/* MUI Datepickerの宣言 */}
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          {/* Form */}
          <ModalContainer>
            {/* Modal header */}
            <Typography variant="h6" component="h2">
              ユーザーの{!data ? "新規登録" : "編集"}
            </Typography>

            {/* Modal content */}
            <Box>
              {/* account */}
              <Box sx={{ mt: 2, display: "flex", alignItems: "flex-start" }}>
                <InputLabel size="small" sx={{ transform: "none", mt: 1, width: 200 }}>
                  アカウント名<span style={{ marginLeft: 1, color: "red" }}>*</span>
                </InputLabel>
                <Controller
                  name="account"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      size="small"
                      sx={{
                        flexGrow: 1,
                        "& .MuiFormHelperText-root": {
                          whiteSpace: "pre-line"
                        }
                      }}
                      {...field}
                      error={!!errors.account}
                      helperText={errors.account?.message}
                      placeholder="例: test@gmail.com"
                    />
                  )}
                />
              </Box>

              {/* username */}
              <Box sx={{ mt: 2, display: "flex", alignItems: "flex-start" }}>
                <InputLabel size="small" sx={{ transform: "none", mt: 1, width: 200 }}>
                  ユーザー名<span style={{ marginLeft: 1, color: "red" }}>*</span>
                </InputLabel>
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      size="small"
                      sx={{
                        flexGrow: 1,
                        "& .MuiFormHelperText-root": {
                          whiteSpace: "pre-line"
                        }
                      }}
                      {...field}
                      error={!!errors.username}
                      helperText={errors.username?.message}
                      placeholder="例: test"
                    />
                  )}
                />
              </Box>

              {/* password (パスワード更新はパスワードリマインダーなど専用で実施する必要あり) */}
              {!data ? (
                <Box sx={{ mt: 2, display: "flex", alignItems: "flex-start" }}>
                  <InputLabel size="small" sx={{ transform: "none", mt: 1, width: 200 }}>
                    パスワード
                  </InputLabel>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        sx={{
                          flexGrow: 1,
                          "& .MuiFormHelperText-root": {
                            whiteSpace: "pre-line"
                          }
                        }}
                        {...field}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        placeholder="例: test"
                      />
                    )}
                  />
                </Box>
              ) : (
                ""
              )}

              {/* age */}
              <Box sx={{ mt: 2, display: "flex", alignItems: "flex-start" }}>
                <InputLabel size="small" sx={{ transform: "none", mt: 1, width: 200 }}>
                  年齢
                </InputLabel>
                <Controller
                  name="age"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type="number"
                      size="small"
                      sx={{
                        flexGrow: 1,
                        "& .MuiFormHelperText-root": {
                          whiteSpace: "pre-line"
                        }
                      }}
                      {...field}
                      error={!!errors.age}
                      helperText={errors.age?.message}
                      placeholder="例: 20"
                    />
                  )}
                />
              </Box>

              {/* hobby */}
              <Box sx={{ mt: 2, display: "flex", alignItems: "flex-start" }}>
                <InputLabel id="hobby-label" size="small" sx={{ transform: "none", mt: 1, width: 200 }}>
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
                        sx={{
                          width: 200,
                          flexGrow: 1,
                          "& .MuiFormHelperText-root": {
                            whiteSpace: "pre-line"
                          }
                        }}
                        options={hobbies}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => option.code === value.code}
                        value={hobbies.find((element) => element.code === field.value) || null}
                        onChange={(event, newValue) => field.onChange(newValue?.code || "")}
                        renderInput={(params) => <TextField {...params} size="small" error={!!errors.hobby} helperText={errors.hobby?.message} placeholder="選択してください" />}
                        clearOnEscape
                      />
                    </FormControl>
                  )}
                />
              </Box>

              {/* applyDate */}
              <Box sx={{ mt: 2, display: "flex", alignItems: "flex-start" }}>
                <InputLabel size="small" sx={{ transform: "none", mt: 1, width: 200 }}>
                  適用日
                </InputLabel>
                <Controller
                  name="applyDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      value={field.value ? DateTime.fromISO(field.value) : null}
                      onChange={(newValue) => field.onChange(newValue ? newValue.toISO() : "")}
                      format="yyyy/MM/dd"
                      slotProps={{
                        textField: {
                          size: "small",
                          sx: {
                            flexGrow: 1,
                            "& .MuiFormHelperText-root": {
                              whiteSpace: "pre-line"
                            }
                          },
                          error: !!errors.applyDate,
                          helperText: errors.applyDate?.message,
                          placeholder: "日付を選択してください",
                          InputProps: {
                            /* TextFieldの右にクリアボタン埋込 */
                            endAdornment: field.value ? (
                              <ClearIcon
                                onClick={(e) => {
                                  // フォーカス取らせない
                                  e.stopPropagation();
                                  field.onChange(null);
                                }}
                                fontSize="small"
                                sx={{ cursor: "pointer", color: "#888", ml: 1 }}
                              />
                            ) : null
                          }
                        }
                      }}
                    />
                  )}
                />
              </Box>

              {/* isEnabled */}
              <Box sx={{ mt: 2, display: "flex", alignItems: "flex-start" }}>
                <InputLabel size="small" sx={{ transform: "none", mt: 1, width: 200 }}>
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
                          color: "rgba(0, 0, 0, 0.6)"
                        },
                        flexGrow: 1,
                        "& .MuiFormHelperText-root": {
                          whiteSpace: "pre-line"
                        }
                      }}
                      control={<Checkbox {...field} checked={field.value ? field.value : false} onChange={(e) => field.onChange(e.target.checked)} />}
                    />
                  )}
                />
              </Box>

              {/* remarks */}
              <Box sx={{ mt: 2, display: "flex", alignItems: "flex-start" }}>
                <InputLabel size="small" sx={{ transform: "none", mt: 1, width: 200 }}>
                  備考
                </InputLabel>
                <Controller
                  name="remarks"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      multiline
                      rows={3}
                      sx={{
                        flexGrow: 1,
                        "& .MuiFormHelperText-root": {
                          whiteSpace: "pre-line"
                        }
                      }}
                      size="small"
                      {...field}
                      error={!!errors.remarks}
                      helperText={errors.remarks?.message}
                    />
                  )}
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
                  <Button size="small" sx={{ ml: 1 }} variant="contained" color="error">
                    削除
                  </Button>
                )}
                <Button size="small" sx={{ ml: 1 }} variant="contained" color="inherit" onClick={onClose}>
                  閉じる
                </Button>
              </Box>
            </Box>
          </ModalContainer>
        </LocalizationProvider>
      </Modal>
    </>
  );
};
