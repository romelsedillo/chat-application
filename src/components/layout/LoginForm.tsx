"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {}, []);

  const handleLogin = () => {
    setLoading(true);
    setLoading(false);
  };
  const handleGoogleLogin = async (): Promise<void> => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) {
        toast.error("Google login failed: " + error.message);
      } else {
        toast.success("Logged in with Google!");
        // router.push("/");
      }
    } catch (error) {
      toast.error("An unexpected error occurred during Google login.");
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubLogin = async (): Promise<void> => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
      });

      if (error) {
        toast.error("GitHub login failed: " + error.message);
      } else {
        toast.success("Logged in with GitHub!");
        // router.push("/");
      }
    } catch (error) {
      toast.error("An unexpected error occurred during GitHub login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <h2 className="dark:text-slate-50 text-3xl mb-4 text-center">Sign In</h2>
      <form
        onSubmit={handleLogin}
        className="text-foreground max-w-xs mx-auto flex flex-col gap-2"
        autoComplete="on"
      >
        <Input
          name="email"
          className="dark:text-slate-50 border border-slate-500 rounded outline-none focus-visible:ring-0"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          placeholder="Password"
          value={password}
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          className="dark:text-slate-50 border border-slate-500 rounded outline-none focus-visible:ring-0"
          required
        />
        <div className="flex items-center">
          <input
            type="checkbox"
            id="showPassword"
            className="mr-2"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)} // Toggle password visibility
          />
          <label htmlFor="showPassword" className="text-xs">
            Show Password
          </label>
        </div>
        <Button className="px-4 py-2 rounded" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
      <div className="max-w-xs flex items-center justify-end py-2 mx-auto text-xs">
        <div>
          <Link
            href={"/password-recovery"}
            className="hover:underline font-medium"
          >
            Forgot password?
          </Link>
        </div>
      </div>
      <div className="max-w-xs flex items-center gap-2 py-2 mx-auto">
        <hr className="border flex-grow" />
        <p className="text-xs dark:text-slate-50">Or continue with</p>
        <hr className="border flex-grow" />
      </div>
      <div className="max-w-xs flex flex-col items-center mx-auto py-2 gap-2">
        <Button
          onClick={handleGoogleLogin}
          className="w-full"
          disabled={loading}
        >
          Google
          <FcGoogle className="ml-2" />
        </Button>
        <Button
          onClick={handleGitHubLogin}
          className="w-full"
          disabled={loading}
        >
          GitHub
          <FaGithub className="ml-2" />
        </Button>
      </div>
      <div className="mx-auto max-w-xs mt-8">
        <p className="text-xs">
          Don&apos;t have an account?{" "}
          <Link href={"/register"} className="font-medium hover:underline">
            Sign up here.
          </Link>
        </p>
      </div>
    </div>
  );
}
