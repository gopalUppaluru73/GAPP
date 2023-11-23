const checkEmail = email => {
    const [name, domain] = email.split('@')
    if(name && domain){
        const [domainName, end] = domain.split('.')
        if(domainName && end){
            return {status: true}
        }else{
            return {status: false, message: 'Invalid domain'}
        }
    }else{
        return {status: false, message: 'Invalid email address'}
    }
}

export const validateCreateAccount = obj => {
    const {firstname, lastname, address, contact, email, password} = obj
    const characterRegex = /^[a-zA-Z]+$/
    const addressRegex = /^[a-zA-Z0-9-/ ]+$/
    const contactRegex = /^[0-9+]+$/
    const emailRegex = /^[a-zA-Z0-9@.]+$/
    const passwordRegex = /^[a-zA-Z0-9@!$*&.]+$/
    if(firstname && lastname && address && contact && email && password){
        if(firstname.length > 2 && firstname.length < 21){
            if(characterRegex.test(firstname)){
                if(lastname.length > 2 && lastname.length < 21){
                    if(characterRegex.test(lastname)){
                        if(address.length > 3 && address.length < 35){
                            if(addressRegex.test(address)){
                                if(contact.length > 9 && contact.length < 15){
                                    if(contactRegex.test(contact)){
                                        if(email.length > 5 && email.length < 31){
                                            if(emailRegex.test(email)){
                                                const {status, message} = checkEmail(email)
                                                if(status){
                                                    if(password.length > 7){
                                                        if(passwordRegex.test(password)){
                                                            return {status: true}
                                                        }else{
                                                            return {status: false, message: 'Invalid password'}
                                                        }
                                                    }else{
                                                        return {status: false, message: 'Pasword length must be greater than 7 character'}
                                                    }
                                                }else{
                                                    return {status: status, message: message}
                                                }
                                            }else{
                                                return {status: false, message: 'Email address is not valid'}
                                            }
                                        }else{
                                            return {status: false, message: 'Email Id must not be less than 5 characters or more than 30'}
                                        }
                                    }else{
                                        return {status: false, message: 'Contact number may not be a valid'}
                                    }
                                }else{
                                    return {status: false, message: 'Contact number characters cannot be less than 9 or greater than 15'}
                                }
                            }else{
                                return {status: false, message: 'Address is not a valid one'}
                            }
                        }else{
                            return {status: false, message: 'Address characters should not be less than 3 characters or more than 35 characters'}
                        }
                    }else{
                        return {status: false, message: 'Lastname must contain alphabet characters only'}
                    }
                }else{
                    return {status: false, message: 'Lastname must not be less than 3 characters or more than 20 characters'}
                }
            }else{
                return {status: false, message: 'Firstname must contain alphabet characters only'}
            }
        }else{
            return {status: false, message: 'Firstname must not be less than 3 characters or more than 20 characters'}
        }
    }else{
        return {status: false, message: 'All the fields are required'}
    }
}

export const validateAddProduct = obj => {
    const {name, price} = obj
    const nameReg = /^[a-zA-Z ]+$/
    if(name && price){
        if(name.length > 3){
            if(nameReg.test(name)){
                if(Number(price)){
                    return {status: true}
                }else{
                    return {status: false, message: 'Product price must be a number type'}
                }
            }else{
                return {status: false, message: 'Product name must be alphabet characters only'}
            }
        }else{
            return {status: false, message: 'Product name must be more than 3 characters long'}
        }
    }else{
        return {status: false, message: 'All fields are required'}
    }
}