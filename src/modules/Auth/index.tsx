import { useState, useCallback } from "react"
import { GoogleLogin, CredentialResponse } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"

interface IJWTCredentials {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  locale: string;
  name: string;
  picture: string;
}

export function Auth() {
  const [credentials, setCredentials] = useState<null | CredentialResponse>(null);
  const parsedCredentials = credentials && jwtDecode(credentials?.credential || "") as ReturnType<typeof jwtDecode> & IJWTCredentials;
  
  const onSuccess = useCallback((credentials: CredentialResponse) => {
    setCredentials(credentials);
  }, []);

  const onError = useCallback(() => {
    console.log("NOT GONNA HAPPEN")
  }, []);

  
  return (
    <>
      <GoogleLogin onSuccess={ onSuccess } onError={ onError } type="icon" />
      {credentials && <img src={parsedCredentials?.picture} alt="user" />}
    </>
  )
}