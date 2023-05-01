const RestClient = {
    async Get<Success, Err>(
        url: string,
        headers: Record<string, string> = {},
    ): Promise<Result<Success, Err>> {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        });

        if (!res.ok) return Result.Fail(await res.json());

        return Result.Ok(await res.json());
    },

    async Post<Success, Err>(
        url: string,
        body: any,
        headers: Record<string, string> = {},
    ): Promise<Result<Success, Err>> {
        const res = await fetch(url, {
            method: 'POST',
            headers,
            body: body instanceof FormData ? body : JSON.stringify(body),
        });

        if (!res.ok) return Result.Fail(await res.json());

        return Result.Ok(await res.json());
    },

    async Patch<Success, Err>(
        url: string,
        body: any,
        headers: Record<string, string> = {},
    ): Promise<Result<Success, Err>> {
        const res = await fetch(url, {
            method: 'PATCH',
            headers,
            body: body instanceof FormData ? body : JSON.stringify(body),
        });

        if (!res.ok) return Result.Fail(await res.json());

        return Result.Ok(await res.json());
    },

    async Delete<Success, Err>(
        url: string,
        headers: Record<string, string> = {},
    ): Promise<Result<Success, Err>> {
        const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        });

        if (!res.ok) return Result.Fail(await res.json());

        return Result.Ok({} as Success);
    },
};

class Result<Success, Err> {
    static Ok<Success, Err>(data: Success) {
        return new Result(true, data, null as Err);
    }

    static Fail<Success, Err>(error: Err) {
        return new Result(false, null as Success, error);
    }

    private constructor(
        private readonly isSuccess: boolean,
        private readonly data: Success | null,
        private readonly err: Err | null,
    ) {}

    success() {
        return this.isSuccess;
    }

    unpack() {
        if (!this.success()) throw new Error('cannot call unpack on error');

        return this.data!;
    }

    error() {
        if (this.success()) throw new Error('cannot call error on success');

        return this.err!;
    }
}

export { RestClient };
