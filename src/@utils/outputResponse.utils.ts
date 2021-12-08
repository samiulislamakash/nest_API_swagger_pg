export function filterOutput(
  success: boolean,
  message: string,
  data: any,
  total: number,
  take: number,
  page: number,
) {
  return {
    success,
    message,
    total,
    page,
    take,
    data,
  };
}

export function commonResponse(success: boolean, message: string, data: any) {
  if (success) {
    return {
      success,
      message,
      data,
    };
  } else {
    return { success, message, error: data };
  }
}
