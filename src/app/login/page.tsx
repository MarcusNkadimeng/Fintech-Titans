"use client";

import { useCallback, useMemo } from "react";

import Link from "next/link";
import { create } from "zustand";
import { useRouter } from "next/navigation";

interface ILoginStore {
  username: string;
  password: string;
  isLoading: boolean;
  setUsername: (username: string) => void;
  setPassword: (username: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const useLoginStore = create<ILoginStore>()((set) => ({
  username: "",
  password: "",
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set((state) => ({
    ...state,
    isLoading
  })),
  setUsername: (username) => set((state) => ({
    ...state,
    username,
  })),
  setPassword: (password) => set((state) => ({
    ...state,
    password,
  })),
}))

export default function page() {
  const username = useLoginStore((state) => state.username);
  const password = useLoginStore((state) => state.password);
  const setPassword = useLoginStore((state) => state.setPassword);
  const setUsername = useLoginStore((state) => state.setUsername);
  const isLoading = useLoginStore((state) => state.isLoading);
  const setIsLoading = useLoginStore((state) => state.setIsLoading);

  const router = useRouter();

  const isFormValid = useMemo(() => {
    if (!username || !password) {
      return false;
    }
    if (password.length < 6) {
      return false;
    }
    if (username.length < 4) {
      return false;
    }
    return true;
  }, [username, password]);

  const onSubmit = useCallback((e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/");
    }, 500);
  }, []);

  return <div className="card bg-base-300 shadow-xl p-6" style={{ width: "32rem" }}>
    <h1 className="text-3xl font-bold text-center">Stripes</h1>
    <form className="flex gap-3 flex-col" noValidate onSubmit={onSubmit}>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Username</span>
          <span className="label-text-alt">All the cool kids are clients ;)</span>
        </div>
        <input type="text" placeholder="e.g. SuperTrooper" className="input input-bordered w-full" value={username} onChange={(e) => { setUsername(e.target.value) }} />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Password</span>
          <span className="label-text-alt">Like this: i9k%4C&M7U0$pB#&</span>
        </div>
        <input type="text" placeholder="e.g. ********" className="input input-bordered w-full" value={password} onChange={(e) => { setPassword(e.target.value) }} />
      </label>
      <button className="btn btn-primary" disabled={!isFormValid || isLoading}>{isLoading ? "Logging you in..." : "Login"}</button>
      <Link className="btn btn-link" href="/">Forgot Password?</Link>
    </form>
  </div>
}