import axios from 'axios'

const useAuth = () =>  {
  const signin = async (email: string, password: string) => {
        try{
            const response = await axios.post('/api/auth/signin', { email, password })
            console.log(response.data)
        }catch(error){
            console.log(error)
        }

  }
    const signup = async (email: string, password: string, first_name: string, last_name: string) => {
        const response = await axios.post('/api/auth/signup', { email, password, first_name, last_name })
        return response.data
    }


    return {
        signin,
        signup
    }
}

export default useAuth

