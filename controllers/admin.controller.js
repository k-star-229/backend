const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require("fs");

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const user = {
            username: name,
            email: email,
            password: password
        };
        user.password = await bcrypt.hash(password, salt);

        fs.readFile('./db/admin.json', 'utf-8', function(err, data) {
            if (err) throw err
        
            var arrayOfObjects = JSON.parse(data);
        
            for(var i=0; i<arrayOfObjects.users.length;i++)
                if(arrayOfObjects.users[i].email == user.email)
                    return res
                        .status(400)
                        .json({ errors: [{ msg: 'User already exists' }] });
            
            arrayOfObjects.users.push(user);
            fs.writeFile('./db/admin.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
                if (err) throw err
                console.log('Done!')
            });

            console.log('register success!!!', email, password);
            res.status(200).json(user);
        });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

const loginUser = async (req, res) => {
    console.log("login", req.body);
    const { email, password } = req.body;
    let dbpassword = "";
    let dbusername;
    try {
        fs.readFile('./db/admin.json', 'utf-8', function(err, data) {
            if (err) throw err
        
            var arrayOfObjects = JSON.parse(data);
            for(var i=0; i<arrayOfObjects.users.length;i++)
                if(arrayOfObjects.users[i].email == email) {
                    dbpassword = arrayOfObjects.users[i].password;
                    dbusername = arrayOfObjects.users[i].username;
                    break;
                }
            
            if (dbpassword.length == 0) {
                return res
                .status(400)
                .json({ errors: [{ msg: 'User does not exists' }] });
            }
    
            const isMatch = bcrypt.compare(password, dbpassword);
    
            if (!isMatch) {
                return res
                .status(400)
                .json({ errors: [{ msg: 'Password is wrong' }] });
            }

            const user = {
                username: dbusername,
                email: email,
                password: dbpassword
            }
            res.status(200).json(user);
        });       

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

module.exports = {
    registerUser,
    loginUser
}