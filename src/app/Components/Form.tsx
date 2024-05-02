import React, { useEffect } from "react";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

interface FormProps {
  setFilled: (filled: boolean) => void;
}

function extractNumbers(userID: string): string | null {
  const delimiterIndex = userID.indexOf('|');
  if (delimiterIndex !== -1 && delimiterIndex < userID.length - 1) {
      return userID.substring(delimiterIndex + 1);
  }
  return null; // Return null if the delimiter is not found or if there are no characters after the delimiter
}

function Form({ setFilled }: FormProps) {
  const [name, setName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [department, setDepartment] = useState("");
  const user = useUser();
  const userID = extractNumbers(user?.user?.sub || "" );;

  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authID: userID,
          name: name,
          email: user?.user?.email,
          whatsApp: whatsappNumber,
          dep: department,
          isPaid: false,
          CardRecieved: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        setFilled(true);
      }
    } catch (error) {
      console.error("A problem occurred while submitting the form.", error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 py-10">
      <label className="input input-bordered flex items-center gap-2">
        Name
        <input
          type="text"
          className="grow"
          placeholder="Daisy"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        WhatsApp Number
        <input
          type="number"
          className="grow"
          placeholder="03xxxxxxxx"
          value={whatsappNumber}
          onChange={(e) => setWhatsappNumber(e.target.value)}
        />
      </label>
      <select
        className="select select-bordered w-full "
        title="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      >
        <option disabled>What's your department!</option>
        <option>BSCS</option>
        <option>BBA</option>
      </select>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}

export default Form;
