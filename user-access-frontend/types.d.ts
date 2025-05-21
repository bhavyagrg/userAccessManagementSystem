export type AccessRequest = {
    id: number,
    accessType: string,
    reason: string,
    status: string,
    user: {
        username: string
    },
    software: {
        name: string
    }
};
