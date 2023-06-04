import React, { useContext } from "react";
import { AuthContext } from "../shared/AuthContext";
function Profile() {
    const { isLoggedIn, user } = useContext(AuthContext);
    console.log(user);
    return (

        <div>
            {user && (
                <div>
                    <div className="border">
                        <p>
                            Name : {user.firstName} {user.lastName}
                        </p>
                        <p>email : {user.email}</p>
                    </div>
                    <div>
                        <p>Manage address</p>
                    </div>
                </div>

            )}
        </div>

    );
}

export default Profile;
