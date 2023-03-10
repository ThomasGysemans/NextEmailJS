"use client";

import type { FormEvent } from "react";
import { useRef, useState, useCallback } from "react";
import axios from "axios";

export default function Home() {
  const form = useRef<HTMLFormElement|null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const submit = useCallback(async (e:FormEvent) => {
    e.preventDefault();
    const data = new FormData(form.current!);
    const subject = data.get("subject");
    const message = data.get("message");
    const receiver = data.get("receiver");
    setLoading(true);
    try {
      const res = await axios.post("/api/email", { email: receiver, subject, message });
      alert("Success");
      console.log(res);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }, []);

  return (
    <div>
      <h1>EmailJS test</h1>
      <form ref={form} onSubmit={submit}>
        <input name="subject" placeholder="subject" required />
        <input name="message" placeholder="message" required />
        <input name="receiver" placeholder="receiver" required />
        <button type="submit" disabled={loading}>{loading ? "Envoie..." : "Envoyer"}</button>
      </form>
    </div>
  )
}
