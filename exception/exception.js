class badRequestError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status || 404;
        this.name = 'badRequestError';
        if (!message) this.message = '요청하신 request를 확인해 주세요.가져올 데이터가 없거나, 요청이 올바르지 않다는 뜻';
    }
}

class unauthorizedError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status || 401;
        this.name = 'unauthorizedError';
        if (!message) this.message = '허가되지 않은 접근입니다. (authorization 확인)';
    }
}

class InvalidParamsError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status || 409;
        this.name = 'InvalidParamsError';
        if (!message) this.message = '요청한 데이터 형식이 올바르지 않습니다.';
    }
}

class ValidationError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status || 412;
        this.name = 'ValidationError';
        if (!message) this.message = '요청한 데이터 형식이 올바르지 않습니다.';
    }
}

module.exports = { InvalidParamsError, ValidationError, badRequestError, unauthorizedError };
