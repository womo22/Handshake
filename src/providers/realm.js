import * as RealmWeb from "realm-web"

import React, { useContext, useState } from "react"

const RealmAppContext = React.createContext(null)

const RealmApp = ({ children }) => {
    const REALM_APP_ID = "hs-test-qfuav"
    const app = new RealmWeb.App({ id: REALM_APP_ID })
    const [user, setUser] = useState(null)

    const logIn = async (email, password) => {
        const credentials = RealmWeb.Credentials.emailPassword(email, password)
        try {
            user = app.logIn(credentials)
            setUser(app.currentUser)
            console.log("Successfully logged in!", user.id);
            return app.currentUser
        } catch (e) {
            setUser(null)
            return null
        }
        
    }
  

    const logOut = () => {
        if (user !== null) {
            app.currentUser.logOut()
            setUser(null)
        }
    }

    return (
        <RealmAppContext.Provider
            value={{
                logIn,
                logOut,
                user,
            }}
        >
            {children}
        </RealmAppContext.Provider>
    )
}

export const useRealmApp = () => {
    const realmContext = useContext(RealmAppContext)
    if (realmContext == null) {
        throw new Error("useRealmApp() called outside of a RealmApp?")
    }
    return realmContext
}

export default RealmApp