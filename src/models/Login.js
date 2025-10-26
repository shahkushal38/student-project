class Login {
    isValidEmail(email){
        console.log(" In Login model - ", email);
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
}

module.exports = new Login();