import e from 'express';

export function createOutput(createData) {
  const data = {
    success: true,
    message: 'New Data Created .',
    data: createData,
  };
  return data;
}

export function updateOutput(updateData) {
  const data = {
    success: true,
    message: 'Update Data Successfull.',
    data: updateData,
  };
  return data;
}

export function findOutput(
  findData,
  total: number,
  take: number,
  page: number,
) {
  const data = {
    success: true,
    message: 'Get Data Successfull.',
    total,
    page,
    take,
    data: findData,
  };
  return data;
}

export function deleteOutput(deleteData) {
  const data = {
    success: true,
    message: `Delete ${deleteData.affected} Data Successfull.`,
  };
  return data;
}

export function loginOutput(loginData) {
  const data = {
    success: true,
    message: 'Login Successfull.',
    token: loginData,
  };
  return data;
}

export function tokenOutput(success: boolean, message: string) {
  const data = {
    success,
    message,
  };
  return data;
}

export function getByIdOutput(findData) {
  const data = {
    success: true,
    message: 'Get Data Successfull.',
    data: findData,
  };
}

export function commonOutput(message: string, data: Object) {
  return { message, data };
}
