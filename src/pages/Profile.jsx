import React, { useContext, useState } from "react";
import { AuthContext } from "../shared/AuthContext";
const defaultForm = {
  city: "",
  country: "",
  isEdit: true,
  mobile: "",
  name: "",
  state: "",
  street: "",
  zipCode: "",
  _id: 0,
};
function Profile() {
  const { isLoggedIn, user, setUserDetail } = useContext(AuthContext);
  const [addressForm, setAddressForm] = useState(defaultForm);
  console.log(user);
  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    setAddressForm((curr) => {
      return { ...curr, [name]: value };
    });
  };
  const handleEdit = (id) => {
    const address = user.address.map((add) => {
      if (id === add._id) {
        setAddressForm({ ...add, isEdit: true });
        return { ...add, isEdit: true };
      } else return add;
    });

    setUserDetail({ ...user, address });
  };
  const handleDelete = () => {};
  const handleAdd = () => {
    const newAddress = { ...defaultForm, _id: Math.random() };
    const address = [...user.address, newAddress];
    setAddressForm(newAddress);
    setUserDetail((curr) => {
      return { ...curr, address };
    });
  };
  const handleSave = () => {
    console.log("addressForm", addressForm);
    console.log("user", user);
    const address = user.address.map((add) => {
      if (addressForm._id === add._id) {
        return { ...addressForm, isEdit: false };
      } else return add;
    });

    setUserDetail((curr) => {
      return { ...curr, address };
    });
    setAddressForm(defaultForm);
  };
  return (
    <div>
      {user && (
        <div>
          <p className="page-sub-heading">My profile 🤵</p>
          <div className="border profile-card">
            <p>
              Name : {user.firstName} {user.lastName}
            </p>
            <p>email : {user.email}</p>
          </div>
          <div>
            <p className="page-sub-heading">Manage Address 🏠</p>
            {user?.address?.length > 0 && (
              <div>
                {user.address.map(
                  ({ name, street, state, zipCode, mobile, isEdit, _id }) => (
                    <div className="border address-card">
                      {isEdit ? (
                        <div className="adddress-form">
                          <input
                            name="name"
                            placeholder="Enter name..."
                            value={addressForm.name}
                            onChange={handleChange}
                          />
                          <input
                            name="street"
                            placeholder="Enter street..."
                            value={addressForm.street}
                            onChange={handleChange}
                          />
                          <input
                            name="city"
                            placeholder="Enter city..."
                            value={addressForm.city}
                            onChange={handleChange}
                          />
                          <input
                            name="state"
                            placeholder="Enter state..."
                            value={addressForm.state}
                            onChange={handleChange}
                          />
                          <input
                            name="country"
                            placeholder="Enter country..."
                            value={addressForm.country}
                            onChange={handleChange}
                          />
                          <input
                            name="mobile"
                            placeholder="Enter mobile no..."
                            value={addressForm.mobile}
                            onChange={handleChange}
                          />
                          <input
                            name="zipCode"
                            placeholder="Enter zip code..."
                            value={addressForm.zipCode}
                            onChange={handleChange}
                          />
                          <button onClick={handleSave}>save</button>
                        </div>
                      ) : (
                        <div>
                          <p>{name},</p> {street},{state},{zipCode}
                          <p>Phone no. {mobile}</p>
                          <button onClick={() => handleEdit(_id)}>Edit</button>
                          <button onClick={() => handleDelete(_id)}>
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )
                )}
                <button className="add-new-address-btn" onClick={handleAdd}>
                  Add a new Address ➕🏠
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
