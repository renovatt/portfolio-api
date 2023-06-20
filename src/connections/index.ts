export const verifyUserId = (userId: string) => {
    const idRegex = /^[0-9a-fA-F]{24}$/;
    return !idRegex.test(userId);
};