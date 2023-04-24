import validator from 'validator';

export async function GET(request: Request, response: Response) {
  return new Response(JSON.stringify({meassage: "My SignUP implementation!"}),  {status: 200, headers: {'Content-Type': 'application/json'}})
}

export async function POST(request: Request) {

  //const { email, password } = await request.json();
  const body = await request.json();
  console.log(body);

  // Validation would be much better on the client side, but we'll do it here for now
  const validationSchema = [
    {
      valid: validator.isEmail(body.email),
      message: 'Email address is invalid',
    },
    {
      valid: validator.isLength(body.password, { min: 3 }),
      message: 'Password must be at least 3 characters',
    },
    {
      valid: validator.isLength(body.firstName, { min: 3, max:20, }),
      message: 'FirstName must be at least 3 characters',
    },
    {
      valid: validator.isLength(body.lastName, { min: 3, max:20, }),
      message: 'FirstName must be at least 3 characters',
    },
    {
      valid: validator.isMobilePhone(body.phoneNumber, 'any'),
      message: 'Mobile phone number is not valid',
    },
    {
      valid: validator.isLength(body.city, { min: 3, max:20, }),
      message: 'City must be at least 3 characters',
    },
    {
      valid: validator.isStrongPassword(body.password, { minLength: 3, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }),
      message: 'Password must be at least 3 characters, contain at least one lowercase letter, one uppercase letter, one number, and one symbol',
    },
    ];

    validationSchema.forEach((item) => {
      console.log(item);
      if (item.valid === false) {
        console.log("internal: "+item.message);
        // NEZNAM ZASTO NE RABOTI
        return new Response(item.message, {status: 400});
      }
    });

    try {
      console.log(body.email);  
      return new Response('Email submitted successfully', {status: 200});
    } catch (error) {
      console.error('DynamoDB error:', error);
      return new Response('Failed to submit email', {status: 500});
    } 

}