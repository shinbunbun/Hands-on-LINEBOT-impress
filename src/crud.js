const { TABLE_NAME } = process.env;

// データ作成
export const createData = (userId, dataType, data, appContext) => {
  // パラメータを作成
  const param = {
    TableName: TABLE_NAME,
    Item: {
      ID: userId,
      DataType: dataType,
      Data: data,
    },
  };

  // DynamoDBへデータを保存
  return appContext.dynamoDBContext.put(param);
};

// データ取得
export const readData = (userId, dataType, appContext) => {
  // パラメータを作成
  const param = {
    TableName: TABLE_NAME,
    ExpressionAttributeValues: {
      ':u': userId,
      ':d': dataType,
    },
    KeyConditionExpression: 'ID = :u and DataType = :d',
  };

  // DynamoDBからデータを取得
  return appContext.dynamoDBContext.query(param);
};

// データ更新
export const updateData = (userId, dataType, data, appContext) => {
  // パラメータを作成
  const param = {
    TableName: TABLE_NAME,
    Key: {
      ID: userId,
      DataType: dataType,
    },
    ExpressionAttributeValues: {
      ':d': data,
    },
    ExpressionAttributeNames: {
      '#d': 'Data',
    },
    UpdateExpression: 'set #d = :d',
  };

  // DynamoDBへデータを更新
  return appContext.dynamoDBContext.update(param);
};

// データ削除
export const deleteData = (userId, dataType, appContext) => {
  // パラメータを作成
  const param = {
    TableName: TABLE_NAME,
    Key: {
      ID: userId,
      DataType: dataType,
    },
  };

  // DynamoDBへデータを削除
  return appContext.dynamoDBContext.delete(param);
};
