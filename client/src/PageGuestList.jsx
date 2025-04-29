import { useEffect, useState } from "react";
import * as cookie from "cookie";
import "./PageGuestList.css";

export function PageGuestList() {

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [rsvp_status, setRsvpStatus] = useState("");
    const [guests, setGuests] = useState([]);
    // const [taskList, setTaskList] = useState([]);


    async function createGuest(e) {
        e.preventDefault();
        const res = await fetch("guest_list/", {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": cookie.parse(document.cookie).csrftoken,
            },
            body: JSON.stringify({
                first_name,
                last_name,
                role,
                email,
                phone_number,
                rsvp_status,
            }),
        })
        setFirstName("");
        setLastName("");
        setRole("");
        setEmail("");
        setPhoneNumber("");
        setRsvpStatus("");

        const body = await res.json()
        setGuests([...guests, body.guest])

    }

    async function getGuests() {
        const res = await fetch("/guest_list/", {
            credentials: "same-origin",
        })
        const body = await res.json();
        setGuests(body.guests || []);
    }

    useEffect(() => {
        getGuests()
    }
        , [])

    return (
        <>
            <h1>Guest List</h1>
            <div className="container display-guest">

            </div>
            <div className="flex flex-row align-top space-evenly justify-center" id="container">
                <div className="flex flex-col align-center justify-between">
                    <h3>Total Guests: {guests.length}</h3>
                    <form onSubmit={createGuest} className="guest-list-form flex flex-col justify-between align-center">
                        <h4>Add Guest</h4>
                        <label>
                            <div>First Name</div>
                            <input type="text" onChange={(e) => setFirstName(e.target.value)} value={first_name} required></input>
                        </label>
                        <label>
                            <div>Last Name</div>
                            <input type="text" onChange={(e) => setLastName(e.target.value)} value={last_name} required></input>
                        </label>
                        <label>
                            <div>Role</div>
                            <input type="text" onChange={(e) => setRole(e.target.value)} value={role} required></input>
                        </label>
                        <label>
                            <div>Email</div>
                            <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} required></input>
                        </label>
                        <label>
                            <div>Phone Number</div>
                            <input type="text" onChange={(e) => setPhoneNumber(e.target.value)} value={phone_number} required></input>
                        </label>
                        <label>
                            <div>RSVP Status</div>
                            <input type="text" onChange={(e) => setRsvpStatus(e.target.value)} value={rsvp_status} required></input>
                        </label>
                        <button type="submit">Add</button>
                    </form>
                </div>


                <div className="container container-list flex flex-col justify-between align-center">
                    <h3>Guests</h3>
                    {guests.map((guest) => (
                        <div key={guest.id} className="guest-list-item flex flex-row justify-between align-center">
                            <div className="flex flex-row align-center">
                                {guest.first_name} {guest.last_name}
                                <div className="guest-list-item-title"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
