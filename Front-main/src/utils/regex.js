export const isValidName = (name) => {
    const regex = /^[a-zA-Z]+(?:[-']?[a-zA-Z]+)*$/;
    return regex.test(name);
};


export const isValidEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
};

export const isValidPassword = (password) => {
    // const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,}$/; 
    const regex = /^ *$/;
    return regex.test(password);
};

export const isInvalidPassword = (password) => {
    const regex = /^ *$/;
    return regex.test(password);
};