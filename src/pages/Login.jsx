import { useNavigate, useSearchParams } from "react-router-dom";
import AuthForm from "../features/auth/components/AuthForm";
import AuthFormCard from "../features/auth/components/AuthFormCard";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useToast } from "../components/ui/Toast";

export default function Login() {
  const auth = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirect");
  return (
    <div className=" mb-12">
      <AuthFormCard
        title="Log in to Exclusive"
        subtitle="Enter your details below"
        image="/images/auth/loginimg.jpg"
        footerText="Don't have an account?"
        footerLinkText="Sign Up"
        footerLinkTo="/signup"
        error={error}
        loading={loading}
      >
        <AuthForm
          mode="login"
          onSubmit={async (payload) => {
            setError(null);
            setLoading(true);
            try {
              await auth.login({
                identifier: payload.identifier,
                password: payload.password,
                remember: payload.remember,
              });
              toast.show("Logged in", { type: "success" });
              navigate(redirectUrl || "/home");
            } catch (err) {
              toast.show(err.message || "Sign in failed", { type: "error" });
              setError(err.message);
            } finally {
              setLoading(false);
            }
          }}
        />
      </AuthFormCard>
    </div>
  );
}
