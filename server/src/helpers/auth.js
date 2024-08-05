import bcrypt from "bcrypt";

// Function to hash a password
const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      } else {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            reject(err);
          } else {
            resolve(hash);
          }
        });
      }
    });
  });
};

// Function to compare a password with a hashed value
const comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};
export { hashPassword, comparePassword };
