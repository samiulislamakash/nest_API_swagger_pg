export function createOneOutput(createData) {
    const data = {
        success: true,
        message: 'New Data Created .',
        data: createData
    }
    return data;
}

export function updateOutput(updateData) {
    const data = {
        success: true,
        message: 'Update Data Successfull.',
        data: updateData
    }
    return data;
}

export function findOutput(findData) {
    const data = {
        success: true,
        message: 'Get Data Successfull.',
        data: findData
    }
    return data;
}

export function deleteOutput(deleteData) {
    const data = {
        success: true,
        message: `Delete ${deleteData.affected} Data Successfull.`
    }
    return data;
}