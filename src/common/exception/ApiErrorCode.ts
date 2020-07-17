const ApiErrorCode = {
  // AUTH
  UNAUTHORIZED: {
    status: 401,
    code: 'api.error.unauthorized',
    msg: '로그인이 필요합니다.',
  },

  // USER
  USER_NOT_FOUND: {
    status: 400,
    code: 'api.error.user_not_found',
    msg: '유저를 찾을 수 없습니다.',
  },
  ALREADY_EXISTS_USER: {
    status: 400,
    code: 'api.error.already_exists_user',
    msg: '이미 존재하는 유저입니다.',
  },

  INVALID_REQUEST: {
    status: 400,
    code: 'api.error.invalid_request',
    msg: 'Invalid request body',
  },
  BAD_REQUEST: {
    status: 400,
    code: 'api.error.bad_request',
    msg: '잘못된 요청입니다.',
  },
  UNKNOWN: {
    status: 500,
    code: 'api.error.unknown',
    msg: '알수없는 오류입니다.',
  },
};

export default ApiErrorCode;
